import LviPdInfoSectionDesign from 'generated/my-components/LviPdInfoSection';
import { themeService } from 'theme';

const { height } = themeService.getStyle('.lviPdInfoSection');

export default class LviPdInfoSection extends LviPdInfoSectionDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return height;
    }
    get overviewTitle(): string {
        return this.flProductDetailInfoSection.overviewTitle;
    }
    set overviewTitle(value: string) {
        this.flProductDetailInfoSection.overviewTitle = value;
    }
    get productInfo(): string {
        return this.flProductDetailInfoSection.productInfo;
    }
    set productInfo(value: string) {
        this.flProductDetailInfoSection.productInfo = value;
    }
}
