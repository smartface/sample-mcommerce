import LviReviewProductDesign from 'generated/my-components/LviReviewProduct';
import { themeService } from 'theme';
const originalHeight = themeService.getStyle('.lviReview').height;

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
}
