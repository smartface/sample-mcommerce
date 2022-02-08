import { REVIEW_MAX_LINE } from 'constants';
import LviReviewDesign from 'generated/my-components/LviReview';
import { setTextDimensions } from 'lib/setTextDimensions';
import { themeService } from 'theme';

const { paddingBottom: reviewPaddingBottom, paddingTop: reviewPaddingTop } = themeService.getNativeStyle('.flReview');
const { height: separatorHeight } = themeService.getNativeStyle('.separator');
const { font: lblFont } = themeService.getNativeStyle('.review.name');
const { font: tvFont } = themeService.getNativeStyle('.review.tvComment');

export default class LviReview extends LviReviewDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    static getHeight(tvComment: string, lblName: string): number {
        const { height: commentHeight } = setTextDimensions(tvComment, tvFont, { maxLines: REVIEW_MAX_LINE });
        const { height: titleHeight } = setTextDimensions(lblName, lblFont, {});
        return reviewPaddingTop + titleHeight + commentHeight + reviewPaddingBottom + separatorHeight;
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
