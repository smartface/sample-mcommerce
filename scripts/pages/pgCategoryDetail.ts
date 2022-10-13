import PgCategoryDetailDesign from 'generated/pages/pgCategoryDetail';
import store from 'store/index';
import storeActions from 'store/main/actions';
import SearchView from '@smartface/native/ui/searchview';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import GviProductItem from 'components/GviProductItem';
import Screen from '@smartface/native/device/screen';
import { themeService } from 'theme';
import { Product } from 'types';
import { Router, Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { getProductImageUrl, getProductsByQuery, getShowcases } from 'service/commerce';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
import { ON_SHOW_TIMEOUT } from '../constants';
import setVisibility from 'lib/setVisibility';
const gridViewItemLength = themeService.getNativeStyle('.flProductItem').height;
type searchStatus = {
    isSearchActive: boolean;
    searchText: string;
};
export default class PgCategoryDetail extends withDismissAndBackButton(PgCategoryDetailDesign) {
    productSearchView: SearchView;
    routeData: any;
    isSearchViewVisible = false;
    categoryProducts: Array<Product>;
    searchStatus: searchStatus = {
        isSearchActive: false,
        searchText: null
    };
    pageNumber = 1;
    totalCount = 0;
    initialized = false;
    paginating = false;
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    addRightItem() {
        const rightItem = new HeaderBarItem({
            image: Image.createFromFile('images://magnifying_glass.png'),
            //Native › NTVE-435
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor,
            onPress: () => {
                if (this.isSearchViewVisible) {
                    this.initSearchView(false);
                    this.headerBar.titleLayout = undefined;
                } else {
                    this.initSearchView(true);
                }
            }
        });
        this.headerBar.setItems([rightItem]);
    }
    initSearchView(visible) {
        this.productSearchView = new SearchView();
        this.headerBar.titleLayout = this.productSearchView;
        this.productSearchView.textFieldBackgroundColor = themeService.getNativeStyle('.sf-searchView.gray').textFieldBackgroundColor;
        if (visible) {
            this.isSearchViewVisible = true;
            this.productSearchView.onTextChanged = (searchText) => {
                this.searchStatus.isSearchActive = true;
                this.searchStatus.searchText = searchText;
                if (this.categoryProducts && this.categoryProducts.length > 0) {
                    let foundProducts = this.categoryProducts.filter((product) =>
                        product.name.startsWith(searchText.charAt(0).toLocaleUpperCase('tr-TR'))
                    );
                    this.categoryProducts = foundProducts;
                }
                if (searchText.length === 0) {
                    this.searchStatus.isSearchActive = false;
                    this.searchStatus.searchText = null;
                    if (this.route.getState().routeData.isShowcase) {
                        this.getShowcaseProducts();
                    } else {
                        this.getCategoryProducts();
                    }
                }
                this.refreshGridView();
            };
        } else {
            this.isSearchViewVisible = false;
            this.productSearchView.visible = false;
        }
    }

    paginate() {
        const currentCount = this.categoryProducts?.length || 0;
        if (currentCount < this.totalCount && !this.paginating) {
            this.pageNumber = this.pageNumber + 1;
            this.getCategoryProducts({ pageNumber: this.pageNumber });
        }
    }
    isNewRateAdded() {
        if (store.getState().main.isRateAdded) {
            this.initialized = false;
            this.fetchShowcaseProducts();
            store.dispatch(storeActions.AddNewRate({ isRateAdded: false }));
        }
    }
    async getCategoryProducts(opts: { pageNumber: number } = { pageNumber: 1 }) {
        try {
            showWaitDialog();
            this.paginating = true;
            const productResponse = await getProductsByQuery({
                page: opts.pageNumber,
                categoryId: this.route.getState().routeData.dataId
            });
            console.info(productResponse, ' => productResponse')
            this.totalCount = productResponse.metadata.totalCount;
            if (productResponse && productResponse?.products.length > 0) {
                if (opts.pageNumber !== 1) {
                    this.categoryProducts = this.categoryProducts.concat(productResponse.products);
                } else {
                    this.categoryProducts = productResponse.products;
                }
                this.refreshGridView();
            }
        } catch (error) {
            alert(global.lang.productServiceError);
        } finally {
            this.initialized = true;
            this.paginating = false;
            hideWaitDialog();
            this.gvProductsView.stopRefresh();
        }
    }
    async fetchShowcaseProducts() {
        try {
            const showcaseResponse = await getShowcases();
            if (showcaseResponse && showcaseResponse.length > 0) {
                this.categoryProducts = showcaseResponse;
                store.dispatch(storeActions.SetShowcases(showcaseResponse));
            }
            return showcaseResponse;
        } catch (error) {
            throw new Error(global.lang.showcaseServiceError);
        }
    }

    getShowcaseProducts() {
        this.categoryProducts = store
            .getState()
            .main.showcases.find((showcase) => showcase._id === this.route.getState().routeData.dataId).products;
        this.refreshGridView();
        this.initialized = true;
    }

    initGridView() {
        this.gvProductsView.layoutManager.onItemLength = () => gridViewItemLength;
        this.gvProductsView.onPullRefresh = () => {
            if (!this.route.getState().routeData.isShowcase) {
                this.pageNumber = 0;
                this.paginating = false;
                this.categoryProducts = [];
                this.getCategoryProducts();
            } else {
                this.gvProductsView.stopRefresh();
            }
        };
        this.gvProductsView.onItemBind = (gridViewItem: GviProductItem, productIndex: number) => {
            const selectedProduct = this.categoryProducts[productIndex];
            if (selectedProduct) {
                gridViewItem.itemTagColor = selectedProduct?.labels[0]?.color;
                const basketItem = store.getState().main.basket.find((bp) => bp._id === selectedProduct._id);
                gridViewItem.itemTag = selectedProduct?.labels[0]?.name;
                gridViewItem.itemTitle = selectedProduct?.name;
                gridViewItem.itemDesc = selectedProduct.shortDescription;
                gridViewItem.itemImage = selectedProduct.images ? getProductImageUrl(selectedProduct.images[0]) : null;
                gridViewItem.itemDiscountPrice = !!selectedProduct.discountPrice ? `$${selectedProduct.discountPrice.toFixed(2)}` : '';
                gridViewItem.itemPrice = `$${selectedProduct.price.toFixed(2)}`;
                gridViewItem.itemReview = selectedProduct?.rating?.toFixed(1).toString() || '';
                gridViewItem.showHideMinusButton = !!basketItem;
                gridViewItem.minusTextColor = basketItem?.count === 1 ? '.danger' : '.main';
                gridViewItem.buttonMinusText = basketItem?.count === 1 ? '' : '';
                gridViewItem.productCount = basketItem?.count?.toString() || '';
                gridViewItem.onActionClickPlus = () => {
                    gridViewItem.toggleIndicatorPlus(true);
                    store.dispatch(storeActions.AddToBasket({ product: selectedProduct, count: 1 }));
                    setTimeout(() => {
                        gridViewItem.toggleIndicatorPlus(false);
                        this.refreshGridView();
                        gridViewItem.showHideMinusButton = true;
                    }, 500);
                };
                gridViewItem.onActionClickMinus = () => {
                    gridViewItem.toggleIndicatorMinus(true);
                    store.dispatch(storeActions.AddToBasket({ product: selectedProduct, count: -1 }));
                    setTimeout(() => {
                        gridViewItem.toggleIndicatorMinus(false);
                        this.refreshGridView();
                        if (basketItem?.count === 0) {
                            gridViewItem.showHideMinusButton = false;
                        }
                    }, 500);
                };
                if (this.categoryProducts.length - 1 === productIndex) {
                    this.paginate();
                }
            }
        };
        this.gvProductsView.onItemSelected = (gridViewItem: GviProductItem, productIndex: number) => {
            const product = this.categoryProducts[productIndex];
            this.router.push('productDetail', {
                productId: product._id
            });
        };
    }
    refreshGridView() {
        this.gvProductsView.itemCount = this.categoryProducts.length;
        this.checkIfListEmpty();
        this.gvProductsView.refreshData();
    }
    initEmptyItem() {
        this.flEmptyItem.emptyImage = 'images://empty_category.png';
        this.flEmptyItem.height = Screen.height / 1.5;
    }
    checkIfListEmpty() {
        if (this.categoryProducts.length === 0) {
            if (this.searchStatus.isSearchActive) {
                this.flEmptyItem.emptyTitle = `${global.lang.categoriesIsEmptyWithSearch} ${this.searchStatus.searchText}`;
            } else {
                this.flEmptyItem.emptyTitle = global.lang.categoriesIsEmpty;
            }
            setVisibility(this.flEmptyItem, true);
        } else {
            setVisibility(this.flEmptyItem, false);
        }
    }

    onShow() {
        super.onShow();
        this.addRightItem();
        this.initDismissButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
        this.isNewRateAdded();
        if (!this.initialized) {
            setTimeout(() => {
                if (this.route.getState().routeData.isShowcase) {
                    this.getShowcaseProducts();
                } else {
                    this.getCategoryProducts();
                }
            }, ON_SHOW_TIMEOUT);
        }
    }

    onLoad() {
        super.onLoad();
        this.headerBar.title = this.route.getState().routeData.title;
        this.initEmptyItem();
        setTimeout(()=> {
            this.initGridView();

        },300)
    }
}
