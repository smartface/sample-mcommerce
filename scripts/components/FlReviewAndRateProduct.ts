import FlReviewAndRateProductDesign from 'generated/my-components/FlReviewAndRateProduct';

export default class FlReviewAndRateProduct extends FlReviewAndRateProductDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get rate(): number {
        return this.flRateProduct.rate;
    }
    get productName(): string {
        return this.flReviewProduct.productName;
    }
    set productName(value: string) {
        this.flReviewProduct.productName = value;
    }
    get productImage(): string {
        return this.flReviewProduct.productImage;
    }
    set productImage(value: string) {
        this.flReviewProduct.productImage = value;
    }
    get productRate(): string {
        return this.flReviewProduct.productRate;
    }
    set productRate(value: string) {
        this.flReviewProduct.productRate = value;
    }
    get comment(): string {
        return this.flRateProduct.comment;
    }
}
