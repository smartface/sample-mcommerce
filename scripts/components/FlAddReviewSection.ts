import Label from '@smartface/native/ui/label';
import View from '@smartface/native/ui/view';
import FlAddReviewSectionDesign from 'generated/my-components/FlAddReviewSection';

export default class FlAddReviewSection extends FlAddReviewSectionDesign {
    pageName?: string | undefined;
    private __image: string;
    __mainOnClick: (...args) => void;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.lblAddReview.on(Label.Events.TouchEnded, () => {
            this.__mainOnClick && this.__mainOnClick();
        });
        this.lblAddReview.text = global.lang.addReview;
    }
    get image(): string {
        return this.__image;
    }
    set image(value: string) {
        this.__image = value;
        this.imgStar.image = this.__image;
    }
    get review(): string {
        return this.lblReview.text;
    }
    set review(value: string) {
        this.lblReview.text = value;
    }
    get mainOnClick(): (...args) => void {
        return this.__mainOnClick;
    }
    set mainOnClick(value: (...args) => void) {
        this.__mainOnClick = value;
    }
}
