import Label from '@smartface/native/ui/label';
import FlAddReviewSectionDesign from 'generated/my-components/FlAddReviewSection';

export default class FlAddReviewSection extends FlAddReviewSectionDesign {
    pageName?: string | undefined;
    __mainOnClick: (...args) => void;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get review(): string {
        return this.lblReview.text;
    }
    set review(value: string) {
        this.lblReview.text = value;
    }
}
