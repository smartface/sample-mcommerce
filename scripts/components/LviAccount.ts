import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import LviAccountDesign from 'generated/my-components/LviAccount';
const originalHeight = getCombinedStyle('.lviAccount').height;

export default class LviAccount extends LviAccountDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return originalHeight;
    }
    get topLine(): boolean {
        return this.flAccountTopLine.visible;
    }
    set topLine(value: boolean) {
        this.flAccountTopLine.visible = value;
    }
    get bottomLine(): boolean {
        return this.flAccountBottomLine.visible;
    }
    set bottomLine(value: boolean) {
        this.flAccountBottomLine.visible = value;
    }
    get itemTitle(): string {
        return this.lblAccountLviTitle.text;
    }
    set itemTitle(value: string) {
        this.lblAccountLviTitle.text = global.lang[value];
    }
    get leftIcon(): string {
        return this.lblAccountLeftIcon.text;
    }
    set leftIcon(value: string) {
        this.lblAccountLeftIcon.text = value;
    }
    get rightIcon(): string {
        return this.lblAccountRightChevron.text;
    }
    set rightIcon(value: string) {
        this.lblAccountRightChevron.text = value;
    }
}
