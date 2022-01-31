import Data from '@smartface/native/global/data';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { CURRENT_THEME } from 'constants/deviceVariables.json';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { getLviRow1LineLarge } from 'lib/listViewItemTypes';
import PgUserSettingsDesign from 'generated/pages/pgUserSettings';
import { themeService } from 'theme';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgUserSettings extends withDismissAndBackButton(PgUserSettingsDesign) {
    private data: ReturnType<typeof getLviRow1LineLarge>[];
    private static _instance: PgUserSettings;
    private __isBusy = false;
    leftItem: HeaderBarItem;
    constructor(public router?: Router, public route?: Route) {
        super({});
        themeService.onChange(() => this.onShow());
    }
    public static getInstance(router?: Router, route?: Route) {
        return this._instance || (this._instance = new this(router, route));
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
        const themeItem = getLviRow1LineLarge({
            image: 'images://ayarlar_karanlikmod.png',
            title: global.lang.changeTheme,
            showSeparator: true,
            themeSwitch: true,
            onTouchEnded: () => {
                if (this.__isBusy) {
                    return;
                }
                this.__isBusy = true;
                setTimeout(() => {
                    const currentTheme = Data.getStringVariable(CURRENT_THEME);
                    const targetTheme = currentTheme === 'mCommerceDarkTheme' ? 'mCommerceTheme' : 'mCommerceDarkTheme';
                    themeService.changeTheme(targetTheme);
                    Data.setStringVariable(CURRENT_THEME, targetTheme);
                    setTimeout(() => {
                        this.__isBusy = false;
                    }, 500);
                }, 100);
            }
        });
        const biometricItem = getLviRow1LineLarge({
            image: true ? 'images://icon_faceid.png' : 'images://icon_fingerprint.png',
            title: 'Face Recognition',
            showSeparator: true,
            enableSwitch: true,
            switchToggle: true,
            themeSwitch: false
        });
        this.data = [themeItem, biometricItem];
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
    onShow() {
        super.onShow();
        this.headerBar.title = global.lang.settingsHeader;
        this.refreshListView();
        this.initDismissButton(this.router);
    }
    /**
     * This class is used singleton, onLoad will be triggered once
     */
    onLoad() {
        super.onLoad();
        this.initListView();
    }
}
