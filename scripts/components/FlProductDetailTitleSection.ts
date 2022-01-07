import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import FlProductDetailTitleSectionDesign from 'generated/my-components/FlProductDetailTitleSection';

export default class FlProductDetailTitleSection extends FlProductDetailTitleSectionDesign {
    __onFavoriteClick: (...args) => void;
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.imgFavorite.on(View.Events.TouchEnded, () => {
            this.__onFavoriteClick && this.__onFavoriteClick();
        });
    }
    get productTitle(): string {
        return this.lblProductTitle.text;
    }
    set productTitle(value: string) {
        this.lblProductTitle.text = value;
    }
    get productMeas(): string {
        return this.lblProductMeas.text;
    }
    set productMeas(value: string) {
        this.lblProductMeas.text = value;
    }
    get onFavoriteClick(): (...args) => void {
        return this.__onFavoriteClick;
    }
    set onFavoriteClick(value: (...args) => void) {
        this.__onFavoriteClick = value;
    }
}
