import FlProductItemDesign from 'generated/my-components/FlProductItem';
import setVisibility from 'lib/setVisibility';
import AttributedString from '@smartface/native/ui/attributedstring';
import { themeService } from 'theme';
import Color from '@smartface/native/ui/color';
import { setTextDimensions } from 'lib/setTextDimensions';
import { PRODUCT_NAME_MAX_LINE } from 'constants';

const { marginRight: productItemMarginRight, marginLeft: productItemMarginLeft } = themeService.getNativeStyle('.flProductItem');
const { paddingLeft: descriptionWrapperPaddingLeft, paddingRight: descriptionWrapperPaddingRight } = themeService.getNativeStyle(
    '.flProductItem-flProductItemWrapper-descriptionWrapper'
);
const { marginRight: lblProductItemTitleWidthMarginRight, marginLeft: lblProductItemTitleWidthMarginLeft } = themeService.getNativeStyle(
    '.flProductItem-flProductItemWrapper-descriptionWrapper-lblProductTitle'
);
export default class FlProductItem extends FlProductItemDesign {
    private __imageUrl: string;
    private __itemTitleMaxWidth: number;
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    set minusTextColor(value: string) {
        this.flProductItemButtonsWrapper.minusTextColor = value;
    }
    set showHideMinusButton(toggle: boolean) {
        this.flProductItemButtonsWrapper.showHideMinusButton = toggle;
        if (toggle) {
            this.flProductItemWrapper.dispatch({
                type: 'pushClassNames',
                classNames: '.flProductItem-flProductItemWrapper.active'
            });
        } else {
            this.flProductItemWrapper.dispatch({
                type: 'removeClassName',
                className: '.flProductItem-flProductItemWrapper.active'
            });
        }
    }
    toggleIndicatorMinus(toggle: boolean): void {
        this.flProductItemButtonsWrapper.toggleIndicatorMinus(toggle);
    }
    toggleIndicatorPlus(toggle: boolean): void {
        this.flProductItemButtonsWrapper.toggleIndicatorPlus(toggle);
    }
    get buttonMinusText(): string {
        return this.flProductItemButtonsWrapper.buttonMinusText;
    }
    set buttonMinusText(value: string) {
        this.flProductItemButtonsWrapper.buttonMinusText = value;
    }
    set productCount(value: string) {
        this.flProductItemButtonsWrapper.productCount = value;
    }
    get productCount(): string {
        return this.flProductItemButtonsWrapper.productCount;
    }
    set itemTitleMaxWidth(value: number) {
        this.__itemTitleMaxWidth = value;
    }
    get onActionClickPlus(): (...args) => void {
        return this.flProductItemButtonsWrapper.onActionClickPlus;
    }
    set onActionClickPlus(value: (...args) => void) {
        this.flProductItemButtonsWrapper.onActionClickPlus = value;
    }
    get onActionClickMinus(): (...args) => void {
        return this.flProductItemButtonsWrapper.onActionClickMinus;
    }
    set onActionClickMinus(value: (...args) => void) {
        this.flProductItemButtonsWrapper.onActionClickMinus = value;
    }
    get itemTitle(): string {
        return this.lblProductItemTitle.text;
    }
    set itemTitle(value: string) {
        this.lblProductItemTitle.text = value;
        const { height } = setTextDimensions(value, this.lblProductItemTitle.font, {
            maxLines: PRODUCT_NAME_MAX_LINE,
            maxWidth: this.calculateMaxWidth()
        });
        this.lblProductItemTitle.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                height
            }
        });
    }
    get itemPrice(): string {
        return this.tvProductPrice.text;
    }
    set itemPrice(value: string) {
        const discountExists = !!this.tvPriceWithDiscount.text;
        let attributeString = new AttributedString({
            strikethrough: discountExists,
            ios: {
                strikethroughColor: themeService.getNativeStyle('.product-price').textColor
            },
            string: value || '',
            font: themeService.getNativeStyle(discountExists ? '.product-price.discount' : '.product-price.nodiscount').font,
            foregroundColor: themeService.getNativeStyle(discountExists ? '.product-price.discount' : '.product-price.nodiscount').textColor
        });
        this.tvProductPrice.attributedText = [attributeString];
    }
    get itemReview(): string {
        return this.lblReview.text;
    }
    set itemReview(value: string) {
        if (!!value) {
            this.imgStar.visible = true;
            this.lblReview.visible = true;
            this.lblReview.text = value;
        } else {
            this.imgStar.visible = false;
            this.lblReview.visible = false;
        }
    }
    get itemDiscountPrice(): string {
        return this.tvPriceWithDiscount.text;
    }
    set itemDiscountPrice(value: string) {
        let attributeString = new AttributedString({
            string: value || '',
            font: themeService.getNativeStyle('.product-price').font,
            foregroundColor: themeService.getNativeStyle('.product-price').textColor
        });
        setVisibility(this.tvPriceWithDiscount, !!value);
        this.tvPriceWithDiscount.attributedText = [attributeString];
    }
    get itemTag(): string {
        return this.lblTag.text;
    }
    set itemTag(value: string) {
        if (!!value) {
            this.lblTag.text = value;
        }
        this.checkIsHidden();
    }
    set itemTagColor(value: string) {
        setVisibility(this.flTagWrapper, !!value);
        if (!!value) {
            this.flTagWrapper.backgroundColor = Color.create(value);
        }
        this.checkIsHidden();
    }
    get imageUrl(): string {
        return this.__imageUrl;
    }
    set imageUrl(value: string) {
        this.__imageUrl = value;
        this.imgProduct.loadFromUrl({
            url: this.__imageUrl,
            useHTTPCacheControl: true
        });
    }
    get itemDesc(): string {
        return this.lblProductItemDesc.text;
    }
    set itemDesc(value: string) {
        this.lblProductItemDesc.text = value;
    }
    private checkIsHidden() {
        setVisibility(this, !!this.itemTitle);
    }
    private calculateMaxWidth(): number {
        return (
            this.__itemTitleMaxWidth -
            (productItemMarginRight +
                productItemMarginLeft +
                descriptionWrapperPaddingLeft +
                descriptionWrapperPaddingRight +
                lblProductItemTitleWidthMarginLeft +
                lblProductItemTitleWidthMarginRight)
        );
    }
    startShimmering() {
        this.flProductItemButtonsWrapper.visible = false;
        this.tvProductPrice.text = ""

        this.imgProduct.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                backgroundColor: '#D2D2D2'
            }
        })
        
        this.flProductDescAndReviewWrapper.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                backgroundColor: '#D2D2D2'
            }
        })
        
        this.tvProductPrice.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                backgroundColor: '#D2D2D2'
            }
        })

    }
    stopShimmering() {
        this.flProductItemButtonsWrapper.visible = true;
        this.imgProduct.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                backgroundColor: 'rgba(0,0,0,0)'
            }
        });
        this.flProductDescAndReviewWrapper.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                backgroundColor: 'rgba(0,0,0,0)'
            }
        })
        this.tvProductPrice.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                backgroundColor: 'rgba(0,0,0,0)'
            }
        })

    }
}
