import PgCategoriesDesign from 'generated/pages/pgCategories';
import categoriesItem from 'components/CategoryGridViewItem';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Categories } from 'types';
import System from '@smartface/native/device/system';
import { themeService } from 'theme';
import { getCategories } from 'service/commerce';
import Network from '@smartface/native/device/network';
import { ON_SHOW_TIMEOUT } from 'constants';

export default class PgCategories extends withDismissAndBackButton(PgCategoriesDesign) {
    categories: Categories[] = Array.from({ length: 10 }).map((_, index: number) => (
        { _id: "1", borderColor: "#D2D2D2", title: "", categoryImg: "", menuColor: "#FFFFFF" }));
    initialized = false;
    noConnection: boolean;
    constructor(private router?: Router, private route?: Route) {
        super({});
        if (System.OS === System.OSType.ANDROID) {
            //Android item widths fails after theme change this fixes it
            themeService.onChange(() => {
                this.categoriesGrid.itemCount = this.categories.length;
                this.categoriesGrid.refreshData();
            });
        }
        this.noConnection = Network.connectionType === Network.ConnectionType.NONE;
    }
    initCategoriesGrid() {
        this.categoriesGrid.onPullRefresh = () => {
            this.categories = [];
            this.fetchCategories();
        };
        this.categoriesGrid.scrollBarEnabled = false;
        this.categoriesGrid.onItemBind = (GridViewItem: categoriesItem, index: number) => {
            GridViewItem.flCategoryItemWrapper.borderWidth = 1;
            GridViewItem.flCategoryItemWrapperBorderColor = this.categories[index].borderColor;
            GridViewItem.flCategoryItemWrapperBackgroundColor = this.categories[index].menuColor;
            GridViewItem.categoryTitle = this.categories[index].title;
            GridViewItem.imageUrl = this.categories[index]._id;
            this.initialized ? GridViewItem.stopShimmering() : GridViewItem.startShimmering();
        };
        this.categoriesGrid.onItemSelected = (GridViewItem: categoriesItem, index: number) => {
            this.router.push('categoryDetail', {
                dataId: this.categories[index]._id,
                title: this.categories[index].title,
                isShowcase: false
            });
        };
    }
    refreshGridView() {
        this.categoriesGrid.itemCount = this.categories.length;
        this.categoriesGrid.refreshData();
    }
    async fetchCategories() {
        try {
            this.categories = await getCategories();
            if (this.categories) {
                this.refreshGridView();
            }
        } catch (error) {
            if (!this.noConnection) {
                alert(global.lang.categoriesServiceError);
            }
        } finally {
            this.categoriesGrid.stopRefresh();
            this.initialized = true;
        }
    }

    onShow() {
        super.onShow();
        this.refreshGridView();
        if (!this.initialized) {
            setTimeout(() => {
                this.fetchCategories();
            }, ON_SHOW_TIMEOUT);
            
        }
    }
    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.categoriesHeader;
        this.headerBar.leftItemEnabled = false;
        this.initCategoriesGrid();
    }
}
