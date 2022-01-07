import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import FlProductDetailButtonPriceSectionDesign from 'generated/my-components/FlProductDetailButtonPriceSection';

export default class FlProductDetailButtonPriceSection extends FlProductDetailButtonPriceSectionDesign {
    __onMinusClick: () => void;
    __onPlusClick: () => void;

    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.imgMinus.on(View.Events.TouchEnded, () => {
            this.__onMinusClick && this.__onMinusClick();
        });
        this.imgPlus.on(View.Events.TouchEnded, () => {
            this.__onPlusClick && this.__onPlusClick();
        });
    }
    get onMinusClick(): () => void {
        return this.__onMinusClick;
    }
    set onMinusClick(value: () => void) {
        this.__onMinusClick = value;
    }
    get onPlusClick(): () => void {
        return this.__onPlusClick;
    }
    set onPlusClick(value: () => void) {
        this.__onPlusClick = value;
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
