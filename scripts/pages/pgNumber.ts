import PgNumberDesign from 'generated/pages/pgNumber';
import View from '@smartface/native/ui/view';
import KeyboardType from '@smartface/native/ui/keyboardtype';
import Application from '@smartface/native/application';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import System from '@smartface/native/device/system';

export default class PgNumber extends PgNumberDesign {
    router: any;
    leftItem: HeaderBarItem
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.btnRoute.on(View.Events.Touch, () => {
            this.router.push('/pages/pgVerification')
        })
        this.lblTitle.text = global.lang.enterMobilNumberText
        this.lblText.text = global.lang.mobileNumber
	}
    initMaterialTextBox() {
        this.mtbNumber.options = {
            text: "+90"
        }
        this.mtbNumber.materialTextBox.keyboardType = KeyboardType.NUMBER;
    }
    addHeaderWithDirectImage() {
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
function onShow(this: PgNumber, superOnShow: () => void) {
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
function onLoad(this: PgNumber, superOnLoad: () => void) {
	superOnLoad();
    this.initMaterialTextBox()
    this.addHeaderWithDirectImage()
}
