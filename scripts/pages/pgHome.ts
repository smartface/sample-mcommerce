import PgHomeDesign from 'generated/pages/pgHome';
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import store from '../store/index';
import GviProductItem from 'components/GviProductItem';
import Application from '@smartface/native/application';
import Color from '@smartface/native/ui/color';

export default class PgHome extends PgHomeDesign {
  router: any;

  constructor() {
    super();
    // Overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // Overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    this.lblOffer.text = global.lang['exclusiveOffer'];
    this.lblOfferSeeAll.text = global.lang['seeAll'];
    this.lblBestSeller.text = global.lang['bestSeller'];
    this.lblBestSellerSeeAll.text = global.lang['seeAll'];
  }

  initProductsGrid() {
    const products = store.getState().products;
    this.productsGrid.scrollBarEnabled = false;
    this.productsGrid.onItemBind = (GridViewItem: GviProductItem, index: number) => {
      GridViewItem.itemTitle = products[index].name;
      GridViewItem.itemDesc = products[index].description;
      GridViewItem.itemImage = products[index].image;
      GridViewItem.itemPrice = `$${products[index].price}`;
      GridViewItem.onActionClick = function () {
        GridViewItem.initIndicator();
        GridViewItem.toggleIndicator(true);
        store.dispatch({
          type: 'ADD_TO_BASKET',
          payload: {
            data: {
              product: products[index],
              count: 1,
            },
          },
        });
        setTimeout(() => {
          GridViewItem.toggleIndicator(false);
        }, 1000);
      }.bind(GridViewItem);
    };
    this.productsGrid.itemCount = products.length;

    this.productsBestSellerGrid.scrollBarEnabled = false;
    this.productsBestSellerGrid.onItemBind = (GridViewItem: GviProductItem, index: number) => {
      GridViewItem.itemTitle = products[index].name;
      GridViewItem.itemDesc = products[index].description;
      GridViewItem.itemImage = products[index].image;
      GridViewItem.itemPrice = `$${products[index].price}`;
      GridViewItem.onActionClick = function () {
        GridViewItem.initIndicator();
        GridViewItem.toggleIndicator(true);
        store.dispatch({
          type: 'ADD_TO_BASKET',
          payload: {
            data: {
              product: products[index],
              count: 1,
            },
          },
        });
        setTimeout(() => {
          GridViewItem.toggleIndicator(false);
        }, 1000);
      }.bind(GridViewItem);
    };
    this.productsBestSellerGrid.itemCount = products.length;

    this.productsGrid.onItemSelected = (GridViewItem: GviProductItem, index: number) => {
      this.router.push('/btb/tab1/productDetail', {
        productName: products[index].name,
        productPrice: products[index].price,
        productDescription: products[index].description,
        productImg: products[index].image,
      });
    };
    this.productsBestSellerGrid.onItemSelected = (GridViewItem: GviProductItem, index: number) => {
      this.router.push('/btb/tab1/productDetail', {
        productId: products[index].id,
        productName: products[index].name,
        productPrice: products[index].price,
        productDescription: products[index].description,
        productImg: products[index].image,
      });
    };
  }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgHome, superOnShow: () => void) {
  superOnShow();
  Application.statusBar.visible = true;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgHome, superOnLoad: () => void) {
  superOnLoad();
  // this.headerBar.leftItemEnabled = false
  // this.headerBar.title = 'Maltepe, Istanbul'
  // this.headerBar.backgroundColor = Color.WHITE;
  // this.headerBar.android.elevation = 0;
  this.initProductsGrid();
  this.headerBar.title = global.lang.homeHeader;
  this.headerBar.android.elevation = 0;
  this.scrollView1.autoSizeEnabled = true;
  this.scrollView1.layout.applyLayout;
}
