import { themeService } from 'theme';
import Image from '@smartface/native/ui/image';
import LviFavoritesDesign from 'generated/my-components/LviFavorites';
const originalHeight = themeService.getStyle('.lviFavorites').height;

export default class LviFavorites extends LviFavoritesDesign {
    private __onDeleteProduct: (product: any) => void;
    pageName?: string | undefined;
    private __imageUrl: string;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return originalHeight;
    }
    get itemTitle(): string {
        return this.lblFavoriteItemTitle.text;
    }
    set itemTitle(value: string) {
        this.lblFavoriteItemTitle.text = value;
    }
    get itemPrice(): any {
        return this.lblFavoriteItemPrice.text;
    }
    set itemPrice(value: any) {
        this.lblFavoriteItemPrice.text = value;
    }
    get itemImage(): string {
        return this.__imageUrl;
    }
    set itemImage(value: string) {
        this.__imageUrl = value;
        this.imgFavoriteItem.loadFromUrl({
            url: this.__imageUrl,
            useHTTPCacheControl: true
        });
    }
    get itemDesc(): string {
        return this.lblFavroiteItemDescription.text;
    }
    set itemDesc(value: string) {
        this.lblFavroiteItemDescription.text = value;
    }
    get onDeleteProduct(): (product: any) => void {
        return this.__onDeleteProduct;
    }
    set onDeleteProduct(value: (product: any) => void) {
        this.__onDeleteProduct = value;
    }
    private initSwipe() {}
}
