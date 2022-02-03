import ImageView from '@smartface/native/ui/imageview';
import FlRateProductDesign from 'generated/my-components/FlRateProduct';

export default class FlRateProduct extends FlRateProductDesign {
    pageName?: string | undefined;
    private images: Array<ImageView>;
    rating: number = 0;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.lblHeader.text = global.lang.rateProduct;
        this.images = [this.imgStar1, this.imgStar2, this.imgStar3, this.imgStar4, this.imgStar5];
        this.images.forEach((imageViewStar, index) => {
            imageViewStar.on(ImageView.Events.TouchEnded, () => {
                this.rating = index + 1;
                for (let i = 0; i < this.images.length; i++) {
                    this.images[i].image = i <= index ? 'images://small_star_96.png' : 'images://small_star_empty_96.png';
                }
            });
        });
    }
    get rate(): number {
        return this.rating;
    }
    get comment(): string {
        return this.tbComment.text;
    }
}
