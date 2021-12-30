import PgHomeDesign from 'generated/pages/pgHome';
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import store from '../store/index';
import GviProductItem from 'components/GviProductItem';
import LviHomeProducts from 'components/LviHomeProducts';
import Application from '@smartface/native/application';
import Color from '@smartface/native/ui/color';
import PgHomeSlider from './pgHomeSlider';
import SwipeView from '@smartface/native/ui/swipeview';
import System from '@smartface/native/device/system';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';

type Processor = ListViewItems.ProcessorTypes.ILviHomeProducts;

export default class PgHome extends PgHomeDesign {
    router: any;
    data: Processor[];
    showcases: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        // this.lblOffer.text = global.lang['exclusiveOffer'];
        // this.lblOfferSeeAll.text = global.lang['seeAll'];
        // this.lblBestSeller.text = global.lang['bestSeller'];
        // this.lblBestSellerSeeAll.text = global.lang['seeAll'];
    }
    initSLider() {
        this.flHomeSlider.removeAll();
        const swipeView = new SwipeView({
            page: this,
            flexGrow: 1,
            pages: ['images://apple.png', 'images://banana.png'].map((image: string) => PgHomeSlider({ image })),
            onPageSelected: (index: number) => {
                console.log('index', index);
                // this.indicatorCurrentIndex = index;
            }
        });
        this.flHomeSlider.addChild(swipeView, 'swipeView', '.grow-relative');
        if (System.OS === System.OSType.IOS) {
            this.flHomeSlider.applyLayout();
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
        this.showcases = store.getState().showcaseProducts;
        return this.showcases.map((showcase) => {
            return ListViewItems.getLviHomeProducts({
                showcaseTitle: showcase.showcaseTitle,
                showcaseLinkText: showcase.showcaseLinkText,
                items: showcase.products
            });
        });
    }
}

function onShow(this: PgHome, superOnShow: () => void) {
    superOnShow();
    // this.refreshShowcaseProductsGrid();
    Application.statusBar.visible = true;
}

function onLoad(this: PgHome, superOnLoad: () => void) {
    superOnLoad();
    // this.initShowcaseProductsGrid();
    this.initSLider();
    this.headerBar.title = global.lang.homeHeader;
    this.headerBar.android.elevation = 0;
    //   this.scrollView1.autoSizeEnabled = true;
    //   this.scrollView1.layout.applyLayout;
    this.initListView();
    this.refreshListView();
}
