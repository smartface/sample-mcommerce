import PgHomeDesign from 'generated/pages/pgHome';
import store from '../store/index';
import storeActions from 'store/main/actions';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { Banner, HomeShowcases } from 'types';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { getRefreshToken } from 'service/token';
import { autoLogin } from 'service/auth';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
import { getBanners, getShowcases } from 'service/commerce';

type Processor =
    | ListViewItems.ProcessorTypes.ILviHomeProducts
    | ListViewItems.ProcessorTypes.ILviShowcaseHeader
    | ListViewItems.ProcessorTypes.ILviGenericSlider;

export default class PgHome extends withDismissAndBackButton(PgHomeDesign) {
    data: Processor[];
    showcases: HomeShowcases[];
    banners: Banner[];
    initialized = false;
    constructor(private router?: Router, private route?: Route) {
        super({});
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
                    images: this.banners.map((image) => image._id)
                },
                { className: '.lviGenericSlider.small' }
            )
        ];
        this.showcases.forEach((showcase) => {
            processorItems.push(
                ListViewItems.getLviShowcaseHeader({
                    showcaseTitle: showcase.title,
                    showcaseLinkText: global.lang.seeAll,
                    onSeeAllClick: () => {
                        this.router.push('/btb/tab1/categoryDetail', {
                            dataId: showcase._id,
                            title: showcase.title,
                            isShowcase: true
                        });
                    }
                })
            );
            if (showcase.categories && showcase.categories.length > 0) {
                processorItems.push(
                    ListViewItems.getLviHomeCategories({
                        items: showcase.categories
                    })
                );
            }
            processorItems.push(
                ListViewItems.getLviHomeProducts({
                    items: showcase.products,
                    onProductClick: (product) => {
                        this.router.push('/btb/tab1/productDetail', {
                            productId: product._id,
                            productName: product.name,
                            productPrice: product.price,
                            productDescription: product.description,
                            productImg: product.image
                        });
                    }
                })
            );
        });

        return processorItems;
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
        try {
            showWaitDialog();
            if (this.initialized) {
                return Promise.resolve();
            } else {
                await this.initAutoLogin();
                await Promise.all([this.fetchShowcases(), this.fetchBanners()]);
                this.initialized = true;
            }
        } catch (error) {
            alert(error.message);
        } finally {
            hideWaitDialog();
            this.refreshListView();
        }
    }
    onShow() {
        super.onShow();
        this.callServices();
    }
    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.homeHeader;
        this.initListView();
        this.headerBar.leftItemEnabled = false;
    }
}
