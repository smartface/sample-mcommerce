import FlRow2LineButtonDesign from 'generated/my-components/FlRow2LineButton';
import Image from '@smartface/native/ui/image';
import { setID } from 'lib/testAutomation';

export default class FlRow2LineButton extends FlRow2LineButtonDesign {
    pageName?: string | undefined;
    private __mainOnClick: () => void;
    private __bottomLeftOnClick: () => void;
    private __bottomRightOnClick: () => void;
    private __ID: string;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get leftIcon() {
        return this.imgLeft.image;
    }
    set leftIcon(value: string | Image) {
        this.imgLeft.image = value;
    }
    get mainButtonText() {
        return this.btnMain.text;
    }
    set mainButtonText(value: string) {
        this.btnMain.text = value;
    }
    get bottomLeftButtonText() {
        return this.btnBottomLeft.text;
    }
    set bottomLeftButtonText(value: string) {
        this.btnBottomLeft.text = value;
    }
    get bottomRightButtonText() {
        return this.btnBottomRight.text;
    }
    set bottomRightButtonText(value: string) {
        this.btnBottomRight.text = value;
    }
    get mainOnClick(): () => void {
        return this.__mainOnClick;
    }
    set mainOnClick(value: () => void) {
        this.__mainOnClick = value;
        this.btnMain.onPress = value;
    }
    get bottomLeftOnClick(): () => void {
        return this.__bottomLeftOnClick;
    }
    set bottomLeftOnClick(value: () => void) {
        this.__bottomLeftOnClick = value;
        this.btnBottomLeft.onPress = value;
    }
    get bottomRightOnClick(): () => void {
        return this.__bottomRightOnClick;
    }
    set bottomRightOnClick(value: () => void) {
        this.__bottomRightOnClick = value;
        this.btnBottomRight.onPress = value;
    }
    set ID(value: string) {
        setID(this, (this.__ID = value));
        setID(this.imgLeft, `${this.ID}/imgLeft`);
        setID(this.btnMain, `${this.ID}/btnMain`);
        setID(this.btnBottomLeft, `${this.ID}/btnLeft`);
        setID(this.btnBottomRight, `${this.ID}/btnRight`);
    }
}
