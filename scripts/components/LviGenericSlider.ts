import LviGenericSliderDesign from 'generated/my-components/LviGenericSlider';
import { themeService } from 'theme';
const height = themeService.getStyle('.lviGenericSlider').height;
export default class LviGenericSlider extends LviGenericSliderDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get images(): string[] {
        return this.flGenericSlider.images;
    }
    set images(value: string[]) {
        this.flGenericSlider.images = value;
    }
    static getHeight(className?: string) {
        if (className) {
            return themeService.getStyle(className).height;
        } else {
            return height;
        }
    }
}
