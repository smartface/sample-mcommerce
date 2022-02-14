import PgCategoriesDesign from 'generated/pages/pgCategories';
import categoriesItem from 'components/CategoryGridViewItem';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Categories } from 'types';
import System from '@smartface/native/device/system';
import { themeService } from 'theme';
import { getCategories } from 'service/commerce';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
import FlHeaderIcon from 'components/FlHeaderIcon';
import FlexLayout from '@smartface/native/ui/flexlayout';

export default class PgCategories extends withDismissAndBackButton(PgCategoriesDesign) {
    categories: Categories[];
    flHeaderIcon: FlHeaderIcon;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.initTitleLayout();
        if (System.OS === System.OSType.ANDROID) {
            //Android item widths fails after theme change this fixes it
            themeService.onChange(() => {
                this.categoriesGrid.itemCount = this.categories.length;
                this.categoriesGrid.refreshData();
            });
        }
    }
    initTitleLayout() {
        this.flHeaderIcon = new FlHeaderIcon();
        themeService.addGlobalComponent(this.flHeaderIcon as any /** to be fixed with stylingcontext next version */, 'titleLayout');
        (this.flHeaderIcon as StyleContextComponentType<FlexLayout>).dispatch({
            type: 'pushClassNames',
            classNames: '.flHeaderIcon'
        });
        this.flHeaderIcon.lblHeader.dispatch({
            type: 'pushClassNames',
            classNames: '.reviews.name'
        });
        this.flHeaderIcon.appName = global.lang.appName;
    }
    addAppIconToHeader() {
        this.headerBar.title = '';
        this.headerBar.titleLayout = this.flHeaderIcon;
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
            showWaitDialog();
            this.categories = await getCategories();
            if (this.categories) {
                this.refreshGridView();
            }
        } catch (error) {
            alert(global.lang.categoriesServiceError);
        } finally {
            this.categoriesGrid.stopRefresh();
            hideWaitDialog();
        }
    }

    onShow() {
        super.onShow();
        this.addAppIconToHeader()
        this.fetchCategories();
    }
    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.categoriesHeader;
        this.headerBar.leftItemEnabled = false;
        this.initCategoriesGrid();
    }
}
