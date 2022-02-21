import FlReviewProductDesign from 'generated/my-components/FlReviewProduct';

export default class FlReviewProduct extends FlReviewProductDesign {
    pageName?: string | undefined;
    private __productImage: string;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.flRateWrapper5.star = 5;
        this.flRateWrapper4.star = 4;
        this.flRateWrapper3.star = 3;
        this.flRateWrapper2.star = 2;
        this.flRateWrapper1.star = 1;
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
    get fiveStarCount(): string {
        return this.flRateWrapper5.reviewCount;
    }
    set fiveStarCount(value: string) {
        this.flRateWrapper5.reviewCount = value;
    }
    get fourStarCount(): string {
        return this.flRateWrapper4.reviewCount;
    }
    set fourStarCount(value: string) {
        this.flRateWrapper4.reviewCount = value;
    }
    set threeStarCount(value: string) {
        this.flRateWrapper3.reviewCount = value;
    }
    get threeStarCount(): string {
        return this.flRateWrapper3.reviewCount;
    }
    set twoStarCount(value: string) {
        this.flRateWrapper2.reviewCount = value;
    }
    get twoStarCount(): string {
        return this.flRateWrapper2.reviewCount;
    }
    set oneStarCount(value: string) {
        this.flRateWrapper1.reviewCount = value;
    }
    get oneStarCount(): string {
        return this.flRateWrapper1.reviewCount;
    }
}
