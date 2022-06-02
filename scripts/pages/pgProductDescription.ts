import PgProductDescriptionDesign from 'generated/pages/pgProductDescription';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { themeService } from 'theme';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import * as ListViewItems from 'lib/listViewItemTypes';
import { i18n } from '@smartface/i18n';

type Processor = ListViewItems.ProcessorTypes.ILviDescription;

export default class PgProductDescription extends withDismissAndBackButton(PgProductDescriptionDesign) {
    data: Processor[];
    constructor(private router?: Router, private route?: Route) {
        super({});
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
        this.initListView();
        this.headerBar.title = `${i18n.instance.t('productDetail')}`;
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
        const processorItems = [];
        this.route.getState().routeData?.productDescription
            ? processorItems.push(
                  ListViewItems.getLviDescription({
                      description: this.route.getState().routeData?.productDescription
                  })
              )
            : processorItems.push(
                  ListViewItems.getLviEmptyItem({
                      emptyImage: 'images://empty_description.png',
                      emptyTitle: `${i18n.instance.t('emptyDescription')}`
                  })
              );
        return processorItems;
    }
}
