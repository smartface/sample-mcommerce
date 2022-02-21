import Screen from '@smartface/native/device/screen';
import { REVIEW_MAX_LINE } from 'constants';
import FlReviewDesign from 'generated/my-components/FlReview';
import { setTextDimensions } from 'lib/setTextDimensions';
import setVisibility from 'lib/setVisibility';
import { themeService } from 'theme';
const { paddingLeft, paddingRight } = themeService.getNativeStyle('.flReview');
const commentMaxWidth = Screen.width - (paddingLeft + paddingRight);

export default class FlReview extends FlReviewDesign {
    pageName?: string | undefined;
    private __showSeparator: boolean;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get name(): string {
        return this.lblName.text;
    }
    set name(value: string) {
        this.lblName.text = value;
    }
    get star(): string {
        return this.lblStar.text;
    }
    set star(value: string) {
        this.lblStar.text = value;
    }
    get date(): string {
        return this.lblDate.text;
    }
    set date(value: string) {
        this.lblDate.text = value;
    }
    get comment(): string {
        return this.lblComment.text;
    }
    set comment(value: string) {
        this.lblComment.text = value;
        const { height } = setTextDimensions(value, this.lblComment.font, { maxLines: REVIEW_MAX_LINE, maxWidth: commentMaxWidth });
        this.lblComment.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                height
            }
        });
    }
    get showSeparator(): boolean {
        return this.__showSeparator;
    }
    set showSeparator(value: boolean) {
        setVisibility(this.seperator, value);
        this.__showSeparator = value;
    }
}
