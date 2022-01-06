import LviPdTitleLikeSectionDesign from 'generated/my-components/LviPdTitleLikeSection';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';

const { height } = getCombinedStyle('.lviProductDetailTitleSection');
export default class LviPdTitleLikeSection extends LviPdTitleLikeSectionDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return height;
    }
    get onFavoriteClick(): (product: any) => void {
        return this.flProductDetailTitleSection.onFavoriteClick;
    }
    set onFavoriteClick(value: (product: any) => void) {
        this.flProductDetailTitleSection.onFavoriteClick = value;
    }
    get productTitle(): string {
        return this.flProductDetailTitleSection.productTitle;
    }
    set productTitle(value: string) {
        this.flProductDetailTitleSection.productTitle = value;
    }
    get productMeas(): string {
        return this.flProductDetailTitleSection.productMeas;
    }
    set productMeas(value: string) {
        this.flProductDetailTitleSection.productMeas = value;
    }
}
