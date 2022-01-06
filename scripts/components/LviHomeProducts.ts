import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import LviHomeProductsDesign from 'generated/my-components/LviHomeProducts';
import GviProductItem from './GviProductItem';
import store from 'store/index';
const originalHeight = getCombinedStyle('.lviHomeProducts').height;
import { Router } from '@smartface/router';
export default class LviHomeProducts extends LviHomeProductsDesign {
    pageName?: string | undefined;
    private __onProductClick: (product: any) => void;
    private __items: any[] = [];
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return originalHeight;
    }
    get items(): any[] {
        return this.__items;
    }
    set items(value: any[]) {
        this.__items = value;
        this.initGridView();
    }
    get onProductClick(): (product: any) => void {
        return this.__onProductClick;
    }
    set onProductClick(value: (product: any) => void) {
        this.__onProductClick = value;
    }

    private initGridView() {
        this.gvProducts.onItemBind = (GridViewItem: GviProductItem, productIndex: number) => {
            GridViewItem.itemTag = this.items[productIndex].discountTag;
            GridViewItem.itemTitle = this.items[productIndex].name;
            GridViewItem.itemDesc = this.items[productIndex].description;
            GridViewItem.itemImage = this.items[productIndex].image;
            GridViewItem.itemDiscountPrice = !!this.items[productIndex].discount ? `$${this.items[productIndex].discount}` : false;
            GridViewItem.itemPrice = `$${this.items[productIndex].price}`;
            GridViewItem.itemReview = !!this.items[productIndex].review ? this.items[productIndex]?.review : false;
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
        this.gvProducts.refreshData();
    }
}
