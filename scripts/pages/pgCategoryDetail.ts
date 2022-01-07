import PgCategoryDetailDesign from 'generated/pages/pgCategoryDetail';
import store from 'store';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import * as ListViewItems from 'lib/listViewItemTypes';

type Processor = ListViewItems.ProcessorTypes.ILviRow2ProductItem | ListViewItems.ProcessorTypes.ILviSpacer;

export default class PgCategoryDetail extends PgCategoryDetailDesign {
    data: Processor[];
    routeData: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
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
        const processorItems: Processor[] = [];
        const products = store.getState().products.filter((product) => product.categoryId === this.routeData.id);

        for (let i = 0; i < products.length; i += 2) {
            const [product1, product2] = [products[i], products[i + 1]];

            processorItems.push(
                ListViewItems.getLviRow2ProductItem({
                    itemTitle1: product1?.name || '',
                    itemDesc1: product1?.description || '',
                    itemPrice1: product1?.price || '',
                    itemImage1: product1?.image || '',
                    // @ts-ignore TODO
                    itemTag1: product1?.discountTag || '',
                    // @ts-ignore TODO
                    itemReview1: product1?.review || '',
                    // @ts-ignore TODO
                    itemDiscountPrice1: product1?.discount || '',

                    itemTitle2: product2?.name || '',
                    itemDesc2: product2?.description || '',
                    itemPrice2: product2?.price || '',
                    itemImage2: product2?.image || '',
                    // @ts-ignore TODO
                    itemTag2: product2?.discountTag || '',
                    // @ts-ignore TODO
                    itemReview2: product2?.review || '',
                    // @ts-ignore TODO
                    itemDiscountPrice2: product2?.discount || ''
                })
            );
        }
        return processorItems;
    }
}

function onShow(this: PgCategoryDetail, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgCategoryDetail, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = this.routeData.title;
    this.initListView();
    this.refreshListView();
}
