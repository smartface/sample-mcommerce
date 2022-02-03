import { themeService } from 'theme';
import LviHomeProductsDesign from 'generated/my-components/LviHomeProducts';
import GviProductItem from './GviProductItem';
import store from 'store/index';
import storeActions from 'store/main/actions';
const originalHeight = themeService.getStyle('.lviHomeProducts').height;
import System from '@smartface/native/device/system';
import { getProductImageUrl } from 'service/commerce';
import { Product } from 'types';
import Screen from '@smartface/native/device/screen';
export default class LviHomeProducts extends LviHomeProductsDesign {
    pageName?: string | undefined;
    private __onProductClick: (product: any) => void;
    private __items: Product[] = [];
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        if (System.OS === System.OSType.ANDROID) {
            //Android item widths fails after theme change this fixes it
            themeService.onChange(() => {
                this.gvProducts.itemCount = this.__items.length;
                this.gvProducts.refreshData();
            });
        }
    }
    static getHeight(): number {
        return originalHeight;
    }
    get items(): Product[] {
        return this.__items;
    }
    set items(value: Product[]) {
        this.__items = value;
        this.initGridView();
        this.refreshGridView();
    }
    get onProductClick(): (product: any) => void {
        return this.__onProductClick;
    }
    set onProductClick(value: (product: any) => void) {
        this.__onProductClick = value;
    }
    private initGridView() {
        this.gvProducts.layoutManager.onItemLength = () => Screen.width / 2;
        this.gvProducts.onItemBind = (GridViewItem: GviProductItem, productIndex: number) => {
            GridViewItem.itemTag = this.items[productIndex].discountTag;
            GridViewItem.itemTitle = this.items[productIndex].name;
            GridViewItem.itemDesc = this.items[productIndex].shortDescription;
            GridViewItem.itemImage = this.items[productIndex].images ? getProductImageUrl(this.items[productIndex].images[0]) : null;
            GridViewItem.itemDiscountPrice = !!this.items[productIndex].discountPrice ? `$${this.items[productIndex].discountPrice}` : '';
            GridViewItem.itemPrice = `$${this.items[productIndex].price}`;
            GridViewItem.itemReview = !!this.items[productIndex].review ? this.items[productIndex]?.review : false;
            this.gvProducts.onItemSelected = (GridViewItem: GviProductItem, productIndex: number) => {
                this.onProductClick(this.items[productIndex]);
            };
            GridViewItem.onActionClick = () => {
                GridViewItem.initIndicator();
                GridViewItem.toggleIndicator(true);
                store.dispatch(storeActions.AddToBasket({ product: this.items[productIndex], count: 1 }));
                setTimeout(() => {
                    GridViewItem.toggleIndicator(false);
                }, 500);
            };
        };
    }
    refreshGridView() {
        this.gvProducts.itemCount = this.items.length;
        this.gvProducts.refreshData();
    }
}
