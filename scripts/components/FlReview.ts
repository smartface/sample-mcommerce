import FlReviewDesign from 'generated/my-components/FlReview';
import setVisibility from 'lib/setVisibility';

export default class FlReview extends FlReviewDesign {
    pageName?: string | undefined;
    private __showSeparator: boolean;
    private __image: string;
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
    get image(): string {
        return this.__image;
    }
    set image(value: string) {
        this.__image = value;
        this.imgStar.image = this.__image;
    }
    get star(): string {
        return this.lblStar.text;
    }
    set star(value: string) {
        this.lblStar.text = value;
    }
    get comment(): string {
        return this.tvComment.text;
    }
    set comment(value: string) {
        this.tvComment.text = value;
    }
    get showSeparator(): boolean {
        return this.__showSeparator;
    }
    set showSeparator(value: boolean) {
        setVisibility(this.seperator, value);
        this.__showSeparator = value;
    }
}
