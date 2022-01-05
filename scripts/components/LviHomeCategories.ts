import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import LviHomeCategoriesDesign from 'generated/my-components/LviHomeCategories';
import GviHomeCategoryItem from './GviHomeCategoryItem';
const { height } = getCombinedStyle('.lviHomeCategories').height;
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
            GridViewItem.categoryImage = this.items[categoryIndex].categoryImg;
            GridViewItem.categoryName = this.items[categoryIndex].title;
            GridViewItem.categoryBackgroundColor = this.items[categoryIndex].menuColor;
            GridViewItem.categoryBorderColor = this.items[categoryIndex].menuBorderColor;
            // this.gvCategories.onItemSelected = (GridViewItem: GviHomeCategoryItem, categoryIndex: number) => {
            //     //this.onProductClick(this.items[categoryIndex]);
            // };
            // GridViewItem.onActionClick = () => {
            //     GridViewItem.initIndicator();
            //     GridViewItem.toggleIndicator(true);
            //     store.dispatch({
            //         type: 'ADD_TO_BASKET',
            //         payload: {
            //             data: {
            //                 product: this.items[productIndex],
            //                 count: 1
            //             }
            //         }
            //     });
            //     setTimeout(() => {
            //         GridViewItem.toggleIndicator(false);
            //     }, 500);
            // };
        };
        this.gvCategories.itemCount = this.items.length;
    }
}
