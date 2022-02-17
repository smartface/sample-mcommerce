import ImageView from '@smartface/native/ui/imageview';
import FlRateWrapperDesign from 'generated/my-components/FlRateWrapper';

export default class FlRateWrapper extends FlRateWrapperDesign {
    pageName?: string | undefined;
    images: Array<ImageView>;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.images = [this.imgStar1, this.imgStar2, this.imgStar3, this.imgStar4, this.imgStar5];
    }
    set reviewCount(value: string) {
        this.lblReviewCount.text = value;
    }
    get reviewCount(): string {
        return this.lblReviewCount.text;
    }
    set star(value: number) {
        this.setImages(value);
    }
    setImages(value: number) {
        this.images.forEach((imageViewStar, index) => {
            for (let i = 0; i < this.images.length; i++) {
                this.images[i].image = i <= value - 1 ? 'images://small_star_96.png' : 'images://small_star_empty_96.png';
            }
        });
    }
}
