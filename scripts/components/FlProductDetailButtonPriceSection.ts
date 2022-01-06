import FlProductDetailButtonPriceSectionDesign from 'generated/my-components/FlProductDetailButtonPriceSection';

export default class FlProductDetailButtonPriceSection extends FlProductDetailButtonPriceSectionDesign {
    private __onMinusClick: () => void;
    private __onPlusClick: () => void;

    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get onMinusClick(): () => void {
        return this.__onMinusClick;
    }
    set onMinusClick(value: () => void) {
        this.__onMinusClick = value;
        this.imgMinus.onTouchEnded = value;
    }
    get onPlusClick(): () => void {
        return this.__onPlusClick;
    }
    set onPlusClick(value: () => void) {
        this.__onPlusClick = value;
        this.imgPlus.onTouchEnded = value;
    }
    get productCount(): string {
        return this.lblCounter.text;
    }
    set productCount(value: string) {
        this.lblCounter.text = value;
    }
    get productPrice(): string {
        return this.lblPrice.text;
    }
    set productPrice(value: string) {
        this.lblPrice.text = value;
    }
}
