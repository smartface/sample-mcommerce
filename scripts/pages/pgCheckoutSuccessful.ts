import PgCheckoutSuccessfulDesign from 'generated/pages/pgCheckoutSuccessful';
import { withDismissAndBackButton } from '@smartface/mixins';
import { onRowBind, onRowCreate, onRowHeight, onRowSwipe, onRowType } from 'lib/listView';
import { Router, Route } from '@smartface/router';
import * as ListViewItems from 'lib/listViewItemTypes';
import { i18n } from '@smartface/i18n';

type Processor = ListViewItems.ProcessorTypes.ILviCheckoutSuccessful;

export default class PgCheckoutSuccessful extends withDismissAndBackButton(PgCheckoutSuccessfulDesign) {
    data: Processor[];
    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.onRowSwipe = onRowSwipe.bind(this);
        this.lvMain.refreshEnabled = false;
        this.lvMain.scrollEnabled = false;
    }
    refreshListView(){
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
    processor():Processor[]{
        const processorItems = [];
        processorItems.push(ListViewItems.getLviCheckoutSuccessful({
            image: 'images://csuccessful.png',
            title: `${i18n.instance.t('orderAccepted')}`,
            description: `${i18n.instance.t('onDelivery')}`,
            btnTrackOrderText: `${i18n.instance.t('trackOrder')}`,
            backHome: `${i18n.instance.t('backHome')}`
        }));
        return processorItems;
    }
    public onShow() {
        super.onShow?.();
        this.refreshListView();
    }

   
    public onLoad() {
        super.onLoad?.();
        this.initListView();
    }
}
