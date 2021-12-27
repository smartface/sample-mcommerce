import Color from '@smartface/native/ui/color';
import LviCartItem from 'components/LviCartItem';
import PgCartDesign from 'generated/pages/pgCart';
import store from 'store';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';

export default class PgCart extends PgCartDesign {
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.btnGoToCheckOut.text = global.lang.goToCheckout
	}
    initCartList() {
        console.log('basket',store.getState().basket)
        const basketItems = store.getState().basket;
        this.lvCart.onRowBind = (listViewItem: LviCartItem, index: number) => {
            listViewItem.productPrice = basketItems[index].price.toString()
            listViewItem.productName = basketItems[index].name
            listViewItem.productInfo = basketItems[index].description
            listViewItem.productImage = basketItems[index].image
            listViewItem.productCount = basketItems[index].count.toString()
        };
        this.lvCart.onRowHeight = (index) => LviCartItem.getHeight();
        this.lvCart.itemCount = basketItems.length;
        this.lvCart.refreshData();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgCart, superOnShow: () => void) {
	superOnShow();
    this.headerBar.title = global.lang.mycartHeader
    this.headerBar.borderVisibility = true
    this.initCartList();

}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgCart, superOnLoad: () => void) {
	superOnLoad();
    this.headerBar.leftItemEnabled = false
    this.headerBar.backgroundColor = Color.WHITE;
    this.headerBar.android.elevation = 0;
    this.initCartList();

}
