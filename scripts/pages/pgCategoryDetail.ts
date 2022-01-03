import PgCategoryDetailDesign from 'generated/pages/pgCategoryDetail';
import state from '../store/index';
import GviProductItem from '../components/GviProductItem';
export default class PgCategoryDetail extends PgCategoryDetailDesign {
    routeData: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initgridview() {
        const products = state.getState().products.filter((product) => product.categoryId === this.routeData.id);
        this.gvMain.scrollBarEnabled = false;
        this.gvMain.onItemBind = (GridViewItem: GviProductItem, productIndex: number) => {
            //GridViewItem.itemTag = products[productIndex].discountTag;
            GridViewItem.itemTitle = products[productIndex].name;
            GridViewItem.itemDesc = products[productIndex].description;
            GridViewItem.itemImage = products[productIndex].image;
            GridViewItem.itemPrice = `$${products[productIndex].price}`;
        };
        this.gvMain.itemCount = products.length;
    }
}

function onShow(this: PgCategoryDetail, superOnShow: () => void) {
    superOnShow();
    this.initgridview();
}

function onLoad(this: PgCategoryDetail, superOnLoad: () => void) {
    superOnLoad();
    this.initgridview();
    this.headerBar.title = this.routeData.title;
}
