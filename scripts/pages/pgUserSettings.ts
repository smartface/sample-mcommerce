import Application from '@smartface/native/application';
import Data from '@smartface/native/global/data';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { CURRENT_THEME } from 'constants/deviceVariables.json';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { getLviRow1LineLarge } from 'lib/listViewItemTypes';
import PgUserSettingsDesign from 'generated/pages/pgUserSettings';
import { ThemeService } from 'theme';
import Image from '@smartface/native/ui/image';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import { NativeStackRouter } from '@smartface/router';
const { image } = getCombinedStyle('.sf-headerBar.close');

export default class PgUserSettings extends PgUserSettingsDesign {
    router: NativeStackRouter;
    private data: ReturnType<typeof getLviRow1LineLarge>[];
    private __isBusy = false;
    leftItem: HeaderBarItem;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
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
                    ThemeService.changeTheme(targetTheme);
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
}

function onShow(this: PgUserSettings, superOnShow: () => void) {
    superOnShow();
    this.headerBar.title = global.lang.settingsHeader;
    this.refreshListView();
}

function onLoad(this: PgUserSettings, superOnLoad: () => void) {
    superOnLoad();
    this.initListView();
}
