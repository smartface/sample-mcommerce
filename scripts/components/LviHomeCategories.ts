import { themeService } from 'theme';
import LviHomeCategoriesDesign from 'generated/my-components/LviHomeCategories';
import GviHomeCategoryItem from './GviHomeCategoryItem';
import System from '@smartface/native/device/system';
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
    get items(): any[] {
        return this.__items;
    }
    set items(value: any[]) {
        this.__items = value;
        this.initGridView();
        this.refreshGridView();
    }
    private initGridView() {
        this.gvCategories.onItemBind = (GridViewItem: GviHomeCategoryItem, categoryIndex: number) => {
            GridViewItem.categoryImage = `images://${this.items[categoryIndex].categoryImg}`;
            GridViewItem.categoryName = this.items[categoryIndex].title;
            GridViewItem.categoryBackgroundColor = this.items[categoryIndex].menuColor;
            GridViewItem.categoryBorderColor = this.items[categoryIndex].menuBorderColor;
        };
    }
    refreshGridView() {
        this.gvCategories.itemCount = this.items.length;
        this.gvCategories.refreshData();
    }
}
