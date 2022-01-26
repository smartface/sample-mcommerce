import FlProductItemDesign from 'generated/my-components/FlProductItem';
import ActivityIndicator from '@smartface/native/ui/activityindicator';
import Button from '@smartface/native/ui/button';
import Image from '@smartface/native/ui/image';
import setVisibility from 'lib/setVisibility';
import AttributedString from '@smartface/native/ui/attributedstring';
import Font from '@smartface/native/ui/font';
import Color from '@smartface/native/ui/color';
import { getProductImageUrl } from 'service/commerce';
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
        //@ts-ignore FIX THIS AFTER EVENT FIX TODO
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
    get itemPrice(): any {
        return this.tvProductPrice.text;
    }
    set itemPrice(value: any) {
        let attributeString = new AttributedString();
        if (!!value) {
            if (this.tvPriceWithDiscount.text) {
                attributeString.strikethrough = true;
                attributeString.string = value;
                attributeString.font = themeService.getStyle('.product-price.discount').font;
                attributeString.foregroundColor = themeService.getNativeStyle('.product-price.discount').foregroundColor;
            } else {
                attributeString.font = themeService.getNativeStyle('.product-price.nodiscount').font;
                attributeString.foregroundColor = themeService.getNativeStyle('.product-price.nodiscount').foregroundColor;
            }
        }
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
    get itemDiscountPrice(): any {
        return this.tvPriceWithDiscount.text;
    }
    set itemDiscountPrice(value: any) {
        let attributeString = new AttributedString();
        if (!!value) {
            this.tvPriceWithDiscount.visible = true;
            attributeString.string = value;
            attributeString.font = themeService.getNativeStyle('.product-price').font;
            attributeString.foregroundColor = themeService.getNativeStyle('.product-price').foregroundColor;
        } else {
            this.tvPriceWithDiscount.visible = false;
        }
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
    set imageUrl(categoryId: string) {
        this.__imageUrl = getProductImageUrl(categoryId);
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
