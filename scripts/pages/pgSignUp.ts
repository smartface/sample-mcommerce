import PgSignUpDesign from 'generated/pages/pgSignUp';
import Color from '@smartface/native/ui/color';
import Application from '@smartface/native/application';
import System from '@smartface/native/device/system';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { themeService } from 'theme';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';

type Processor =
    | ListViewItems.ProcessorTypes.ILviSignup
export default class PgSignUp extends withDismissAndBackButton(PgSignUpDesign) {
    data :Processor[]
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
    refreshListView(){
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
    processor():Processor[]{
        const processorItems = [];
           processorItems.push(
               ListViewItems.getLviSignup({
                   router : this.router,
               })
           )
        return processorItems;
    }
    
    onShow() {
        super.onShow();
        this.refreshListView();
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
