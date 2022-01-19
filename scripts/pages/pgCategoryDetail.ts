import PgCategoryDetailDesign from 'generated/pages/pgCategoryDetail';
import store from 'store/index';
import storeActions from 'store/main/actions';
import SearchView from '@smartface/native/ui/searchview';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import System from '@smartface/native/device/system';
import GviProductItem from 'components/GviProductItem';
import Screen from '@smartface/native/device/screen';
import { themeService } from 'theme';
import { Product } from 'types';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

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
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    addRightItem() {
        const rightItem = new HeaderBarItem({
            image: Image.createFromFile('images://filtericon.png'),
            color: Color.BLACK,
            onPress: () => {
                if (this.isSearchViewVisible) {
                    this.initSearchView(false);
                } else {
                    this.initSearchView(true);
                }
            }
        });
        this.headerBar.setItems([rightItem]);
    }
    initSearchView(visible) {
        this.productSearchView = new SearchView();
        this.productSearchView.textFieldBackgroundColor = Color.create(
            themeService.getStyle('.commerceSearchView').textFieldBackgroundColor
        );
        this.productSearchView.addToHeaderBar(this);
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
                    this.refreshGridView();
                }
                if (searchText.length === 0) {
                    this.searchStatus.isSearchActive = false;
                    this.searchStatus.searchText = null;
                    if (this.route.getState().routeData.isShowcase) {
                        this.getShowcaseProducts();
                    } else {
                        this.getCategoryProducts();
                    }
                    this.refreshGridView();
                }
                this.refreshGridView();
            };
        } else {
            this.isSearchViewVisible = false;
            this.productSearchView.visible = false;
        }
    }
    getCategoryProducts() {
        this.categoryProducts = store
            .getState()
            .main.products.filter((product) => product.categoryId === this.route.getState().routeData.dataId);
    }
    getShowcaseProducts() {
        this.categoryProducts = store
            .getState()
            .main.showcaseProducts.find((showcase) => showcase.showcaseId === this.route.getState().routeData.dataId).products;
    }

    initGridView() {
        this.gvProducts.onItemBind = (GridViewItem: GviProductItem, productIndex: number) => {
            GridViewItem.itemTag = this.categoryProducts[productIndex].discountTag;
            GridViewItem.itemTitle = this.categoryProducts[productIndex].name;
            GridViewItem.itemDesc = this.categoryProducts[productIndex].description;
            GridViewItem.itemImage = this.categoryProducts[productIndex].image;
            GridViewItem.itemDiscountPrice = !!this.categoryProducts[productIndex].discount
                ? `$${this.categoryProducts[productIndex].discount}`
                : false;
            GridViewItem.itemPrice = `$${this.categoryProducts[productIndex].price}`;
            GridViewItem.itemReview = !!this.categoryProducts[productIndex].review ? this.categoryProducts[productIndex]?.review : false;
            GridViewItem.onActionClick = () => {
                GridViewItem.initIndicator();
                GridViewItem.toggleIndicator(true);
                store.dispatch(storeActions.AddToBasket({ product: this.categoryProducts[productIndex], count: 1 }));
                setTimeout(() => {
                    GridViewItem.toggleIndicator(false);
                }, 500);
            };
        };
    }
    refreshGridView() {
        this.gvProducts.itemCount = this.categoryProducts.length;
        this.checkIfListEmpty();
        this.gvProducts.refreshData();
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
            this.flEmptyItem.dispatch({
                type: 'updateUserStyle',
                userStyle: {
                    visible: true
                }
            });
        } else {
            this.flEmptyItem.dispatch({
                type: 'updateUserStyle',
                userStyle: {
                    visible: false
                }
            });
        }
    }

    onShow() {
        super.onShow();
        this.refreshGridView();
        this.initDismissButton(this.router);
        this.initBackButton(this.router);
    }

    onLoad() {
        super.onLoad();
        this.headerBar.title = this.route.getState().routeData.title;
        if (this.route.getState().routeData.isShowcase) {
            this.getShowcaseProducts();
        } else {
            this.getCategoryProducts();
        }
        if (System.OS === System.OSType.IOS) {
            this.addRightItem();
        } else {
            this.initSearchView(true);
        }
        this.initEmptyItem();
        this.initGridView();
    }
}
