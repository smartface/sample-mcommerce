import FlReviewDesign from 'generated/my-components/FlReview';
import setVisibility from 'lib/setVisibility';

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
