import LviPdOverviewSectionDesign from 'generated/my-components/LviPdOverviewSection';
import { themeService } from 'theme';

const { height } = themeService.getStyle('.lviPdOverviewSection');
export default class LviPdOverviewSection extends LviPdOverviewSectionDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
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
    set star(value: number) {
        this.flProductDetailOverviewSection.star = value;
    }
    set countOfReviews(value: string) {
        this.flProductDetailOverviewSection.countOfReviews = value;
    }
    get showRating(): boolean {
        return this.flProductDetailOverviewSection.showRating;
    }
    set showRating(value: boolean) {
        this.flProductDetailOverviewSection.showRating = value;
    }
}
