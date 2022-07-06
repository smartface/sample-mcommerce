import PgHomeDesign from 'generated/pages/pgHome';
import store from '../store/index';
import storeActions from 'store/main/actions';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { Banner, Categories, HomeShowcases, Product } from 'types';
import { Router, Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { getRefreshToken } from 'service/token';
import { autoLogin } from 'service/auth';
import { getBannerImage, getBanners, getCategories, getProductImageUrl, getProductsByQuery, getShowcases } from 'service/commerce';
import LviGenericSlider from 'components/LviGenericSlider';
import { BANNER_ASPECT_RATIO, HALF_OF_SCREEN_WIDTH, HOME_PRODUCT_LIMIT } from '../constants';
import FlHeaderIcon from 'components/FlHeaderIcon';
import setHeaderIcon from 'lib/setHeaderIcon';
import Network from '@smartface/native/device/network';
import GviProductItem from 'components/GviProductItem';

type Processor =
    | ListViewItems.ProcessorTypes.ILviHomeProducts
    | ListViewItems.ProcessorTypes.ILviShowcaseHeader
    | ListViewItems.ProcessorTypes.ILviGenericSlider;

export default class PgHome extends withDismissAndBackButton(PgHomeDesign) {
    data: Processor[];
    categories: Categories[];
    products: Product[];
    initialized = false;
    sliderHeight = 0;
    flHeaderIcon: FlHeaderIcon;
    banners: Banner[] = [{ _id: '', categoryId: '', productId: '' }];
    showcases: HomeShowcases[] = Array.from({ length: 3 }).map((_, index: number) => ({
        _id: '',
        title: '',
        products: Array.from({ length: 3 }).map((_, index: number) => ({
            _id: '',
            name: ' ',
            shortDescription: ' ',
            price: 0,
            labels: [{ name: '', color: '' }],
            category: {
                _id: '',
                title: '',
                menuColor: '',
                borderColor: '',
                categoryImg: ''
            },
            status: true,
            nutritions: {
                Fat: '',
                Iron: ''
            }
        }))
    }));
    noConnection: boolean;

    constructor(private router?: Router, private route?: Route) {
        super({});
        this.sliderHeight = LviGenericSlider.calculateHeightWithAspectRatio(BANNER_ASPECT_RATIO);
        this.noConnection = Network.connectionType === Network.ConnectionType.NONE;
    }
    addAppIconToHeader() {
        this.headerBar.title = '';
        this.headerBar.titleLayout = setHeaderIcon(this.flHeaderIcon);
    }

    initGridView(){
        this.gvProducts.layoutManager.onItemLength = () => HALF_OF_SCREEN_WIDTH;
        this.gvProducts.onItemBind = (GridViewItem: GviProductItem, productIndex: number) => {
            const basketItem = store.getState().main.basket.find((bp) => bp._id === this.products[productIndex]._id);
            GridViewItem.itemTitleMaxWidth = HALF_OF_SCREEN_WIDTH;
            GridViewItem.itemTag = this.products[productIndex]?.labels[0]?.name;
            GridViewItem.itemTagColor = this.products[productIndex]?.labels[0]?.color;
            GridViewItem.itemTitle = this.products[productIndex].name;
            GridViewItem.itemDesc = this.products[productIndex].shortDescription;
            GridViewItem.itemImage = this.products[productIndex].images ? getProductImageUrl(this.products[productIndex].images[0]) : null;
            GridViewItem.itemDiscountPrice = !!this.products[productIndex].discountPrice
                ? `$${this.products[productIndex].discountPrice.toFixed(2)}`
                : '';
            GridViewItem.itemPrice = `$${this.products[productIndex].price.toFixed(2)}`;
            GridViewItem.itemReview = this.products[productIndex]?.rating?.toFixed(1).toString() || '';
            GridViewItem.showHideMinusButton = !!basketItem;
            GridViewItem.minusTextColor = basketItem?.count === 1 ? '.danger' : '.main';
            GridViewItem.buttonMinusText = basketItem?.count === 1 ? '' : '';
            GridViewItem.productCount = basketItem?.count?.toString() || '';
            
        };
    }
    refreshGridView() {
        this.gvProducts.itemCount = this.products.length;
        this.gvProducts.refreshData();
    }
    async getProducts(opts: { pageNumber: number } = { pageNumber: 1 }) {
        try {
            const productResponse = await getProductsByQuery({ page: opts.pageNumber, limit: HOME_PRODUCT_LIMIT });
            this.products = productResponse.products;
        } catch (error) {
            throw new Error(global.lang.productServiceError);
        } finally {
        }
    }

    async fetchShowcases() {
        try {
            const showcaseResponse = await getShowcases();
            if (showcaseResponse && showcaseResponse.length > 0) {
                this.showcases = showcaseResponse;
                store.dispatch(storeActions.SetShowcases(showcaseResponse));
            }
            return showcaseResponse;
        } catch (error) {
            throw new Error(global.lang.showcaseServiceError);
        }
    }

    async fetchCategories() {
        try {
            this.categories = await getCategories();
        } catch (error) {
            throw new Error(global.lang.categoriesServiceError);
        } finally {
        }
    }

    async fetchBanners() {
        try {
            const bannersResponse = await getBanners();
            if (bannersResponse && bannersResponse.length > 0) {
                this.banners = bannersResponse;
            }
            return bannersResponse;
        } catch (error) {
            throw new Error(global.lang.bannerServiceError);
        }
    }
    async initAutoLogin() {
        if (!!getRefreshToken()) {
            try {
                return await autoLogin();
            } catch (err) {
                return Promise.resolve(); //Silently fail on autologin
            }
        } else {
            return Promise.resolve();
        }
    }
    async callServices() {
        if (store.getState().main.isRateAdded) {
            this.initialized = false;
            store.dispatch(storeActions.AddNewRate({ isRateAdded: false }));
        }
        try {
            if (this.initialized) {
                return Promise.resolve();
            } else {
                await this.initAutoLogin();
                await Promise.all([this.fetchShowcases(), this.fetchCategories(), this.getProducts(), this.fetchBanners()]);
                this.initialized = true;
            }
        } catch (error) {
            if (!this.noConnection) {
                alert(error.message);
            }
        } finally {
            this.refreshGridView();
            this.initGridView();
        }
    }
    onShow() {
        super.onShow();
        this.addAppIconToHeader();
        setTimeout(() => {
            this.callServices();
        }, 3000);
        //this.callServices();
    }
    onLoad() {
        super.onLoad();
        this.headerBar.leftItemEnabled = false;
    }
}
