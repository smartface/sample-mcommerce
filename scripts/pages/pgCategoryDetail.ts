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
    initGridView() {
        const categoryProducts = state.getState().products.filter((product) => product.categoryId === this.routeData.id);
        this.gvMain.scrollBarEnabled = false;
        this.gvMain.onItemBind = (GridViewItem: GviProductItem, productIndex: number) => {
            GridViewItem.itemTag = categoryProducts[productIndex].discountTag;
            GridViewItem.itemTitle = categoryProducts[productIndex].name;
            GridViewItem.itemDesc = categoryProducts[productIndex].description;
            GridViewItem.itemImage = categoryProducts[productIndex].image;
            GridViewItem.itemPrice = `$${categoryProducts[productIndex].price}`;
        };
        this.gvMain.itemCount = categoryProducts.length;
    }
}

function onShow(this: PgCategoryDetail, superOnShow: () => void) {
    superOnShow();
    this.initGridView();
}

function onLoad(this: PgCategoryDetail, superOnLoad: () => void) {
    superOnLoad();
    this.initGridView();
    this.headerBar.title = this.routeData.title;
}
