import ActivityIndicator from '@smartface/native/ui/activityindicator';
import GviProductItemDesign from 'generated/my-components/GviProductItem';

export default class GviProductItem extends GviProductItemDesign {
    pageName?: string | undefined;
    myActivityIndicator: ActivityIndicator;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get buttonMinusText(): string {
        return this.flProductItem.buttonMinusText;
    }
    set buttonMinusText(value: string) {
        this.flProductItem.buttonMinusText = value;
    }
    set productCount(value: string) {
        this.flProductItem.productCount = value;
    }
    get productCount(): string {
        return this.flProductItem.productCount;
    }
    set showHideMinusButton(toggle: boolean) {
        this.flProductItem.showHideMinusButton = toggle;
    }
    toggleIndicatorMinus(toggle: boolean): void {
        this.flProductItem.toggleIndicatorMinus(toggle);
    }
    toggleIndicatorPlus(toggle: boolean): void {
        this.flProductItem.toggleIndicatorPlus(toggle);
    }
    get onActionClickPlus(): (...args) => void {
        return this.flProductItem.onActionClickPlus;
    }
    set onActionClickPlus(value: (...args) => void) {
        this.flProductItem.onActionClickPlus = value;
    }
    get onActionClickMinus(): (...args) => void {
        return this.flProductItem.onActionClickMinus;
    }
    set onActionClickMinus(value: (...args) => void) {
        this.flProductItem.onActionClickMinus = value;
    }
    set itemTitleMaxWidth(value: number) {
        this.flProductItem.itemTitleMaxWidth = value;
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
    get itemReview(): string {
        return this.flProductItem.itemReview;
    }
    set itemReview(value: string) {
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
    set itemTagColor(value: string) {
        this.flProductItem.itemTagColor = value;
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
