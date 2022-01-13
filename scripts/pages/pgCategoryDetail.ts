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
type Processor = ListViewItems.ProcessorTypes.ILviRow2ProductItem | ListViewItems.ProcessorTypes.ILviSpacer;

type searchStatus = {
    isSearchActive: boolean;
    searchText: string;
};
export default class PgCategoryDetail extends PgCategoryDetailDesign {
    data: Processor[];
    MySearchBar: SearchView;
    routeData: any;
    isSearchViewVisible = false;
    categoryProducts: any;
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
        this.MySearchBar = new SearchView();
        this.MySearchBar.textFieldBackgroundColor = Color.create('#F2F3F2');
        this.MySearchBar.addToHeaderBar(this);
        if (visible) {
            this.isSearchViewVisible = true;
            this.MySearchBar.onTextChanged = (searchText) => {
                this.searchStatus.isSearchActive = true;
                this.searchStatus.searchText = searchText;
                if (this.categoryProducts && this.categoryProducts.length > 0) {
                    let foundProducts = this.categoryProducts.filter((product) =>
                        product.name.startsWith(searchText.charAt(0).toLocaleUpperCase('tr-TR'))
                    );
                    this.categoryProducts = foundProducts;
                    this.refreshListView();
                }
                if (searchText.length === 0) {
                    this.searchStatus.isSearchActive = false;
                    this.searchStatus.searchText = null;
                    if (this.routeData.isShowcase) {
                        this.getShowcaseProducts();
                    } else {
                        this.getCategoryProducts();
                    }
                    this.refreshListView();
                }
                this.refreshListView();
            };
        } else {
            this.isSearchViewVisible = false;
            this.MySearchBar.visible = false;
        }
    }
    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.refreshEnabled = false;
    }
    refreshListView() {
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
    processor(): Processor[] {
        const processorItems: Processor[] = [];
        if (this.categoryProducts.length === 0 && !this.searchStatus.isSearchActive) {
            processorItems.push(
                ListViewItems.getLviEmptyItem({
                    emptyImage: 'images://empty_category.png',
                    emptyTitle: global.lang.categoriesIsEmpty
                })
            );
        } else if (this.categoryProducts.length === 0 && this.searchStatus.isSearchActive) {
            processorItems.push(
                ListViewItems.getLviEmptyItem({
                    emptyImage: 'images://empty_category.png',
                    emptyTitle: `${global.lang.categoriesIsEmptyWithSearch} ${this.searchStatus.searchText}`
                })
            );
        } else {
            for (let i = 0; i < this.categoryProducts.length; i += 2) {
                const [product1, product2] = [this.categoryProducts[i], this.categoryProducts[i + 1]];
                processorItems.push(
                    ListViewItems.getLviRow2ProductItem({
                        itemTitle1: product1?.name || '',
                        itemDesc1: product1?.description || '',
                        itemDiscountPrice1: !!product1?.discount ? `$${product1?.discount}` : '',
                        itemPrice1: `$${product1?.price}` || '',
                        itemImage1: product1?.image || '',
                        itemTag1: product1?.discountTag || '',
                        itemReview1: !!product1?.review ? product1?.review : '',

                        itemTitle2: product2?.name || '',
                        itemDesc2: product2?.description || '',
                        itemDiscountPrice2: !!product2?.discount ? `$${product2?.discount}` : '',
                        itemPrice2: `$${product2?.price}` || '',
                        itemImage2: product2?.image || '',
                        itemTag2: product2?.discountTag || '',
                        itemReview2: !!product2?.review ? product2?.review : ''
                    })
                );
            }
        }
        return processorItems;
    }
    getCategoryProducts() {
        this.categoryProducts = store.getState().products.filter((product) => product.categoryId === this.routeData.dataId);
    }
    getShowcaseProducts() {
        this.categoryProducts = store
            .getState()
            .showcaseProducts.find((showcase) => showcase.showcaseId === this.routeData.dataId).products;

        console.log('this.categoryProducts', this.categoryProducts);
    }
}

function onShow(this: PgCategoryDetail, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgCategoryDetail, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = this.routeData.title;
    // this.initSearchView();
    console.log('onload route', this.routeData);
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
    this.initListView();
    this.refreshListView();
}
