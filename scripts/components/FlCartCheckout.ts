import FlCartCheckoutDesign from 'generated/my-components/FlCartCheckout';

export default class FlCartCheckout extends FlCartCheckoutDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        //NTVE-434 related to this zIndex
        this.lblCartCheckoutPrice.android.zIndex = 99;
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
