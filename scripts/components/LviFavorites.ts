import { themeService } from 'theme';
import LviFavoritesDesign from 'generated/my-components/LviFavorites';
import setVisibility from 'lib/setVisibility';
const originalHeight = themeService.getStyle('.lviFavorites').height;

export default class LviFavorites extends LviFavoritesDesign {
    private __onDeleteProduct: (product: any) => void;
    pageName?: string | undefined;
    private __imageUrl: string;
    private __showCheck: boolean;
    private __showArrow: boolean;
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
    get showCheck(): boolean {
        return this.__showCheck;
    }
    set showCheck(value: boolean) {
        setVisibility(this.flCheck, value);
        this.__showCheck = value;
    }
    get showArrow(): boolean {
        return this.__showArrow;
    }
    set showArrow(value: boolean) {
        setVisibility(this.lblFavoriteItemChevron, value);
        this.__showArrow = value;
    }
    get toggle() {
        return this.flCheck.toggle;
    }
    set toggle(value: boolean) {
        this.flCheck.toggle = value;
    }
    get onToggleChange(): (toggle: boolean) => void {
        return this.flCheck.onToggleChange;
    }
    set onToggleChange(value: (toggle: boolean) => void) {
        this.flCheck.onToggleChange = value;
    }
}
