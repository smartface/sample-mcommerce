import LviPdSliderDesign from 'generated/my-components/LviPdSlider';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';

const { height } = getCombinedStyle('.lviProductDetailSlider');
export default class LviPdSlider extends LviPdSliderDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return height;
    }
    get images(): string[] {
        return this.flProductDetailSlider.images;
    }
    set images(value: string[]) {
        this.flProductDetailSlider.images = value;
    }
}
