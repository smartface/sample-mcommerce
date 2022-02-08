import Screen from '@smartface/native/device/screen';
import { REVIEW_MAX_LINE } from 'constants';
import LviReviewDesign from 'generated/my-components/LviReview';
import { setTextDimensions } from 'lib/setTextDimensions';
import { themeService } from 'theme';
const {
    paddingBottom: reviewPaddingBottom,
    paddingTop: reviewPaddingTop,
    paddingLeft,
    paddingRight
} = themeService.getNativeStyle('.flReview');
const titleHeight = themeService.getNativeStyle('.flReview-flHeader').height;
const { height: separatorHeight } = themeService.getNativeStyle('.separator');
const { font: lblFont } = themeService.getNativeStyle('.review.lblComment');
const commentMaxWidth = Screen.width - (paddingLeft + paddingRight);

export default class LviReview extends LviReviewDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    static getHeight(comment: string): number {
        const { height: commentHeight } = setTextDimensions(comment, lblFont, { maxLines: REVIEW_MAX_LINE, maxWidth: commentMaxWidth });
        return reviewPaddingTop + reviewPaddingBottom + titleHeight + commentHeight + separatorHeight;
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
