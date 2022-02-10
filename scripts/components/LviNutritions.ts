import Screen from '@smartface/native/device/screen';
import LviNutritionsDesign from 'generated/my-components/LviNutritions';
import { setTextDimensions } from 'lib/setTextDimensions';
import { themeService } from 'theme';

const { paddingLeft, paddingRight } = themeService.getNativeStyle('.lviNutritions');
const titleHeight = themeService.getNativeStyle('.flNutritions-lblKeyOfNutritions').height;
const { height: separatorHeight } = themeService.getNativeStyle('.separator');
const { font: lblFont } = themeService.getNativeStyle('.review.lblComment');
const valueMaxWidth = Screen.width - (paddingLeft + paddingRight);
export default class LviNutritions extends LviNutritionsDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    static getHeight(value: string): number {
        const { height: valueHeight } = setTextDimensions(value, lblFont, { maxLines: 0, maxWidth: valueMaxWidth });
        return titleHeight + valueHeight + separatorHeight;
    }
    get nutritionKey(): string {
        return this.flNutritions.nutritionKey;
    }
    set nutritionKey(value: string) {
        this.flNutritions.nutritionKey = value;
    }
    get nutritionValue(): string {
        return this.flNutritions.nutritionValue;
    }
    set nutritionValue(value: string) {
        this.flNutritions.nutritionValue = value;
    }
    get showSeparator(): boolean {
        return this.flNutritions.showSeparator;
    }
    set showSeparator(value: boolean) {
        this.flNutritions.showSeparator = value;
    }
}
