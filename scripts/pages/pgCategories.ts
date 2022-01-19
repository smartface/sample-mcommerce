import PgCategoriesDesign from 'generated/pages/pgCategories';
import store from '../store/index';
import categoriesItem from 'components/CategoryGridViewItem';
import { NativeStackRouter } from '@smartface/router';
import { Categories } from 'types';

export default class PgCategories extends PgCategoriesDesign {
    router: NativeStackRouter;
    categories: Categories[];
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initCategoriesGrid() {
        this.categories = store.getState().categories;
        this.categoriesGrid.scrollBarEnabled = false;
        this.categoriesGrid.onItemBind = (GridViewItem: categoriesItem, index: number) => {
            GridViewItem.flCategoryItemWrapper.borderWidth = 1;
            GridViewItem.flCategoryItemWrapperBorderColor = this.categories[index].menuBorderColor;
            GridViewItem.flCategoryItemWrapperBackgroundColor = this.categories[index].menuColor;
            GridViewItem.categoryTitle = this.categories[index].title;
            GridViewItem.categoryImage = this.categories[index].categoryImg;
            this.categoriesGrid.onItemSelected = (GridViewItem: categoriesItem, index: number) => {
                this.router.push('/btb/tab2/categoryDetail', {
                    dataId: this.categories[index].id,
                    title: this.categories[index].title,
                    isShowcase: false
                });
            };
        };
    }
    refreshGridView() {
        this.categoriesGrid.itemCount = this.categories.length;
        this.categoriesGrid.refreshData();
    }
}

function onShow(this: PgCategories, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgCategories, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = global.lang.categoriesHeader;
    this.initCategoriesGrid();
    this.refreshGridView();
}
