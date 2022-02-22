import LviRow2LineButtonDesign from 'generated/my-components/LviRow2LineButton';
import { themeService } from 'theme';
import { setID } from 'lib/testAutomation';
import Image from '@smartface/native/ui/image';

const { height } = themeService.getStyle('.lviRow2LineButton');

export default class LviRow2LineButton extends LviRow2LineButtonDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get leftIcon() {
        return this.flRow2LineButton.leftIcon;
    }
    set leftIcon(value: string) {
        this.flRow2LineButton.leftIcon = value;
    }
    get mainButtonText() {
        return this.flRow2LineButton.mainButtonText;
    }
    set mainButtonText(value: string) {
        this.flRow2LineButton.mainButtonText = value;
    }
    get bottomLeftLabelText() {
        return this.flRow2LineButton.bottomLeftLabelText;
    }
    set bottomLeftLabelText(value: string) {
        this.flRow2LineButton.bottomLeftLabelText = value;
    }
    get bottomRightLabelText() {
        return this.flRow2LineButton.bottomRightLabelText;
    }
    set bottomRightLabelText(value: string) {
        this.flRow2LineButton.bottomRightLabelText = value;
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
    static getHeight(): number {
        return height;
    }
}
