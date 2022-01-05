import ActivityIndicator from '@smartface/native/ui/activityindicator';
import Button from '@smartface/native/ui/button';
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import GviProductItemDesign from 'generated/my-components/GviProductItem';
import setVisibility from 'lib/setVisibility';
import store from 'store';

export default class GviProductItem extends GviProductItemDesign {
    pageName?: string | undefined;
    myActivityIndicator: ActivityIndicator;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    initIndicator() {
        this.flProductItem.initIndicator();
    }
    toggleIndicator(toggle: boolean): void {
        this.flProductItem.toggleIndicator(toggle);
    }
    get onActionClick(): Button['onTouch'] {
        return this.flProductItem.btnAddToBasket.onTouch;
    }
    set onActionClick(value: Button['onTouch']) {
        this.flProductItem.btnAddToBasket.onTouch = value;
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
    get itemImage(): string | Image {
        return this.flProductItem.itemImage;
    }
    set itemImage(value: string | Image) {
        this.flProductItem.itemImage = value;
    }
    get itemDesc(): string {
        return this.flProductItem.itemDesc;
    }
    set itemDesc(value: string) {
        this.flProductItem.itemDesc = value;
    }
}
