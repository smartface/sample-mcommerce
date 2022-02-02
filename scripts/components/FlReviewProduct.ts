import FlReviewProductDesign from 'generated/my-components/FlReviewProduct';

export default class FlReviewProduct extends FlReviewProductDesign {
    pageName?: string | undefined;
    private __productImage: string;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get productName(): string {
        return this.lblProductName.text;
    }
    set productName(value: string) {
        this.lblProductName.text = value;
    }
    get productImage(): string {
        return this.__productImage;
    }
    set productImage(value: string) {
        this.__productImage = value;
        this.imgProduct.loadFromUrl({
            url: this.__productImage,
            useHTTPCacheControl: true
        });
    }
    get productRate(): string {
        return this.lblRate.text;
    }
    set productRate(value: string) {
        this.lblRate.text = value;
    }
}
