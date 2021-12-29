import Color from '@smartface/native/ui/color';
import Font from '@smartface/native/ui/font';
import Dialog from '@smartface/native/ui/dialog';
import LviCartItem from 'components/LviCartItem';
import PgCartDesign from 'generated/pages/pgCart';
import store from 'store';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';

export default class PgCart extends PgCartDesign {
  unsubscribe: any;
  basketItems: any;
  rightItem: HeaderBarItem;
  myDialog = new Dialog();
  constructor() {
    super();
    // Overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // Overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    // this.rightItem.onPress = () => {
    //   this.myDialog.show();
    // };
    //this.btnGoToCheckOut.text = global.lang.goToCheckout;
  }
  addRightItem() {
    this.rightItem = new HeaderBarItem();
    this.rightItem.title = 'Select';
    this.rightItem.font = Font.create('Nunito', 16);
    this.rightItem.color = Color.BLACK;
    this.headerBar.setItems([this.rightItem]);
  }
  refreshCart() {
    this.basketItems = store.getState().basket;
    console.log('refreshCart > basket Items', this.basketItems);
    this.lvCart.itemCount = this.basketItems.length;
    this.lvCart.refreshData();
  }
  initCartList() {
    this.lvCart.onRowHeight = (index) => LviCartItem.getHeight();
    this.lvCart.onRowBind = (listViewItem: LviCartItem, index: number) => {
      listViewItem.productPrice = this.basketItems[index].price.toString();
      listViewItem.productName = this.basketItems[index].name;
      listViewItem.productInfo = this.basketItems[index].description;
      listViewItem.productImage = this.basketItems[index].image;
      listViewItem.productCount = this.basketItems[index].count.toString();
      listViewItem.onActionPlus = () => {
        store.dispatch({
          type: 'ADD_TO_BASKET',
          payload: {
            data: {
              product: this.basketItems[index],
              count: 1,
            },
          },
        });

        this.refreshCart();
      };
      listViewItem.onActionMinus = () => {
        store.dispatch({
          type: 'ADD_TO_BASKET',
          payload: {
            data: {
              product: this.basketItems[index],
              count: -1,
            },
          },
        });

        this.refreshCart();
      };
      listViewItem.onRemoveAction = () => {
        store.dispatch({
          type: 'REMOVE_FROM_BASKET',
          payload: {
            data: {
              productId: this.basketItems[index].id,
            },
          },
        });

        this.refreshCart();
      };
    };
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
  this.headerBar.title = global.lang.mycartHeader;
  this.basketItems = store.getState().basket;
  this.refreshCart();
  // this.unsubscribe = store.subscribe(this.getBasketItems)
  // this.unsubscribe();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgCart, superOnLoad: () => void) {
  superOnLoad();
  this.headerBar.leftItemEnabled = false;
  this.headerBar.backgroundColor = Color.WHITE;
  this.headerBar.android.elevation = 0;
  this.initCartList();
  this.addRightItem();
}
