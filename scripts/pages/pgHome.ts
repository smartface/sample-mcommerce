import PgHomeDesign from 'generated/pages/pgHome';
import store from '../store/index';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { HomeShowcases } from 'types';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { getRefreshToken } from 'service/token';
import { autoLogin } from 'service/auth';

type Processor =
    | ListViewItems.ProcessorTypes.ILviHomeProducts
    | ListViewItems.ProcessorTypes.ILviShowcaseHeader
    | ListViewItems.ProcessorTypes.ILviGenericSlider;

export default class PgHome extends withDismissAndBackButton(PgHomeDesign) {
    data: Processor[];
    showcases: HomeShowcases[];
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
        this.showcases = store.getState().main.showcaseProducts;

        const processorItems = [
            ListViewItems.getLviGenericSlider(
                {
                    images: ['images://firstbanner.png', 'images://bannerone.png']
                },
                { className: '.lviGenericSlider.small' }
            )
        ];
        this.showcases.forEach((showcase) => {
            processorItems.push(
                ListViewItems.getLviShowcaseHeader({
                    showcaseTitle: showcase.showcaseTitle,
                    showcaseLinkText: showcase.showcaseLinkText,
                    onSeeAllClick: () => {
                        this.router.push('/btb/tab1/categoryDetail', {
                            dataId: showcase.showcaseId,
                            title: showcase.showcaseTitle,
                            isShowcase: true
                        });
                    }
                })
            );
            if (showcase.categories) {
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
                            productId: product.id,
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

    onShow() {
        super.onShow();
    }
    async initAutoLogin() {
        if (!!getRefreshToken()) {
            try {
                await autoLogin();
            } catch (error) {}
        }
    }
    onLoad() {
        super.onLoad();
        this.initAutoLogin();
        this.headerBar.title = global.lang.homeHeader;
        this.initListView();
        this.refreshListView();
        this.headerBar.leftItemEnabled = false;
    }
}
