import FlRow2LineButtonDesign from 'generated/my-components/FlRow2LineButton';
import Image from '@smartface/native/ui/image';
import { setID } from 'lib/testAutomation';
import Button from '@smartface/native/ui/button';

export default class FlRow2LineButton extends FlRow2LineButtonDesign {
    pageName?: string | undefined;
    __mainOnClick: (...args) => void;
    __bottomLeftOnClick: (...args) => void;
    __bottomRightOnClick: (...args) => void;
    private __leftImage: string;
    private __ID: string;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;

        this.btnMain.on(Button.Events.Press, () => {
            this.__mainOnClick && this.__mainOnClick();
        });
        this.btnBottomLeft.on(Button.Events.Press, () => {
            this.__bottomLeftOnClick && this.__bottomLeftOnClick();
        });
        this.btnBottomRight.on(Button.Events.Press, () => {
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
    set ID(value: string) {
        setID(this, (this.__ID = value));
        setID(this.imgLeft, `${this.ID}/imgLeft`);
        setID(this.btnMain, `${this.ID}/btnMain`);
        setID(this.btnBottomLeft, `${this.ID}/btnLeft`);
        setID(this.btnBottomRight, `${this.ID}/btnRight`);
    }
}
