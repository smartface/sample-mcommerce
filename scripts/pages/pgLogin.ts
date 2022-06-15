import PgLoginDesign from 'generated/pages/pgLogin';
import { Router, Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { themeService } from 'theme';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import * as ListViewItems from 'lib/listViewItemTypes';

type Processor =
    | ListViewItems.ProcessorTypes.ILviLogin

export default class PgLogin extends withDismissAndBackButton(PgLoginDesign) {
    private data: Processor[]

    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    initListView(){
        this.lvMain.refreshEnabled = false;
        this.lvMain.scrollEnabled = true;
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
    }
    refrestListView(){
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }

    processor():Processor[]{
        const processorItems = [];
           processorItems.push(
               ListViewItems.getLviLogin({
                   router : this.router,
               })
           )
        return processorItems;
    }
    

    onShow() {
        super.onShow();
        this.refrestListView();
        this.initDismissButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
    }
    onLoad() {
        super.onLoad();
        this.headerBar.title = "";
        this.initListView();

    }
}
