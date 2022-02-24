import FlAddToCartDesign from 'generated/my-components/FlAddToCart';

export default class FlAddToCart extends FlAddToCartDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get title(): string {
        return this.btnAddToCart.text;
    }
    set title(value: string) {
        this.btnAddToCart.text = value;
    }
}
