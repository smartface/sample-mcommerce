import Application from '@smartface/native/application';
import System from '@smartface/native/device/system';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import PgProductDetailDesign from 'generated/pages/pgProductDetail';
import store from 'store';

export default class PgProductDetail extends PgProductDetailDesign {
    router: any
    leftItem: HeaderBarItem
    rightItem: HeaderBarItem
    routeData: any
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.headerBar.title = ""

        this.btnAddToBasket.text = global.lang.addToBasket
        this.imgMinus.on(View.Events.Touch, () => {
            let product = store.getState().products.find(id => id == this.routeData.productId)
            console.log('Product:', product)
            store.dispatch({
                type: "ADD_TO_BASKET",
                payload: {
                    data: {
                        product: product,
                        count: 1
                    }
                }
            })
        })
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
    addToBasket() {
        
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
 
    if (System.OS !== 'iOS') {
          Application.statusBar.visible = true;
    Application.statusBar.backgroundColor = Color.create("#F2F3F2")
      }
    this.productDetailPrice.text = `$${this.routeData.productPrice}`
    this.productDetailDesc.text = this.routeData.productDescription
    this.imgProductDetail.image = Image.createFromFile(`images://${this.routeData.productImg}`)
    this.productDetailName.text = this.routeData.productName

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
