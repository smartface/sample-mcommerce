import ActivityIndicator from '@smartface/native/ui/activityindicator';
import GviProductItemDesign from 'generated/my-components/GviProductItem';

export default class GviProductItem extends GviProductItemDesign {
    __onActionClick: (...args) => void;
    pageName?: string | undefined;
    myActivityIndicator: ActivityIndicator;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
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
    get itemPrice(): string {
        return this.flProductItem.itemPrice;
    }
    set itemPrice(value: string) {
        this.flProductItem.itemPrice = value;
    }
    get itemReview(): any {
        return this.flProductItem.itemReview;
    }
    set itemReview(value: any) {
        this.flProductItem.itemReview = value;
    }
    get itemDiscountPrice(): string {
        return this.flProductItem.itemDiscountPrice;
    }
    set itemDiscountPrice(value: string) {
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
