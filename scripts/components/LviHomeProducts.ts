import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import LviHomeProductsDesign from 'generated/my-components/LviHomeProducts';
import GviProductItem from './GviProductItem';
import store from 'store/index';
const originalHeight = getCombinedStyle('.lviHomeProducts').height;
import { Router } from '@smartface/router';
import GviHomeCategoryItem from './GviHomeCategoryItem';
export default class LviHomeProducts extends LviHomeProductsDesign {
    pageName?: string | undefined;
    private __onProductClick: (product: any) => void;
    private __items: any[] = [];
    private __categoryItems: any[] = [];
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return originalHeight;
    }
    get showcaseTitle(): string {
        return this.lblTitle.text;
    }
    set showcaseTitle(value: string) {
        this.lblTitle.text = value;
    }
    get showcaseLinkText(): string {
        return this.lblSeeAll.text;
    }
    set showcaseLinkText(value: string) {
        this.lblSeeAll.text = value;
    }
    get items(): any[] {
        return this.__items;
    }
    set items(value: any[]) {
        this.__items = value;
        this.initGridView();
    }
    get categoryItems(): any[] {
        return this.__categoryItems;
    }
    set categoryItems(value: any[]) {
        this.__categoryItems = value;
        this.initcategorygridview();
    }
    get onProductClick(): (product: any) => void {
        return this.__onProductClick;
    }
    set onProductClick(value: (product: any) => void) {
        this.__onProductClick = value;
    }
    // private initcategorygridview() {
    //     console.log('categoryItems: ', this.categoryItems);
    //     this.gvCategoryItems.onItemBind = (GridViewItem: GviHomeCategoryItem, index: number) => {
    //         GridViewItem.categoryName = this.categoryItems[index].title;
    //         GridViewItem.categoryImage = this.categoryItems[index].categoryImg;
    //     };
    //     this.gvCategoryItems.itemCount = this.categoryItems.length;
    // }
    private initGridView() {
        this.gvProducts.onItemBind = (GridViewItem: GviProductItem, productIndex: number) => {
            GridViewItem.itemTag = this.items[productIndex].discountTag;
            GridViewItem.itemTitle = this.items[productIndex].name;
            GridViewItem.itemDesc = this.items[productIndex].description;
            GridViewItem.itemImage = this.items[productIndex].image;
            GridViewItem.itemPrice = `$${this.items[productIndex].price}`;
            this.gvProducts.onItemSelected = (GridViewItem: GviProductItem, productIndex: number) => {
                this.onProductClick(this.items[productIndex]);
            };
            GridViewItem.onActionClick = () => {
                GridViewItem.initIndicator();
                GridViewItem.toggleIndicator(true);
                store.dispatch({
                    type: 'ADD_TO_BASKET',
                    payload: {
                        data: {
                            product: this.items[productIndex],
                            count: 1
                        }
                    }
                });
                setTimeout(() => {
                    GridViewItem.toggleIndicator(false);
                }, 500);
            };
        };
        this.gvProducts.itemCount = this.items.length;
    }
}
