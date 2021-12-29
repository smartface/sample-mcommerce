import PgHomeDesign from 'generated/pages/pgHome';
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import store from '../store/index';
import GviProductItem from 'components/GviProductItem';
import LviHomeProducts from 'components/LviHomeProducts';
import Application from '@smartface/native/application';
import Color from '@smartface/native/ui/color';

export default class PgHome extends PgHomeDesign {
  router: any;
  showcases: any;
  constructor() {
    super();
    // Overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // Overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    // this.lblOffer.text = global.lang['exclusiveOffer'];
    // this.lblOfferSeeAll.text = global.lang['seeAll'];
    // this.lblBestSeller.text = global.lang['bestSeller'];
    // this.lblBestSellerSeeAll.text = global.lang['seeAll'];
  }

  refreshShowcaseProductsGrid() {
    this.showcases = store.getState().showcaseProducts;
    this.listShowcases.itemCount = this.showcases.length;
    this.listShowcases.refreshData();
  }
  initShowcaseProductsGrid() {
    this.listShowcases.rowHeight = 300;
    // this.listShowcases.onRowHeight = (index) => LviHomeProducts.getHeight();
    this.listShowcases.onRowBind = (listViewItem: LviHomeProducts, index: number) => {
      listViewItem.showcaseTitle = this.showcases[index].showcaseTitle;
      listViewItem.showcaseLinkText = this.showcases[index].showcaseLinkText;
      listViewItem.gvProducts.onItemBind = (GridViewItem: GviProductItem, productIndex: number) => {
        GridViewItem.itemTitle = this.showcases[index].products[productIndex].name;
        GridViewItem.itemDesc = this.showcases[index].products[productIndex].description;
        GridViewItem.itemImage = this.showcases[index].products[productIndex].image;
        GridViewItem.itemPrice = `$${this.showcases[index].products[productIndex].price}`;

        listViewItem.gvProducts.onItemSelected = (GridViewItem: GviProductItem, productIndex: number) => {
          this.router.push('/btb/tab1/productDetail', {
            productId: this.showcases[index].products[productIndex].id,
            productName: this.showcases[index].products[productIndex].name,
            productPrice: this.showcases[index].products[productIndex].price,
            productDescription: this.showcases[index].products[productIndex].description,
            productImg: this.showcases[index].products[productIndex].image,
          });
        };
        GridViewItem.onActionClick = () => {
          GridViewItem.initIndicator();
          GridViewItem.toggleIndicator(true);
          store.dispatch({
            type: 'ADD_TO_BASKET',
            payload: {
              data: {
                product: this.showcases[index].products[productIndex],
                count: 1,
              },
            },
          });
          setTimeout(() => {
            GridViewItem.toggleIndicator(false);
          }, 500);
        };
      };
      listViewItem.gvProducts.itemCount = this.showcases[index].products.length;
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
  this.refreshShowcaseProductsGrid();
  Application.statusBar.visible = true;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgHome, superOnLoad: () => void) {
  superOnLoad();
  this.initShowcaseProductsGrid();
  this.headerBar.title = global.lang.homeHeader;
  this.headerBar.android.elevation = 0;
  //   this.scrollView1.autoSizeEnabled = true;
  //   this.scrollView1.layout.applyLayout;
}
