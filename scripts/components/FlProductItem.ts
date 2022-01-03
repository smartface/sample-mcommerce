import ActivityIndicator from '@smartface/native/ui/activityindicator';
import Button from '@smartface/native/ui/button';
import FlProductItemDesign from 'generated/my-components/FlProductItem';

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
        this.myActivityIndicator.android.zIndex = this.btnAddToCard.android.zIndex + 1;
        this.flProductPriceButtonWrapper.addChild(this.myActivityIndicator, 'myActivityIndicator', '.sf-activityIndicator', {
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
        return this.btnAddToCard.onTouch;
    }
    set onActionClick(value: Button['onTouch']) {
        this.btnAddToCard.onTouch = value;
    }
    get itemTitle(): string {
        return this.lblProductTitle.text;
    }
    set itemTitle(value: string) {
        this.lblProductTitle.text = value;
    }
    get itemPrice(): any {
        return this.lblProductPrice.text;
    }
    set itemPrice(value: any) {
        this.lblProductPrice.text = value;
    }
    get itemTag(): string {
        return this.itemTag.text;
    }
    set itemTag(value: string) {
        if (!value) {
            this.flTagWrapper.visible = false;
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
