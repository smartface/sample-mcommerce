import Screen from '@smartface/native/device/screen';
import LviGenericSliderDesign from 'generated/my-components/LviGenericSlider';
import { themeService } from 'theme';
const originalHeight = themeService.getStyle('.lviGenericSlider').height;

export default class LviGenericSlider extends LviGenericSliderDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get images(): string[] {
        return this.flGenericSlider.images;
    }
    set images(value: string[]) {
        this.flGenericSlider.images = value;
    }
    static calculateHeightWithAspectRatio(aspectRatio: number = 1, margin: number = 0) {
        return (Screen.width - margin) / aspectRatio;
    }
    static getHeight(opts: { className?: string; height?: number } = {}) {
        const { className, height } = opts;
        if (height) {
            return height;
        } else if (className) {
            return themeService.getStyle(className).height;
        } else {
            return originalHeight;
        }
    }
}
