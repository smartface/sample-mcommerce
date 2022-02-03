import LviReviewDesign from 'generated/my-components/LviReview';
import { themeService } from 'theme';
const originalHeight = themeService.getStyle('.lviReview').height;

export default class LviReview extends LviReviewDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return originalHeight;
    }
    get name(): string {
        return this.flReview.name;
    }
    set name(value: string) {
        this.flReview.name = value;
    }
    get star(): string {
        return this.flReview.star;
    }
    set star(value: string) {
        this.flReview.star = value;
    }
    get comment(): string {
        return this.flReview.comment;
    }
    set comment(value: string) {
        this.flReview.comment = value;
    }
    get showSeparator(): boolean {
        return this.flReview.showSeparator;
    }
    set showSeparator(value: boolean) {
        this.flReview.showSeparator = value;
    }
}
