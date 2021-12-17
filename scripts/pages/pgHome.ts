import PgHomeDesign from 'generated/pages/pgHome';
import favoritesListViewItem from 'generated/my-components/FavoritesListViewItem'
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import store from '../store/index'
import GviProductItem from 'components/GviProductItem'
import Application from '@smartface/native/application';
import Color from '@smartface/native/ui/color';

export default class PgHome extends PgHomeDesign {
    router:any
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        // this.label2.on(View.Events.Touch, () => {
        //     this.router.push('/btb')
        // })
    }

    initCategoriesGrid() {
        const products = store.getState().products;
        this.productsGrid.itemCount = products.length;
        this.productsGrid.scrollBarEnabled = false;
        this.productsGrid.onItemBind = (GridViewItem: GviProductItem, index: number) => {
            GridViewItem.gviLblProductItemTitle.text = products[index].name
            GridViewItem.gviProductItemDesc.text = products[index].description
            GridViewItem.gviProductItemImg.image = Image.createFromFile(`images://${products[index].image}`)
            GridViewItem.gviProductItemPrice.text = `$${products[index].price}`
        }
        this.productsBestSellerGrid.itemCount = products.length;
        this.productsBestSellerGrid.scrollBarEnabled = false;
        this.productsBestSellerGrid.onItemBind = (GridViewItem: GviProductItem, index: number) => {
            GridViewItem.gviLblProductItemTitle.text = products[index].name
            GridViewItem.gviProductItemDesc.text = products[index].description
            GridViewItem.gviProductItemImg.image = Image.createFromFile(`images://${products[index].image}`)
            GridViewItem.gviProductItemPrice.text = `$${products[index].price}`
        }
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
    this.headerBar.leftItemEnabled = false
    this.headerBar.title = 'Maltepe, Istanbul'
     this.initCategoriesGrid();

}
