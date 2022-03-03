import { themeService } from 'theme';
import Button from '@smartface/native/ui/button';
import LviCartItemDesign from 'generated/my-components/LviCartItem';
import Label from '@smartface/native/ui/label';
import AttributedString from '@smartface/native/ui/attributedstring';
import setVisibility from 'lib/setVisibility';
const originalHeight = themeService.getStyle('.lviCartItem').height;

export default class LviCartItem extends LviCartItemDesign {
    pageName?: string | undefined;
    private __imageUrl: string;
    _value: (...args) => void;
    _valueMinus: (...args) => void;
    _removeValue: (...args) => void;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.btnCartPlus.on(Button.Events.Press, () => {
            this._value && this._value();
        });
        this.btnCartMinus.on(Button.Events.Press, () => {
            this._valueMinus && this._valueMinus();
        });
        this.btnClose.on(Button.Events.Press, () => {
            this._removeValue && this._removeValue();
        });
    }
    static getHeight(): number {
        return originalHeight;
    }
    get productName(): string {
        return this.lblProductName.text;
    }
    set productName(value: string) {
        this.lblProductName.text = value;
    }
    get productInfo(): string {
        return this.lblProductInfo.text;
    }
    set productInfo(value: string) {
        this.lblProductInfo.text = value;
    }
    get productImage(): string {
        return this.__imageUrl;
    }
    set productImage(value: string) {
        this.__imageUrl = value;
        this.imgProduct.loadFromUrl({
            url: this.__imageUrl,
            useHTTPCacheControl: true
        });
    }
    get productPrice(): string {
        return this.tvPrice.text;
    }
    set productPrice(value: string) {
        const discountExists = !!this.tvDiscount.text;
        let attributeString = new AttributedString({
            strikethrough: discountExists,
            ios: {
                strikethroughColor: themeService.getNativeStyle('.product-price').textColor
            },
            string: value || '',
            font: themeService.getNativeStyle(discountExists ? '.product-price.discount' : '.product-price.nodiscount').font,
            foregroundColor: themeService.getNativeStyle(discountExists ? '.product-price.discount' : '.product-price.nodiscount').textColor
        });
        this.tvPrice.scrollEnabled = false;
        this.tvPrice.attributedText = [attributeString];
    }
    get productDiscount(): string {
        return this.tvDiscount.text;
    }
    set productDiscount(value: string) {
        let attributeString = new AttributedString({
            string: value || '',
            font: themeService.getNativeStyle('.product-price.nodiscount').font,
            foregroundColor: themeService.getNativeStyle('.product-price').textColor
        });
        setVisibility(this.tvDiscount, !!value);
        this.tvDiscount.scrollEnabled = false;
        this.tvDiscount.attributedText = [attributeString];
    }
    set productCount(value: string | number) {
        this.lblProductCount.text = value.toString();
    }
    get productCount(): string | number {
        return this.lblProductCount.text;
    }
    get bottomLine(): boolean {
        return this.flCartItemBottomLine.visible;
    }
    set bottomLine(value: boolean) {
        this.flCartItemBottomLine.visible = value;
    }
    set minusButtonIcon(value: string) {
        this.btnCartMinus.text = value.toString();
    }
    get minusButtonIcon(): string {
        return this.btnCartMinus.text;
    }
    get onActionPlus(): (...args) => void {
        return this._value;
    }
    set onActionPlus(value: (...args) => void) {
        this._value = value;
    }
    get onActionMinus(): (...args) => void {
        return this._valueMinus;
    }
    set onActionMinus(value: (...args) => void) {
        this._valueMinus = value;
    }
    get onRemoveAction(): (...args) => void {
        return this._removeValue;
    }
    set onRemoveAction(value: (...args) => void) {
        this._removeValue = value;
    }
}
