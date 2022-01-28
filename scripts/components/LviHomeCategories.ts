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
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        if (System.OS === System.OSType.ANDROID) {
            //Android item widths fails after theme change this fixes it
            themeService.onChange(() => {
                this.gvCategories.itemCount = this.__items.length;
                this.gvCategories.refreshData();
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
    private initGridView() {
        this.gvCategories.onItemBind = (GridViewItem: GviHomeCategoryItem, categoryIndex: number) => {
            GridViewItem.categoryImage = getCategoryImage(this.items[categoryIndex]._id);
            GridViewItem.categoryName = this.items[categoryIndex].title;
            GridViewItem.categoryBackgroundColor = this.items[categoryIndex].menuColor;
            GridViewItem.categoryBorderColor = this.items[categoryIndex].borderColor;
        };
    }
    refreshGridView() {
        this.gvCategories.itemCount = this.items.length;
        this.gvCategories.refreshData();
    }
}
