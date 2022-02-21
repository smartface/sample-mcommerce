import LviPdTitleLikeSectionDesign from 'generated/my-components/LviPdTitleLikeSection';
import { themeService } from 'theme';
import Image from '@smartface/native/ui/image';
import store from 'store';
const { height } = themeService.getStyle('.lviProductDetailTitleSection');
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
    get onFavoriteClick(): (...args) => void {
        return this.flProductDetailTitleSection.onFavoriteClick;
    }
    set onFavoriteClick(value: (...args) => void) {
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
    get favoriteImg(): string | Image {
        return this.flProductDetailTitleSection.favoriteImg;
    }
    set favoriteImg(value: string | Image) {
        this.flProductDetailTitleSection.favoriteImg = value;
    }
}
