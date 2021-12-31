import ActivityIndicator from '@smartface/native/ui/activityindicator';
import Button from '@smartface/native/ui/button';
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import GviProductItemDesign from 'generated/my-components/GviProductItem';
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
        this.myActivityIndicator = new ActivityIndicator();
        this.myActivityIndicator.android.zIndex = this.gviProductItemButton.android.zIndex + 1;
        this.gviProductItemPriceButtonWrapper.addChild(this.myActivityIndicator, 'myActivityIndicator', '.sf-activityIndicator', {
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
        return this.gviProductItemButton.onTouch;
    }
    set onActionClick(value: Button['onTouch']) {
        this.gviProductItemButton.onTouch = value;
    }
    get itemTitle(): string {
        return this.gviLblProductItemTitle.text;
    }
    set itemTitle(value: string) {
        this.gviLblProductItemTitle.text = value;
    }
    get itemPrice(): any {
        return this.gviProductItemPrice.text;
    }
    set itemPrice(value: any) {
        this.gviProductItemPrice.text = value;
    }
    get itemTag(): string {
        return this.lblTag.text;
    }
    set itemTag(value: string) {
        if (!value) {
            this.lblTag.visible = false
            // this.lblTag.dispatch({
            //     type: 'updateUserStyle',
            //     userStyle: {
            //         visible: false
            //     }
            // });
        } else {
            this.lblTag.text = value;

        }
    }
    get itemImage(): string | Image {
        return this.gviProductItemImg.image;
    }
    set itemImage(value: string | Image) {
        this.gviProductItemImg.image = Image.createFromFile(`images://${value}`);
    }
    get itemDesc(): string {
        return this.gviProductItemDesc.text;
    }
    set itemDesc(value: string) {
        this.gviProductItemDesc.text = value;
    }
}
