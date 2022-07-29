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
import { getBannerImage, getBanners, getCategories, getProductsByQuery, getShowcases } from 'service/commerce';
import LviGenericSlider from 'components/LviGenericSlider';
import { BANNER_ASPECT_RATIO, HOME_PRODUCT_LIMIT } from '../constants';
import FlHeaderIcon from 'components/FlHeaderIcon';
import setHeaderIcon from 'lib/setHeaderIcon';
import Network from '@smartface/native/device/network';

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
        const processorItems = [
            ListViewItems.getLviGenericSlider(
                {
                    initialized: this.initialized,
                    images: this.banners.map((image) => {
                        return getBannerImage(image._id);
                    })
                },
                { height: this.sliderHeight }
            )
        ];
        this.showcases.forEach((showcase) => {
            if (this.initialized) {
                processorItems.push(
                    ListViewItems.getLviShowcaseHeader({
                        showcaseTitle: showcase.title,
                        showcaseLinkText: global.lang.seeAll.replace('$1', showcase.products.length),
                        onSeeAllClick: () => {
                            this.router.push('categoryDetail', {
                                dataId: showcase._id,
                                title: showcase.title,
                                isShowcase: true
                            });
                        }
                    })
                );
            }
            processorItems.push(
                //@ts-ignore
                ListViewItems.getLviHomeProducts({
                    initialized: this.initialized,
                    items: showcase.products,
                    onProductClick: (product) => {
                        this.router.push('productDetail', {
                            productId: product._id
                        });
                    }
                })
            );
        });
        if (this.initialized) {
            processorItems.push(
                ListViewItems.getLviHomeCategories({
                    items: this.categories,
                    onCategoryClick: (category) => {
                        this.router.push('categoryDetail', {
                            dataId: category._id,
                            title: category.title
                        });
                    }
                })
            );

            for (let index = 0; index < this.products.length; index++) {
                processorItems.push(ListViewItems.getLviSpacerItem({ className: 'xSmall' }));
                processorItems.push(
                //@ts-ignore

                    ListViewItems.getLviHomeProducts({
                        initialized: this.initialized,
                        items:
                            index !== this.products.length - 1 ? [this.products[index], this.products[index + 1]] : [this.products[index]],
                        onProductClick: (product) => {
                            this.router.push('productDetail', {
                                productId: product._id
                            });
                        }
                    })
                );
                index = index + 1;
            }
        }

        return processorItems;
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
            this.refreshListView();
        }
    }
    onShow() {
        super.onShow();
        this.addAppIconToHeader();
        this.refreshListView();
        setTimeout(() => {
            this.callServices();
        }, 3000);
        //this.callServices();
    }
    onLoad() {
        super.onLoad();
        this.initListView();
        this.headerBar.leftItemEnabled = false;
    }
}
