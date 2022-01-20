import FlCartCheckoutDesign from 'generated/my-components/FlCartCheckout';

export default class FlCartCheckout extends FlCartCheckoutDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
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
