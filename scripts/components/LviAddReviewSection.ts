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
    get image(): string {
        return this.flAddReviewSection.image;
    }
    set image(value: string) {
        this.flAddReviewSection.image = value;
    }
    get review(): string {
        return this.flAddReviewSection.review;
    }
    set review(value: string) {
        this.flAddReviewSection.review = value;
    }
    get mainOnClick(): () => void {
        return this.flAddReviewSection.mainOnClick;
    }
    set mainOnClick(value: () => void) {
        this.flAddReviewSection.mainOnClick = value;
    }
}
