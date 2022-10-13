import { themeService } from 'theme';
import LviHomeCategoriesDesign from 'generated/my-components/LviHomeCategories';
import GviHomeCategoryItem from './GviHomeCategoryItem';
import System from '@smartface/native/device/system';
import { getCategoryImage } from 'service/commerce';
import { Categories } from 'types';
const { height } = themeService.getStyle('.lviHomeCategories');
export default class LviHomeCategories extends LviHomeCategoriesDesign {
    pageName?: string | undefined;
    private __items: any[] = [];
    private __onCategoryClick: (category: any) => void;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        if (System.OS === System.OSType.ANDROID) {
            //Android item widths fails after theme change this fixes it
            themeService.onChange(() => {
                this.gvCategoriesView.itemCount = this.__items.length;
                this.gvCategoriesView.refreshData();
            });
        }
    }
    static getHeight(): number {
        return height;
    }
    get items(): Categories[] {
        return this.__items;
    }
    set items(value: Categories[]) {
        this.__items = value;
        this.initGridView();
        this.refreshGridView();
    }
    get onCategoryClick(): (category: any) => void {
        return this.__onCategoryClick;
    }
    set onCategoryClick(value: (category: any) => void) {
        this.__onCategoryClick = value;
    }
    private initGridView() {
        this.gvCategoriesView.onItemBind = (GridViewItem: GviHomeCategoryItem, categoryIndex: number) => {
            GridViewItem.categoryImage = getCategoryImage(this.items[categoryIndex]._id);
            GridViewItem.categoryName = this.items[categoryIndex].title;
            GridViewItem.categoryBackgroundColor = this.items[categoryIndex].menuColor;
            GridViewItem.categoryBorderColor = this.items[categoryIndex].borderColor;
        };
        this.gvCategoriesView.onItemSelected = (GridViewItem: GviHomeCategoryItem, index: number) => {
            if (this.onCategoryClick) {
                this.onCategoryClick(this.items[index]);
            }
        };
    }
    refreshGridView() {
        this.gvCategoriesView.itemCount = this.items.length;
        this.gvCategoriesView.refreshData();
    }
}
