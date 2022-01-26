import ActivityIndicator from '@smartface/native/ui/activityindicator';
import Button from '@smartface/native/ui/button';
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import GviProductItemDesign from 'generated/my-components/GviProductItem';
import setVisibility from 'lib/setVisibility';
import { getProductImageUrl } from 'service/commerce';
import store from 'store';

export default class GviProductItem extends GviProductItemDesign {
    __onActionClick: (...args) => void;
    pageName?: string | undefined;
    myActivityIndicator: ActivityIndicator;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;

        // this.flProductItem.btnAddToBasket.on(Button.Events.TouchEnded, () => {
        //     this.__onActionClick && this.__onActionClick();
        // });
    }
    initIndicator() {
        this.flProductItem.initIndicator();
    }
    toggleIndicator(toggle: boolean): void {
        this.flProductItem.toggleIndicator(toggle);
    }
    get onActionClick(): (...args) => void {
        return this.flProductItem.onActionClick;
    }
    set onActionClick(value: (...args) => void) {
        this.flProductItem.onActionClick = value;
    }
    get itemTitle(): string {
        return this.flProductItem.itemTitle;
    }
    set itemTitle(value: string) {
        this.flProductItem.itemTitle = value;
    }
    get itemPrice(): any {
        return this.flProductItem.itemPrice.text;
    }
    set itemPrice(value: any) {
        this.flProductItem.itemPrice = value;
    }
    get itemReview(): any {
        return this.flProductItem.itemReview;
    }
    set itemReview(value: any) {
        this.flProductItem.itemReview = value;
    }
    get itemDiscountPrice(): any {
        return this.flProductItem.itemDiscountPrice.text;
    }
    set itemDiscountPrice(value: any) {
        this.flProductItem.itemDiscountPrice = value;
    }
    get itemTag(): string {
        return this.flProductItem.itemTag;
    }
    set itemTag(value: string) {
        this.flProductItem.itemTag = value;
    }
    get itemImage(): string {
        return this.flProductItem.imageUrl;
    }
    set itemImage(value: string) {
        this.flProductItem.imageUrl = value;
    }
    get itemDesc(): string {
        return this.flProductItem.itemDesc;
    }
    set itemDesc(value: string) {
        this.flProductItem.itemDesc = value;
    }
}
