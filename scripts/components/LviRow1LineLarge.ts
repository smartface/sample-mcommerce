import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import LviRow1LineLargeDesign from 'generated/my-components/LviRow1LineLarge';
const { height } = getCombinedStyle('.lviRow1LineLarge');
export default class LviRow1LineLarge extends LviRow1LineLargeDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get title(): string {
        return this.flRow1LineLarge.title;
    }
    set title(value: string) {
        this.flRow1LineLarge.title = value;
    }
    get image(): string {
        return this.flRow1LineLarge.image;
    }
    set image(value: string) {
        this.flRow1LineLarge.image = value;
    }
    get showSeparator(): boolean {
        return this.flRow1LineLarge.showSeparator;
    }
    set showSeparator(value: boolean) {
        this.flRow1LineLarge.showSeparator = value;
    }
    get themeSwitch(): boolean {
        return this.flRow1LineLarge.themeSwitch;
    }
    set themeSwitch(value: boolean) {
        this.flRow1LineLarge.themeSwitch = value;
    }
    get switchToggle(): boolean {
        return this.flRow1LineLarge.switchToggle;
    }
    set switchToggle(value: boolean) {
        this.flRow1LineLarge.switchToggle = value;
    }
    toggleSwitch(value: boolean) {
        this.flRow1LineLarge.toggleSwitch(value);
    }
    set enableSwitch(value: boolean) {
        this.flRow1LineLarge.enableSwitch = value;
    }
    get setLargeSwitch(): (...args: any) => any {
        return this.flRow1LineLarge.setLargeSwitch;
    }
    static getHeight() {
        return height;
    }
}
