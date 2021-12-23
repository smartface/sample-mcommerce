import Application from '@smartface/native/application';
import Data from '@smartface/native/global/data';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import View from '@smartface/native/ui/view';
import PgUserSettingsDesign from 'generated/pages/pgUserSettings';

export default class PgUserSettings extends PgUserSettingsDesign {
    router: any
    leftItem: HeaderBarItem
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.lblLanguage.text = global.lang.langText
        this.lblEnglish.text = global.lang.english
        this.lblTurkish.text = global.lang.turkish

        this.lblTheme.text = global.lang.themeText
        this.lblLight.text = global.lang.lightTheme
        this.lblDark.text = global.lang.darkTheme

        this.lblTurkish.on(View.Events.Touch, () => {
            Data.setStringVariable('language', 'tr');
            Application.restart();
        })

        this.lblEnglish.on(View.Events.Touch, () => {
            Data.setStringVariable('language', 'en');
            Application.restart();
        })
	}
    addLeftItem() {
        this.leftItem = new HeaderBarItem();
        this.leftItem.image = "images://backbtn.png";
        this.leftItem.color = Color.BLACK;
        this.headerBar.setLeftItem(this.leftItem);
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
    this.headerBar.title = global.lang.settingsHeader
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgUserSettings, superOnLoad: () => void) {
	superOnLoad();
    this.addLeftItem()
}
