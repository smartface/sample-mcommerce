import LviRow2ProductItemDesign from 'generated/my-components/LviRow2ProductItem';
import Button from '@smartface/native/ui/button';
import Image from '@smartface/native/ui/image';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';

const { height } = getCombinedStyle('.lviProductItem');

export default class LviRow2ProductItem extends LviRow2ProductItemDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    initIndicator1() {
        this.flProductItem1.initIndicator();
    }
    toggleIndicator1(toggle: boolean): void {
        this.flProductItem1.toggleIndicator(toggle);
    }
    get onActionClick1(): Button['onTouch'] {
        return this.flProductItem1.btnAddToBasket.onTouch;
    }
    set onActionClick1(value: Button['onTouch']) {
        this.flProductItem1.btnAddToBasket.onTouch = value;
    }
    get itemTitle1(): string {
        return this.flProductItem1.itemTitle;
    }
    set itemTitle1(value: string) {
        this.flProductItem1.itemTitle = value;
    }
    get itemPrice1(): any {
        return this.flProductItem1.itemPrice.text;
    }
    set itemPrice1(value: any) {
        this.flProductItem1.itemPrice = value;
    }
    get itemReview1(): any {
        return this.flProductItem1.itemReview.text;
    }
    set itemReview1(value: any) {
        this.flProductItem1.itemReview = value;
    }
    get itemDiscountPrice1(): any {
        return this.flProductItem1.itemDiscountPrice.text;
    }
    set itemDiscountPrice1(value: any) {
        this.flProductItem1.itemDiscountPrice = value;
    }
    get itemTag1(): string {
        return this.flProductItem1.itemTag;
    }
    set itemTag1(value: string) {
        this.flProductItem1.itemTag = value;
    }
    get itemImage1(): string | Image {
        return this.flProductItem1.itemImage;
    }
    set itemImage1(value: string | Image) {
        this.flProductItem1.itemImage = value;
    }
    get itemDesc1(): string {
        return this.flProductItem1.itemDesc;
    }
    set itemDesc1(value: string) {
        this.flProductItem1.itemDesc = value;
    }
    initIndicator2() {
        this.flProductItem2.initIndicator();
    }
    toggleIndicator2(toggle: boolean): void {
        this.flProductItem2.toggleIndicator(toggle);
    }
    get onActionClick2(): Button['onTouch'] {
        return this.flProductItem2.btnAddToBasket.onTouch;
    }
    set onActionClick2(value: Button['onTouch']) {
        this.flProductItem2.btnAddToBasket.onTouch = value;
    }
    get itemTitle2(): string {
        return this.flProductItem2.itemTitle;
    }
    set itemTitle2(value: string) {
        this.flProductItem2.itemTitle = value;
    }
    get itemPrice2(): any {
        return this.flProductItem2.itemPrice.text;
    }
    set itemPrice2(value: any) {
        this.flProductItem2.itemPrice = value;
    }
    get itemReview2(): any {
        return this.flProductItem2.itemReview.text;
    }
    set itemReview2(value: any) {
        this.flProductItem2.itemReview = value;
    }
    get itemDiscountPrice2(): any {
        return this.flProductItem2.itemDiscountPrice.text;
    }
    set itemDiscountPrice2(value: any) {
        this.flProductItem2.itemDiscountPrice = value;
    }
    get itemTag2(): string {
        return this.flProductItem2.itemTag;
    }
    set itemTag2(value: string) {
        this.flProductItem2.itemTag = value;
    }
    get itemImage2(): string | Image {
        return this.flProductItem2.itemImage;
    }
    set itemImage2(value: string | Image) {
        this.flProductItem2.itemImage = value;
    }
    get itemDesc2(): string {
        return this.flProductItem2.itemDesc;
    }
    set itemDesc2(value: string) {
        this.flProductItem2.itemDesc = value;
    }
    static getHeight(): number {
        return height;
    }
}
