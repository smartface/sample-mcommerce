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
    static getHeight() {
        return height;
    }
}
