import LviPdOverviewSectionDesign from 'generated/my-components/LviPdOverviewSection';

import { themeService } from 'theme';

const { height } = themeService.getStyle('.lviPdOverviewSection');
export default class LviPdOverviewSection extends LviPdOverviewSectionDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return height;
    }
    get overviewTitle(): string {
        return this.flProductDetailOverviewSection.overviewTitle;
    }
    set overviewTitle(value: string) {
        this.flProductDetailOverviewSection.overviewTitle = value;
    }
    get onArrowClick(): () => void {
        return this.flProductDetailOverviewSection.onArrowClick;
    }
    set onArrowClick(value: () => void) {
        this.flProductDetailOverviewSection.onArrowClick = value;
    }
}
