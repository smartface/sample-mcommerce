import LviAddReviewSectionDesign from 'generated/my-components/LviAddReviewSection';
import { themeService } from 'theme';

const { height } = themeService.getStyle('.lviAddReviewSection');

export default class LviAddReviewSection extends LviAddReviewSectionDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return height;
    }
    get review(): string {
        return this.flAddReviewSection.review;
    }
    set review(value: string) {
        this.flAddReviewSection.review = value;
    }
}
