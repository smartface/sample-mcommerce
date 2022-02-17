import LviReviewProductDesign from 'generated/my-components/LviReviewProduct';
import { themeService } from 'theme';
const originalHeight = themeService.getStyle('.lviReviewProduct').height;

export default class LviReviewProduct extends LviReviewProductDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return originalHeight;
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
    get fiveStarCount(): string {
        return this.flReviewProduct.flRateWrapper.reviewCount;
    }
    set fiveStarCount(value: string) {
        this.flReviewProduct.flRateWrapper.reviewCount = value;
    }
    get fourStarCount(): string {
        return this.flReviewProduct.flRateWrapper1.reviewCount;
    }
    set fourStarCount(value: string) {
        this.flReviewProduct.flRateWrapper1.reviewCount = value;
    }
    set threeStarCount(value: string) {
        this.flReviewProduct.flRateWrapper2.reviewCount = value;
    }
    get threeStarCount(): string {
        return this.flReviewProduct.flRateWrapper2.reviewCount;
    }
    set twoStarCount(value: string) {
        this.flReviewProduct.flRateWrapper3.reviewCount = value;
    }
    get twoStarCount(): string {
        return this.flReviewProduct.flRateWrapper3.reviewCount;
    }
    set oneStarCount(value: string) {
        this.flReviewProduct.flRateWrapper4.reviewCount = value;
    }
    get oneStarCount(): string {
        return this.flReviewProduct.flRateWrapper4.reviewCount;
    }
}
