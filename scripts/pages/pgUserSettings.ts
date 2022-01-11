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

//type Processor = ListViewItems.ProcessorTypes.ILviRow1LineLarge;

export default class PgUserSettings extends PgUserSettingsDesign {
    router: any;
    private data: ReturnType<typeof getLviRow1LineLarge>[];
    private __isBusy = false;
    leftItem: HeaderBarItem;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    addLeftItem() {
        this.leftItem = new HeaderBarItem();
        this.leftItem.image = 'images://backbtn.png';
        this.leftItem.color = Color.BLACK;
        this.headerBar.setLeftItem(this.leftItem);
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
            title: 'Change Theme',
            showSeparator: true,
            onTouchEnded: () => {
                if (this.__isBusy) {
                    return;
                }
                this.__isBusy = true;
                setTimeout(() => {
                    const currentTheme = Data.getStringVariable(CURRENT_THEME);
                    const targetTheme = currentTheme === 'mCommerceDarkTheme' ? 'mCommerceTheme' : 'mCommerceDarkTheme';
                    console.log('Current theme:', currentTheme);
                    console.log('Target theme:', targetTheme);
                    //ThemeService.changeTheme(targetTheme);
                    Data.setStringVariable(CURRENT_THEME, targetTheme);
                    setTimeout(() => {
                        this.__isBusy = false;
                    }, 500);
                }, 100);
            }
        });
        this.data = [themeItem];
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgUserSettings, superOnShow: () => void) {
    superOnShow();
    this.headerBar.title = global.lang.settingsHeader;
    this.refreshListView();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgUserSettings, superOnLoad: () => void) {
    superOnLoad();
    this.addLeftItem();
    this.initListView();
}
