import { contextReducer } from '@smartface/contx/lib/smartface/pageContext';
import AttributedString from '@smartface/native/ui/attributedstring';
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import FlProductDetailButtonPriceSectionDesign from 'generated/my-components/FlProductDetailButtonPriceSection';
import setVisibility from 'lib/setVisibility';
import { themeService } from 'theme';

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
        return this.tvPrice.text;
    }
    set productPrice(value: string) {
        const discountExists = !!this.tvDiscount.text;
        let attributeString = new AttributedString({
            strikethrough: discountExists,
            ios: {
                strikethroughColor: themeService.getNativeStyle('.product-price').textColor
            },
            string: value || '',
            font: themeService.getNativeStyle(discountExists ? '.product-price.discount-detail' : '.product-price.nodiscount-detail').font,
            foregroundColor: themeService.getNativeStyle(discountExists ? '.product-price.discount' : '.product-price.nodiscount').textColor
        });
        this.tvPrice.scrollEnabled = false;
        this.tvPrice.attributedText = [attributeString];
    }
    get productDiscount(): string {
        return this.tvDiscount.text;
    }
    set productDiscount(value: string) {
        let attributeString = new AttributedString({
            string: value || '',
            font: themeService.getNativeStyle('.product-price.nodiscount-detail').font,
            foregroundColor: themeService.getNativeStyle('.product-price').textColor
        });
        setVisibility(this.tvDiscount, !!value);
        this.tvDiscount.scrollEnabled = false;
        this.tvDiscount.attributedText = [attributeString];
    }
}
