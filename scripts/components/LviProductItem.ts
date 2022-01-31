import LviProductItemDesign from 'generated/my-components/LviProductItem';
import Button from '@smartface/native/ui/button';
import Image from '@smartface/native/ui/image';
import { themeService } from 'theme';

const { height } = themeService.getStyle('.lviProductItem');

export default class LviProductItem extends LviProductItemDesign {
    pageName?: string | undefined;
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
        return this.flProductItem.onActionClick;
    }
    set onActionClick(value: Button['onTouch']) {
        this.flProductItem.onActionClick = value;
    }
    get itemTitle(): string {
        return this.flProductItem.itemTitle;
    }
    set itemTitle(value: string) {
        this.flProductItem.itemTitle = value;
    }
    get itemPrice(): any {
        return this.flProductItem.itemPrice;
    }
    set itemPrice(value: any) {
        this.flProductItem.itemPrice = value;
    }
    get itemTag(): string {
        return this.flProductItem.itemTag;
    }
    set itemTag(value: string) {
        this.flProductItem.itemTag = value;
    }
    get itemImage() {
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
    static getHeight(): number {
        return height;
    }
}
