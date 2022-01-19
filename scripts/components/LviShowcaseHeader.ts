import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import LviShowcaseHeaderDesign from 'generated/my-components/LviShowcaseHeader';
const { height } = getCombinedStyle('.lviShowcaseHeader');
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
        return this.flProductHeader.showcaseTitle;
    }
    set showcaseTitle(value: string) {
        this.flProductHeader.showcaseTitle = value;
    }
    get showcaseLinkText(): string {
        return this.flProductHeader.showcaseLinkText;
    }
    set showcaseLinkText(value: string) {
        this.flProductHeader.showcaseLinkText = value;
    }
    get onSeeAllClick(): (...args) => void {
        return this.flProductHeader.onSeeAllClick;
    }
    set onSeeAllClick(value: (...args) => void) {
        this.flProductHeader.onSeeAllClick = value;
    }
}
