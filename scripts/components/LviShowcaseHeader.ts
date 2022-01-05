import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import LviShowcaseHeaderDesign from 'generated/my-components/LviShowcaseHeader';
const { height } = getCombinedStyle('.lviShowcaseHeader').height;
export default class LviShowcaseHeader extends LviShowcaseHeaderDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return height;
    }
    get showcaseTitle(): string {
        return this.lblTitle.text;
    }
    set showcaseTitle(value: string) {
        this.lblTitle.text = value;
    }
    get showcaseLinkText(): string {
        return this.lblSeeAll.text;
    }
    set showcaseLinkText(value: string) {
        this.lblSeeAll.text = value;
    }
}
