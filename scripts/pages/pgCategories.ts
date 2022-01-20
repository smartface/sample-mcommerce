import PgCategoriesDesign from 'generated/pages/pgCategories';
import store from '../store/index';
import categoriesItem from 'components/CategoryGridViewItem';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Categories } from 'types';
import System from '@smartface/native/device/system';
import { themeService } from 'theme';

export default class PgCategories extends withDismissAndBackButton(PgCategoriesDesign) {
    categories: Categories[];
    constructor(private router?: Router, private route?: Route) {
        super({});
        if (System.OS === System.OSType.ANDROID) {
            //Android item widths fails after theme change this fixes it
            themeService.onChange(() => {
                this.categoriesGrid.itemCount = this.categories.length;
                this.categoriesGrid.refreshData();
            });
        }
    }
    initCategoriesGrid() {
        this.categories = store.getState().main.categories;
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
    onShow() {
        super.onShow();
        this.refreshGridView();
    }
    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.categoriesHeader;
        this.initCategoriesGrid();
        this.headerBar.leftItemEnabled = false;
    }
}
