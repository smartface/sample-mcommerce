import FlProductDetailInfoSectionDesign from 'generated/my-components/FlProductDetailInfoSection';

export default class FlProductDetailInfoSection extends FlProductDetailInfoSectionDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get productTitle(): string {
        return this.lblTitle.text;
    }
    set productTitle(value: string) {
        this.lblTitle.text = value;
    }
    get productInfo(): string {
        return this.lblProductInfo.text;
    }
    set productInfo(value: string) {
        this.lblProductInfo.text = value;
    }
}
