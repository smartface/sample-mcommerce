import FlRow2LineButtonDesign from 'generated/my-components/FlRow2LineButton';
import Button from '@smartface/native/ui/button';
import Label from '@smartface/native/ui/label';
import Screen from '@smartface/native/device/screen';
import { themeService } from 'theme';

const { marginRight: verticalSeparatorMarginRight, marginLeft: verticalSeparatorMarginLeft } = themeService.getNativeStyle(
    '.flRow2LineButton-flButtons-flOtherActions-verticalSeparator'
);
const { width: buttonWidth } = themeService.getNativeStyle('.flRow2LineButton-flButtons-flOtherActions-btnMain');
export default class FlRow2LineButton extends FlRow2LineButtonDesign {
    pageName?: string | undefined;
    __mainOnClick: (...args) => void;
    __bottomLeftOnClick: (...args) => void;
    __bottomRightOnClick: (...args) => void;
    private __leftImage: string;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;

        this.btnMain.on('press', () => {
            this.__mainOnClick && this.__mainOnClick();
        });
        this.lblLeft.on('touchEnded', () => {
            this.__bottomLeftOnClick && this.__bottomLeftOnClick();
        });
        this.lblRight.on('touchEnded', () => {
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
        this.lblLeft.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                width: this.lblLeft.font.sizeOfString(value, Screen.width)?.width || 120
            }
        });
    }
    get bottomRightLabelText() {
        return this.lblRight.text;
    }
    set bottomRightLabelText(value: string) {
        this.lblRight.text = value;
        this.lblRight.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                width: this.lblRight.font.sizeOfString(value, Screen.width)?.width || 120
            }
        });
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
