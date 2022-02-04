import FlProductItemDesign from 'generated/my-components/FlProductItem';
import ActivityIndicator from '@smartface/native/ui/activityindicator';
import Button from '@smartface/native/ui/button';
import setVisibility from 'lib/setVisibility';
import AttributedString from '@smartface/native/ui/attributedstring';
import { themeService } from 'theme';
import Color from '@smartface/native/ui/color';
import { setTextDimensions } from 'lib/setTextDimensions';
import { PRODUCT_NAME_MAX_LINE } from 'constants';

export default class FlProductItem extends FlProductItemDesign {
    private __imageUrl: string;
    _addToBasket: (...args) => void;
    pageName?: string | undefined;
    myActivityIndicator: ActivityIndicator;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.btnAddToBasket.on(Button.Events.Press, () => {
            this._addToBasket && this._addToBasket();
        });
    }
    initIndicator() {
        this.aiAddToCart.android.zIndex = this.btnAddToBasket.android.zIndex + 1;
    }
    toggleIndicator(toggle: boolean): void {
        this.aiAddToCart.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                visible: toggle
            }
        });
    }
    get onActionClick(): (...args) => void {
        return this._addToBasket;
    }
    set onActionClick(value: (...args) => void) {
        this._addToBasket = value;
    }
    get itemTitle(): string {
        return this.lblProductItemTitle.text;
    }
    set itemTitle(value: string) {
        this.lblProductItemTitle.text = value;
        const { height } = setTextDimensions(value, this.lblProductItemTitle.font, { maxLines: PRODUCT_NAME_MAX_LINE });
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
        this.flTagWrapper.visible = !!value;
        if (!!value) {
            this.lblTag.text = value;
        }
        this.checkIsHidden();
    }
    set itemTagColor(value: string) {
        this.flTagWrapper.visible = !!value;
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
}
