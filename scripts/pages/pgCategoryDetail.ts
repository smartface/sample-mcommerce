import PgCategoryDetailDesign from 'generated/pages/pgCategoryDetail';
import store from 'store';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import * as ListViewItems from 'lib/listViewItemTypes';
import SearchView from '@smartface/native/ui/searchview';
import MySearchBar from 'components/FlSearchBar';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import System from '@smartface/native/device/system';
import GviProductItem from 'components/GviProductItem';
import Screen from '@smartface/native/device/screen';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import { Product } from 'types';
type Processor = ListViewItems.ProcessorTypes.ILviRow2ProductItem | ListViewItems.ProcessorTypes.ILviSpacer;

type searchStatus = {
    isSearchActive: boolean;
    searchText: string;
};
export default class PgCategoryDetail extends PgCategoryDetailDesign {
    productSearchView: SearchView;
    routeData: any;
    isSearchViewVisible = false;
    categoryProducts: Array<Product>;
    searchStatus: searchStatus = {
        isSearchActive: false,
        searchText: null
    };
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
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
        this.productSearchView.textFieldBackgroundColor = getCombinedStyle('.commerceSearchView').textFieldBackgroundColor;
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
                    if (this.routeData.isShowcase) {
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
        this.categoryProducts = store.getState().products.filter((product) => product.categoryId === this.routeData.dataId);
    }
    getShowcaseProducts() {
        this.categoryProducts = store
            .getState()
            .showcaseProducts.find((showcase) => showcase.showcaseId === this.routeData.dataId).products;
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
                store.dispatch({
                    type: 'ADD_TO_BASKET',
                    payload: {
                        data: {
                            product: this.categoryProducts[productIndex],
                            count: 1
                        }
                    }
                });
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
    checkIfListEmpty() {
        if (this.categoryProducts.length === 0) {
            this.flEmptyItem.emptyImage = 'images://empty_category.png';
            if (this.searchStatus.isSearchActive) {
                this.flEmptyItem.emptyTitle = `${global.lang.categoriesIsEmptyWithSearch} ${this.searchStatus.searchText}`;
            } else {
                this.flEmptyItem.emptyTitle = global.lang.categoriesIsEmpty;
            }
            this.flEmptyItem.dispatch({
                type: 'updateUserStyle',
                userStyle: {
                    visible: true,
                    height: Screen.height / 1.5
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
}

function onShow(this: PgCategoryDetail, superOnShow: () => void) {
    superOnShow();
    this.refreshGridView();
}

function onLoad(this: PgCategoryDetail, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = this.routeData.title;
    // this.initSearchView()
    if (this.routeData.isShowcase) {
        this.getShowcaseProducts();
    } else {
        this.getCategoryProducts();
    }
    if (System.OS === System.OSType.IOS) {
        this.addRightItem();
    } else {
        this.initSearchView(true);
    }
    this.initGridView();
}
