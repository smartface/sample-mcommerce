import Application from '@smartface/native/application';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import PgProductDetailDesign from 'generated/pages/pgProductDetail';

export default class PgProductDetail extends PgProductDetailDesign {
    router: any
    leftItem: HeaderBarItem
    rightItem: HeaderBarItem
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.headerBar.title = ""
	}
    addLeftItem() {
        this.leftItem = new HeaderBarItem();
        this.leftItem.image = "images://backbtn.png";
        this.leftItem.color = Color.BLACK;
        this.headerBar.setLeftItem(this.leftItem);
    }
    addRightItem() {
        this.rightItem = new HeaderBarItem();
        this.rightItem.image = "images://share.png";
        this.rightItem.color = Color.BLACK;
        this.headerBar.setItems([this.rightItem]);
    }

}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgProductDetail, superOnShow: () => void) {
	superOnShow();
    Application.statusBar.visible = true;
    Application.statusBar.backgroundColor = Color.create("#F2F3F2")
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgProductDetail, superOnLoad: () => void) {
	superOnLoad();
    this.addLeftItem()
    this.addRightItem()
}
