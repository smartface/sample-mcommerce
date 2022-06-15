import Button from '@smartface/native/ui/button';
import FlCartCheckoutDesign from 'generated/my-components/FlCartCheckout';

export default class FlCartCheckout extends FlCartCheckoutDesign {
    pageName?: string | undefined;
    _onCheckoutClick: (...args: any[]) => void;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        //NTVE-434 related to this zIndex
        this.lblCartCheckoutPrice.android.zIndex = 99;
        this.btnCartCheckout.on('press', () => {
            this?._onCheckoutClick?.();
        });
    }
    get onCheckoutClick(): (...args: any[]) => void {
        return this._onCheckoutClick;
    }
    set onCheckoutClick(value: (...args: any[]) => void) {
        this._onCheckoutClick = value;
    }
    get checkoutTitle(): string {
        return this.btnCartCheckout.text;
    }
    set checkoutTitle(value: string) {
        this.btnCartCheckout.text = value;
    }
    get checkoutPrice(): string | number {
        return this.lblCartCheckoutPrice.text;
    }
    set checkoutPrice(value: string | number) {
        this.lblCartCheckoutPrice.text = `$${value.toString()}`;
    }
}
