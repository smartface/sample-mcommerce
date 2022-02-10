import Screen from '@smartface/native/device/screen';
import FlNutritionsDesign from 'generated/my-components/FlNutritions';
import { setTextDimensions } from 'lib/setTextDimensions';
import setVisibility from 'lib/setVisibility';
import { themeService } from 'theme';

const { paddingLeft, paddingRight } = themeService.getNativeStyle('.flNutritions');
const valueMaxWidth = Screen.width - (paddingLeft + paddingRight);
export default class FlNutritions extends FlNutritionsDesign {
    pageName?: string | undefined;
    private __showSeparator: boolean;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get nutritionKey(): string {
        return this.lblKeyOfNutritions.text;
    }
    set nutritionKey(value: string) {
        this.lblKeyOfNutritions.text = `${value}:`;
    }
    get nutritionValue(): string {
        return this.lblValueOfNutritions.text;
    }
    set nutritionValue(value: string) {
        this.lblValueOfNutritions.text = value;
        const { height } = setTextDimensions(value, this.lblValueOfNutritions.font, { maxLines: 0, maxWidth: valueMaxWidth });
        this.lblValueOfNutritions.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                height
            }
        });
    }
}
