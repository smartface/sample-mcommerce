import LviRow2LineButtonDesign from 'generated/my-components/LviRow2LineButton';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import { setID } from 'lib/testAutomation';
import Image from '@smartface/native/ui/image';

const { height } = getCombinedStyle('.lviRow2LineButton');

export default class LviRow2LineButton extends LviRow2LineButtonDesign {
    pageName?: string | undefined;
    private __ID: string;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get leftIcon() {
        return this.flRow2LineButton.leftIcon;
    }
    set leftIcon(value: string | Image) {
        this.flRow2LineButton.leftIcon = value;
    }
    get mainButtonText() {
        return this.flRow2LineButton.mainButtonText;
    }
    set mainButtonText(value: string) {
        this.flRow2LineButton.mainButtonText = value;
    }
    get bottomLeftButtonText() {
        return this.flRow2LineButton.bottomLeftButtonText;
    }
    set bottomLeftButtonText(value: string) {
        this.flRow2LineButton.bottomLeftButtonText = value;
    }
    get bottomRightButtonText() {
        return this.flRow2LineButton.bottomRightButtonText;
    }
    set bottomRightButtonText(value: string) {
        this.flRow2LineButton.bottomRightButtonText = value;
    }
    get mainOnClick(): () => void {
        return this.flRow2LineButton.mainOnClick;
    }
    set mainOnClick(value: () => void) {
        this.flRow2LineButton.mainOnClick = value;
    }
    get bottomLeftOnClick(): () => void {
        return this.flRow2LineButton.bottomLeftOnClick;
    }
    set bottomLeftOnClick(value: () => void) {
        this.flRow2LineButton.bottomLeftOnClick = value;
    }
    get bottomRightOnClick(): () => void {
        return this.flRow2LineButton.bottomRightOnClick;
    }
    set bottomRightOnClick(value: () => void) {
        this.flRow2LineButton.bottomRightOnClick = value;
    }
    set ID(value: string) {
        setID(this, (this.__ID = value));
        this.flRow2LineButton.ID = value;
    }
    static getHeight(): number {
        return height;
    }
}
