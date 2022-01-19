import PgCategoriesDesign from 'generated/pages/pgCategories';
import store from '../store/index';
import categoriesItem from 'components/CategoryGridViewItem';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgCategories extends withDismissAndBackButton(PgCategoriesDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    initCategoriesGrid() {
        const categories = store.getState().categories;
        this.categoriesGrid.scrollBarEnabled = false;
        this.categoriesGrid.onItemBind = (GridViewItem: categoriesItem, index: number) => {
            GridViewItem.flCategoryItemWrapper.borderWidth = 1;
            GridViewItem.flCategoryItemWrapperBorderColor = categories[index].menuBorderColor;
            GridViewItem.flCategoryItemWrapperBackgroundColor = categories[index].menuColor;
            GridViewItem.categoryTitle = categories[index].title;
            GridViewItem.categoryImage = categories[index].categoryImg;
            this.categoriesGrid.onItemSelected = (GridViewItem: categoriesItem, index: number) => {
                this.router.push('/btb/tab2/categoryDetail', {
                    dataId: categories[index].id,
                    title: categories[index].title,
                    isShowcase: false
                });
            };
        };

        this.categoriesGrid.itemCount = categories.length;
    }
    onShow() {
        super.onShow();
    }
    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.categoriesHeader;
        this.headerBar.android.elevation = 0;
        this.initCategoriesGrid();
        this.headerBar.leftItemEnabled = false;
    }
}
