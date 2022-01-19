import { themeService } from 'theme';
import Button from '@smartface/native/ui/button';
import Image from '@smartface/native/ui/image';
import Label from '@smartface/native/ui/label';
import View from '@smartface/native/ui/view';
import LviCartItemDesign from 'generated/my-components/LviCartItem';
const originalHeight = themeService.getStyle('.lviCartItem').height;

export default class LviCartItem extends LviCartItemDesign {
    pageName?: string | undefined;
    _value: (...args) => void;
    _valueMinus: (...args) => void;
    _removeValue: (...args) => void;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        //@ts-ignore FIX THIS AFTER EVENT FIX TODO
        this.btnCartPlus.on(Button.Events.TouchEnded, () => {
            this._value && this._value();
        });
        //@ts-ignore FIX THIS AFTER EVENT FIX TODO
        this.btnCartMinus.on(Button.Events.TouchEnded, () => {
            this._valueMinus && this._valueMinus();
        });
        this.lblCloseIcon.on(View.Events.Touch, () => {
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
    get productImage(): string | Image {
        return this.imgProduct.image;
    }
    set productImage(value: string | Image) {
        this.imgProduct.image = Image.createFromFile(`images://${value}`);
    }
    get productPrice(): string | number {
        return this.lblProductPrice.text;
    }
    set productPrice(value: string | number) {
        this.lblProductPrice.text = `$${value}`;
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
    get onActionPlus(): (...args) => void {
        return this._value;
    }
    set onActionPlus(value: (...args) => void) {
        //this.btnCartPlus.onTouchEnded = value;
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
