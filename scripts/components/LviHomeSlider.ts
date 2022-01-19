import { themeService } from 'theme';
import LviHomeSliderDesign from 'generated/my-components/LviHomeSlider';

const { height } = themeService.getStyle('.lviHomeSlider');

export default class LviHomeSlider extends LviHomeSliderDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get images(): string[] {
        return this.flHomeSlider.images;
    }
    set images(value: string[]) {
        this.flHomeSlider.images = value;
    }
    static getHeight() {
        return height;
    }
}
