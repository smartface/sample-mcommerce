import FlRow2LineButtonDesign from 'generated/my-components/FlRow2LineButton';
import Image from '@smartface/native/ui/image';
import { setID } from 'lib/testAutomation';
import Button from '@smartface/native/ui/button';
import Label from '@smartface/native/ui/label';

export default class FlRow2LineButton extends FlRow2LineButtonDesign {
    pageName?: string | undefined;
    __mainOnClick: (...args) => void;
    __bottomLeftOnClick: (...args) => void;
    __bottomRightOnClick: (...args) => void;
    private __leftImage: string;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;

        this.btnMain.on(Button.Events.Press, () => {
            this.__mainOnClick && this.__mainOnClick();
        });
        this.lblLeft.on(Label.Events.TouchEnded, () => {
            this.__bottomLeftOnClick && this.__bottomLeftOnClick();
        });
        this.lblRight.on(Label.Events.TouchEnded, () => {
            this.__bottomRightOnClick && this.__bottomRightOnClick();
        });
    }
    get leftIcon() {
        return this.__leftImage;
    }
    set leftIcon(value: string) {
        this.__leftImage = value;
        this.imgLeft.image = this.__leftImage;
    }
    get mainButtonText() {
        return this.btnMain.text;
    }
    set mainButtonText(value: string) {
        this.btnMain.text = value;
    }
    get bottomLeftLabelText() {
        return this.lblLeft.text;
    }
    set bottomLeftLabelText(value: string) {
        this.lblLeft.text = value;
    }
    get bottomRightLabelText() {
        return this.lblRight.text;
    }
    set bottomRightLabelText(value: string) {
        this.lblRight.text = value;
    }
    get mainOnClick(): (...args) => void {
        return this.__mainOnClick;
    }
    set mainOnClick(value: (...args) => void) {
        this.__mainOnClick = value;
    }
    get bottomLeftOnClick(): (...args) => void {
        return this.__bottomLeftOnClick;
    }
    set bottomLeftOnClick(value: (...args) => void) {
        this.__bottomLeftOnClick = value;
    }
    get bottomRightOnClick(): (...args) => void {
        return this.__bottomRightOnClick;
    }
    set bottomRightOnClick(value: (...args) => void) {
        this.__bottomRightOnClick = value;
    }
}
