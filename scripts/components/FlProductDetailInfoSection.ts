import FlProductDetailInfoSectionDesign from 'generated/my-components/FlProductDetailInfoSection';

export default class FlProductDetailInfoSection extends FlProductDetailInfoSectionDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get overviewTitle(): string {
        return this.lblTitle.text;
    }
    set overviewTitle(value: string) {
        this.lblTitle.text = value;
    }
    get productInfo(): string {
        return this.lblProductInfo.text;
    }
    set productInfo(value: string) {
        this.lblProductInfo.text = value;
    }
}
