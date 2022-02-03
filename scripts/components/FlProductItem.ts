import FlProductItemDesign from 'generated/my-components/FlProductItem';
import ActivityIndicator from '@smartface/native/ui/activityindicator';
import Button from '@smartface/native/ui/button';
import setVisibility from 'lib/setVisibility';
import AttributedString from '@smartface/native/ui/attributedstring';
import { themeService } from 'theme';

export default class FlProductItem extends FlProductItemDesign {
    private __imageUrl: string;
    _addToBasket: (...args) => void;
    pageName?: string | undefined;
    myActivityIndicator: ActivityIndicator;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
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
    get itemReview(): any {
        return this.lblReview.text;
    }
    set itemReview(value: any) {
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
