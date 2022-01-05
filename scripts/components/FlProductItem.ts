import FlProductItemDesign from 'generated/my-components/FlProductItem';
import ActivityIndicator from '@smartface/native/ui/activityindicator';
import Button from '@smartface/native/ui/button';
import Image from '@smartface/native/ui/image';
import setVisibility from 'lib/setVisibility';

export default class FlProductItem extends FlProductItemDesign {
    pageName?: string | undefined;
    myActivityIndicator: ActivityIndicator;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    initIndicator() {
        this.myActivityIndicator = new ActivityIndicator();
        this.myActivityIndicator.android.zIndex = this.btnAddToBasket.android.zIndex + 1;
        this.flProductItemPriceButtonWrapper.addChild(this.myActivityIndicator, 'myActivityIndicator', '.sf-activityIndicator', {
            width: 30,
            height: 30,
            right: 13,
            visible: true,
            flexProps: {
                positionType: 'ABSOLUTE'
            },
            color: '#181725'
        });
    }
    toggleIndicator(toggle: boolean): void {
        console.log('toggle', toggle);
        //@ts-ignore
        this.myActivityIndicator.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                visible: toggle
            }
        });
    }
    get onActionClick(): Button['onTouch'] {
        return this.btnAddToBasket.onTouch;
    }
    set onActionClick(value: Button['onTouch']) {
        this.btnAddToBasket.onTouch = value;
    }
    get itemTitle(): string {
        return this.lblProductItemTitle.text;
    }
    set itemTitle(value: string) {
        this.lblProductItemTitle.text = value;
    }
    get itemPrice(): any {
        return this.lblProductItemPrice.text;
    }
    set itemPrice(value: any) {
        this.lblProductItemPrice.text = value;
    }
    get itemReview(): any {
        return this.lblReview.text;
    }
    set itemReview(value: any) {
        this.lblReview.text = value;
    }
    get itemDiscountPrice(): any {
        return this.lblPriceWithDiscount.text;
    }
    set itemDiscountPrice(value: any) {
        this.lblPriceWithDiscount.text = value;
    }
    get itemTag(): string {
        return this.lblTag.text;
    }
    set itemTag(value: string) {
        if (!value) {
            this.flTagWrapper.visible = false;
        } else {
            this.lblTag.text = value;
        }

        this.checkIsHidden();
    }
    get itemImage(): string | Image {
        return this.imgProduct.image;
    }
    set itemImage(value: string | Image) {
        if (value) {
            this.imgProduct.image = Image.createFromFile(`images://${value}`);
        }
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
