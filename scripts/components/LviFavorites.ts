import { themeService } from 'theme';
import LviFavoritesDesign from 'generated/my-components/LviFavorites';
import setVisibility from 'lib/setVisibility';
import AttributedString from '@smartface/native/ui/attributedstring';
const originalHeight = themeService.getStyle('.lviFavorites').height;

const priceFontWithDiscount = themeService.getNativeStyle('.product-price.discount').font;
const priceFontWithNoDiscount = themeService.getNativeStyle('.product-price.nodiscount').font;
const textColorPriceWithDiscount = themeService.getNativeStyle('.product-price.discount').textColor;
const textColorPriceWithNoDiscount = themeService.getNativeStyle('.product-price.nodiscount').textColor;

export default class LviFavorites extends LviFavoritesDesign {
    private __onDeleteProduct: (product: any) => void;
    pageName?: string | undefined;
    private __imageUrl: string;
    private __showCheck: boolean;
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
    get itemPrice(): string {
        return this.tvPrice.text;
    }
    set itemPrice(value: string) {
        const discountExists = !!this.tvDiscount.text;
        const attributeString = new AttributedString({
            strikethrough: discountExists,
            ios: {
                strikethroughColor: textColorPriceWithNoDiscount
            },
            string: value || '',
            font: discountExists ? priceFontWithDiscount : priceFontWithNoDiscount,
            foregroundColor: discountExists ? textColorPriceWithDiscount : textColorPriceWithNoDiscount
        });
        this.tvPrice.scrollEnabled = false;
        this.tvPrice.attributedText = [attributeString];
    }
    get itemDiscount(): string {
        return this.tvDiscount.text;
    }
    set itemDiscount(value: string) {
        const attributeString = new AttributedString({
            string: value || '',
            font: priceFontWithNoDiscount,
            foregroundColor: textColorPriceWithNoDiscount
        });
        setVisibility(this.tvDiscount, !!value);
        this.tvDiscount.scrollEnabled = false;
        this.tvDiscount.attributedText = [attributeString];
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
