import PgWelcomeDesign from 'generated/pages/pgWelcome';
import View from '@smartface/native/ui/view';
import System from '@smartface/native/device/system';
import Application from '@smartface/native/application';
import Color from '@smartface/native/ui/color';

export default class PgWelcome extends PgWelcomeDesign {
    router: any
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnStart.on(View.Events.Touch, () => {
            this.router.push('pgNumber')
        })
        this.lblWelcome.text = global.lang.welcomeText
        this.lblSubtext.text = global.lang.welcomeSubText
        this.btnStart.text = global.lang.getStarted
	}
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgWelcome, superOnShow: () => void) {
	superOnShow();
    if (System.OS !== 'iOS') {
        Application.statusBar.visible = true;
        Application.statusBar.backgroundColor = Color.WHITE
    }
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgWelcome, superOnLoad: () => void) {
	superOnLoad();
}
