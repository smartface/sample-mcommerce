import LviPdInfoSectionDesign from 'generated/my-components/LviPdInfoSection';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';

const { height } = getCombinedStyle('.lviPdInfoSection');

export default class LviPdInfoSection extends LviPdInfoSectionDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return height;
    }
    get productTitle(): string {
        return this.flProductDetailInfoSection.productTitle;
    }
    set productTitle(value: string) {
        this.flProductDetailInfoSection.productTitle = value;
    }
    get productInfo(): string {
        return this.flProductDetailInfoSection.productInfo;
    }
    set productInfo(value: string) {
        this.flProductDetailInfoSection.productInfo = value;
    }
}
