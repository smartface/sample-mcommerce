import PgFavoritesDesign from 'generated/pages/pgFavorites';
import lviFavorites from 'components/LviFavorites';
import store from '../store/index';
import Image from '@smartface/native/ui/image';
import Color from '@smartface/native/ui/color';
import LviFavorites from 'components/LviFavorites';
import ListView from '@smartface/native/ui/listview';
import System from '@smartface/native/device/system';
import Font from '@smartface/native/ui/font';
import View from '@smartface/native/ui/view';

export default class PgFavorites extends PgFavoritesDesign {
  favoriteProducts: any;
  constructor() {
    super();
    // Overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // Overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    this.btnAddAllToCart.text = global.lang.addAllToCart;
  }
  applyDimension(index: number, item: any): void {
    if (index == 0) {
      item.android.borderTopRightRadius = 5;
      item.android.borderTopLeftRadius = 5;
      item.android.borderBottomLeftRadius = 5;
      item.android.borderBottomRightRadius = 5;
    } else if (index == store.getState().products.length - 1) {
      item.android.borderTopRightRadius = 5;
      item.android.borderTopLeftRadius = 5;
      item.android.borderBottomLeftRadius = 5;
      item.android.borderBottomRightRadius = 5;
    } else {
      item.android.borderTopRightRadius = 5;
      item.android.borderTopLeftRadius = 5;
      item.android.borderBottomLeftRadius = 5;
      item.android.borderBottomRightRadius = 5;
    }
    item.android.paddingLeft = 230;
    item.android.paddingTop = 30;
    item.android.paddingRight = 15;
    item.android.paddingBottom = 20;
  }
  deleteAndRefresh(e: { index: number }): void {
    let length = this.favoriteProducts.length;
    let removedItem = this.favoriteProducts.find((product, index) => index === e.index);
    this.favoriteProducts.splice(e.index, 1);
    store.dispatch({
      type: 'REMOVE_FROM_FAVORITES',
      payload: {
        data: {
          productId: removedItem.id,
        },
      },
    });
    // this.listView1.deleteRowRange({
    //   itemCount: 1,
    //   positionStart: e.index,
    //   ios: {
    //     animation: ListView.iOS.RowAnimation.FADE,
    //   },
    // });
    if (System.OS == 'iOS') {
    } else {
      this.listView1.refreshRowRange({ itemCount: 1, positionStart: 0 });
      this.listView1.refreshRowRange({ itemCount: 1, positionStart: this.favoriteProducts.length - 1 });
    }
    this.refreshFavoritesList();
  }
  refreshFavoritesList() {
    this.favoriteProducts = store.getState().favorites;
    this.listView1.itemCount = this.favoriteProducts.length;
    this.listView1.refreshData();
  }
  initFavoriteList() {
    this.listView1.swipeEnabled = true;
    // this.listView1.contentInset = { top: 10, bottom: 0 };
    this.listView1.onRowCanSwipe = (index: number) => {
      return [ListView.SwipeDirection.RIGHTTOLEFT];
    };
    this.listView1.onRowSwipe = (e: any): ListView.SwipeItem[] => {
      if (e.direction == ListView.SwipeDirection.RIGHTTOLEFT) {
        console.log('e', e);
        e.ios.expansionSettings.buttonIndex = 0;
        e.ios.expansionSettings.threshold = 1.5;
        e.ios.expansionSettings.fillOnTrigger = true;
        let deleteItem = new ListView.SwipeItem();
        deleteItem.text = 'Delete';
        deleteItem.backgroundColor = Color.RED;
        deleteItem.textColor = Color.create('#FFFFFF');
        deleteItem.icon = Image.createFromFile('images://cross.png');
        //@ts-ignore
        //@ts-ignore
        deleteItem.ios.isAutoHide = false;
        deleteItem.onPress = (e: any) => {
          this.deleteAndRefresh(e);
        };
        this.applyDimension(e.index, deleteItem);
        return [deleteItem];
      }
    };

    this.listView1.onRowBind = (listViewItem: lviFavorites, index: number) => {
      listViewItem.itemPrice = this.favoriteProducts[index].price;
      listViewItem.itemTitle = this.favoriteProducts[index].name;
      listViewItem.itemDesc = this.favoriteProducts[index].description;
      listViewItem.itemImage = this.favoriteProducts[index].image;
    };
    this.listView1.rowHeight = 120;
  }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgFavorites, superOnShow: () => void) {
  superOnShow();
  this.refreshFavoritesList();
  this.headerBar.title = global.lang.favouriteHeader;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgFavorites, superOnLoad: () => void) {
  superOnLoad();
  this.headerBar.leftItemEnabled = false;
  this.headerBar.title = 'Favorites';
  this.headerBar.backgroundColor = Color.WHITE;
  this.headerBar.android.elevation = 0;
  this.initFavoriteList();
}
