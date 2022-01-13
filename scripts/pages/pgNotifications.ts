import PgNotificationsDesign from 'generated/pages/pgNotifications';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { getLviRow1LineLarge } from 'lib/listViewItemTypes';

export default class PgNotifications extends PgNotificationsDesign {
    private data: ReturnType<typeof getLviRow1LineLarge>[];
    private __isBusy = false;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
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
}

function onShow(this: PgNotifications, superOnShow: () => void) {
    superOnShow();
    this.refreshListView();
}

function onLoad(this: PgNotifications, superOnLoad: () => void) {
    superOnLoad();
    this.initListView();
}
