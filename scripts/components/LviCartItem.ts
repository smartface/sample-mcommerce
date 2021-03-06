import { themeService } from 'theme';
import Button from '@smartface/native/ui/button';
import LviCartItemDesign from 'generated/my-components/LviCartItem';
import Label from '@smartface/native/ui/label';
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
        this.lblCloseIcon.on(Label.Events.Touch, () => {
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
        return this.lblProductPrice.text;
    }
    set productPrice(value: string) {
        this.lblProductPrice.text = value;
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
