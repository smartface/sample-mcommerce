import ImageView from '@smartface/native/ui/imageview';
import FlProductDetailOverviewSectionDesign from 'generated/my-components/FlProductDetailOverviewSection';
import setVisibility from 'lib/setVisibility';

export default class FlProductDetailOverviewSection extends FlProductDetailOverviewSectionDesign {
    private __onArrowClick: () => void;
    pageName?: string | undefined;
    private images: Array<ImageView>;
    private __showRating: boolean;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.images = [this.imgStar1, this.imgStar2, this.imgStar3, this.imgStar4, this.imgStar5];
    }
    get overviewTitle(): string {
        return this.lblOverviewTitle.text;
    }
    set overviewTitle(value: string) {
        this.lblOverviewTitle.text = value;
    }
    get onArrowClick(): () => void {
        return this.__onArrowClick;
    }
    set onArrowClick(value: () => void) {
        this.__onArrowClick = value;
        this.imgRouteArrow.onTouchEnded = value;
    }
    set rating(value: string) {
        this.setImages(value);
    }
    get countOfReviews(): string {
        return this.lblReviewCount.text;
    }
    set countOfReviews(value: string) {
        this.lblReviewCount.text = value;
    }
    get showRating(): boolean {
        return this.__showRating;
    }
    set showRating(value: boolean) {
        setVisibility(this.flRateWrapper, value);
        this.__showRating = value;
    }
    setImages(value: string) {
        this.images.forEach((imageViewStar, index) => {
            for (let i = 0; i < this.images.length; i++) {
                this.images[i].image = i <= parseInt(value) - 1 ? 'images://small_star_96.png' : 'images://small_star_empty_96.png';
            }
        });
    }
}
