import PgNotificationsDesign from 'generated/pages/pgNotifications';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { getLviRow1LineLarge } from 'lib/listViewItemTypes';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { themeService } from 'theme';

export default class PgNotifications extends withDismissAndBackButton(PgNotificationsDesign) {
    private data: ReturnType<typeof getLviRow1LineLarge>[];
    private __isBusy = false;
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    initListView() {
        this.lvMain.refreshEnabled = false;
        this.lvMain.scrollEnabled = false;
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
    }
    refreshListView() {
        const discountItem = getLviRow1LineLarge({
            image: 'images://ayarlar_karanlikmod.png',
            title: 'Discounts',
            showSeparator: true,
            enableSwitch: true,
            switchToggle: true,
            themeSwitch: false
        });
        const campaignItem = getLviRow1LineLarge({
            image: 'images://ayarlar_karanlikmod.png',
            title: 'Campaigns',
            showSeparator: true,
            enableSwitch: true,
            switchToggle: true,
            themeSwitch: false
        });
        this.data = [discountItem, campaignItem];
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
    onShow() {
        super.onShow();
        this.refreshListView();
        this.initBackButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
    }
    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.notifications;
        this.initListView();
    }
}
