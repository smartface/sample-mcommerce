import PgCategoriesDesign from 'generated/pages/pgCategories';
import store from '../store/index';
import categoriesItem from 'components/CategoryGridViewItem';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Categories } from 'types';
import System from '@smartface/native/device/system';
import { themeService } from 'theme';
import { getCategories, getCategoryImage } from 'service/commerce';
import FlWaitDialog from 'components/FlWaitDialog';
import dialog from 'lib/dialog';
import Dialog from '@smartface/native/ui/dialog';
export default class PgCategories extends withDismissAndBackButton(PgCategoriesDesign) {
    categories: Categories[];
    waitDialog: Dialog;
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
    async initCategoriesGrid() {
        this.categoriesGrid.scrollBarEnabled = false;
        this.categoriesGrid.onItemBind = (GridViewItem: categoriesItem, index: number) => {
            GridViewItem.flCategoryItemWrapper.borderWidth = 1;
            GridViewItem.flCategoryItemWrapperBorderColor = this.categories[index].borderColor;
            GridViewItem.flCategoryItemWrapperBackgroundColor = this.categories[index].menuColor;
            GridViewItem.categoryTitle = this.categories[index].title;
            GridViewItem.imageUrl = this.categories[index]._id;
            this.categoriesGrid.onItemSelected = (GridViewItem: categoriesItem, index: number) => {
                this.router.push('/btb/tab2/categoryDetail', {
                    dataId: this.categories[index]._id,
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
    async fetchCategories() {
        this.waitDialog.show();
        try {
            this.categories = await getCategories();
            if (this.categories) {
                this.refreshGridView();
            }
        } catch (error) {
        } finally {
            setTimeout(() => {
                this.waitDialog.hide();
            }, 1000);
        }
    }
    initDialog() {
        const flWaitDialog = new FlWaitDialog();
        this.waitDialog = dialog(flWaitDialog);
    }
    onShow() {
        super.onShow();
    }
    onLoad() {
        super.onLoad();
        this.initDialog();
        this.headerBar.title = global.lang.categoriesHeader;
        this.headerBar.leftItemEnabled = false;
        this.initCategoriesGrid();
        this.fetchCategories();
    }
}
