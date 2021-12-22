import Color from '@smartface/native/ui/color';
import PgCategoriesDesign from 'generated/pages/pgCategories';
import store from '../store/index'
import categoriesItem from 'components/CategoryGridViewItem'
import Image from '@smartface/native/ui/image';
export default class PgCategories extends PgCategoriesDesign {
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initCategoriesGrid() {
        const categories = store.getState().categories;
        this.categoriesGrid.scrollBarEnabled = false;
        this.categoriesGrid.onItemBind = (GridViewItem: categoriesItem, index: number) => {
            GridViewItem.flCategoryItemWrapper.borderWidth = 1
            GridViewItem.flCategoryItemWrapperBorderColor = categories[index].menuBorderColor
            GridViewItem.flCategoryItemWrapperBackgroundColor = categories[index].menuColor
            GridViewItem.categoryTitle = categories[index].title;
            GridViewItem.categoryImage = categories[index].categoryImg
        }
        this.categoriesGrid.itemCount = categories.length;
    }

}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgCategories, superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgCategories, superOnLoad: () => void) {
    superOnLoad();
    // this.headerBar.leftItemEnabled = false
    // this.headerBar.title = 'Categories'
    // this.headerBar.backgroundColor = Color.WHITE;
    // this.headerBar.android.elevation = 0;
    this.initCategoriesGrid();
}
