import PgHomeDesign from 'generated/pages/pgHome';
import store from '../store/index';
import Application from '@smartface/native/application';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { NativeStackRouter } from '@smartface/router';
import { HomeShowcases, Product } from 'types';

type Processor =
    | ListViewItems.ProcessorTypes.ILviHomeProducts
    | ListViewItems.ProcessorTypes.ILviHomeSlider
    | ListViewItems.ProcessorTypes.ILviShowcaseHeader;

export default class PgHome extends PgHomeDesign {
    router: NativeStackRouter;
    data: Processor[];
    showcases: HomeShowcases[];
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
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
        this.showcases = store.getState().showcaseProducts;

        const processorItems = [
            ListViewItems.getLviHomeSlider({
                images: ['images://firstbanner.png', 'images://bannerone.png']
            })
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
}

function onShow(this: PgHome, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgHome, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = global.lang.homeHeader;
    this.initListView();
    this.refreshListView();
}
