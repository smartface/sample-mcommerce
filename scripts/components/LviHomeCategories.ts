import { themeService } from 'theme';
import LviHomeCategoriesDesign from 'generated/my-components/LviHomeCategories';
import GviHomeCategoryItem from './GviHomeCategoryItem';
const { height } = themeService.getStyle('.lviHomeCategories');
export default class LviHomeCategories extends LviHomeCategoriesDesign {
    pageName?: string | undefined;
    private __items: any[] = [];
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
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
    }
    private initGridView() {
        this.gvCategories.onItemBind = (GridViewItem: GviHomeCategoryItem, categoryIndex: number) => {
            GridViewItem.categoryImage = `images://${this.items[categoryIndex].categoryImg}`;
            GridViewItem.categoryName = this.items[categoryIndex].title;
            GridViewItem.categoryBackgroundColor = this.items[categoryIndex].menuColor;
            GridViewItem.categoryBorderColor = this.items[categoryIndex].menuBorderColor;
        };
        this.gvCategories.itemCount = this.items.length;
    }
}
