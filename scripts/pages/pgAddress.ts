import PgAddressDesign from 'generated/pages/pgAddress';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import { themeService } from 'theme';
import { onRowBind, onRowCreate, onRowHeight, onRowSwipe, onRowType } from 'lib/listView';
import * as ListViewItems from 'lib/listViewItemTypes';

type Processor = ListViewItems.ProcessorTypes.ILviNoAddress;


export default class PgAddress extends withDismissAndBackButton(PgAddressDesign) {
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
    }
    refreshListView() {
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        if (this.data && this.data.length > 0) {
            if (this.data[0].type === 'LVI_EMPTY_ITEM') {
                this.lvMain.swipeEnabled = false;
            } else {
                this.lvMain.swipeEnabled = true;
            }
        }
        this.lvMain.refreshData();
    }
    processor():Processor[]{
        const processorItems = [];
        processorItems.push(ListViewItems.getLviNoAddress({
            image:'images://location.png',
            title:global.lang.noAddressTitle,
            buttonText: global.lang.addAddress

        }));
        return processorItems;
    }
    public onShow() {
        super.onShow?.();
        this.initBackButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
        this.refreshListView();
    }


    public onLoad() {
        super.onLoad?.();
        this.headerBar.title = global.lang.addressInformation;
        this.initListView();

    }
}
