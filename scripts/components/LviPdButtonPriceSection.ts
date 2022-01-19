import LviPdButtonPriceSectionDesign from 'generated/my-components/LviPdButtonPriceSection';
import { themeService } from 'theme';

const { height } = themeService.getStyle('.lviPdButtonPriceSection');
export default class LviPdButtonPriceSection extends LviPdButtonPriceSectionDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return height;
    }
    get onMinusClick(): () => void {
        return this.flProductDetailButtonPriceSection.onMinusClick;
    }
    set onMinusClick(value: () => void) {
        this.flProductDetailButtonPriceSection.onMinusClick = value;
    }
    get onPlusClick(): () => void {
        return this.flProductDetailButtonPriceSection.onPlusClick;
    }
    set onPlusClick(value: () => void) {
        this.flProductDetailButtonPriceSection.onPlusClick = value;
    }
    get productPrice(): string {
        return this.flProductDetailButtonPriceSection.productPrice;
    }
    set productPrice(value: string) {
        this.flProductDetailButtonPriceSection.productPrice = value;
    }
    get productCount(): string {
        return this.flProductDetailButtonPriceSection.productCount;
    }
    set productCount(value: string) {
        this.flProductDetailButtonPriceSection.productCount = value;
    }
}
