import ImageView from '@smartface/native/ui/imageview';
import FlProductDetailOverviewSectionDesign from 'generated/my-components/FlProductDetailOverviewSection';
import setVisibility from 'lib/setVisibility';

export default class FlProductDetailOverviewSection extends FlProductDetailOverviewSectionDesign {
    pageName?: string | undefined;
    private images: Array<ImageView>;
    private __showRating: boolean;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get overviewTitle(): string {
        return this.lblOverviewTitle.text;
    }
    set overviewTitle(value: string) {
        this.lblOverviewTitle.text = value;
    }
    set star(value: number) {
        this.flRateWrapper.star = value;
    }
    set reviewCount(value: string) {
        this.flRateWrapper.reviewCount = value;
    }
    get showRating(): boolean {
        return this.__showRating;
    }
    set showRating(value: boolean) {
        setVisibility(this.flRateWrapper, value);
        this.__showRating = value;
    }
}
