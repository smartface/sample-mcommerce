import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import LviHomeProductsDesign from 'generated/my-components/LviHomeProducts';
import GviProductItem from './GviProductItem';
import store from 'store/index';
const originalHeight = getCombinedStyle('.lviHomeProducts').height;

export default class LviHomeProducts extends LviHomeProductsDesign {
    pageName?: string | undefined;
    router: any;
    private __items: any[] = [];
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
    private initGridView() {
        this.gvProducts.onItemBind = (GridViewItem: GviProductItem, productIndex: number) => {
            GridViewItem.itemTitle = this.items[productIndex].name;
            GridViewItem.itemDesc = this.items[productIndex].description;
            GridViewItem.itemImage = this.items[productIndex].image;
            GridViewItem.itemPrice = `$${this.items[productIndex].price}`;

            this.gvProducts.onItemSelected = (GridViewItem: GviProductItem, productIndex: number) => {
                console.log('routet', this.router);
                this.router.push('/btb/tab1/productDetail', {
                    productId: this.items[productIndex].id,
                    productName: this.items[productIndex].name,
                    productPrice: this.items[productIndex].price,
                    productDescription: this.items[productIndex].description,
                    productImg: this.items[productIndex].image
                });
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
