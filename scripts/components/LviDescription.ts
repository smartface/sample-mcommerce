import LviDescriptionDesign from 'generated/my-components/LviDescription';
import { setTextDimensions } from 'lib/setTextDimensions';
import { themeService } from 'theme';

const { font: tvFont } = themeService.getNativeStyle('.review.lblComment');
const tvHeight = themeService.getNativeStyle('.pgProductDescription-tvDescription').height;
const { paddingTop, paddingBottom } = themeService.getNativeStyle('.paddingVertical');

export default class LviDescription extends LviDescriptionDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    static getHeight(opt?: { text: string }) {
        return setTextDimensions(opt.text, tvFont, {}).height + paddingTop + paddingBottom;
    }
    get description(): string {
        return this.tvDescription.text;
    }
    set description(value: string) {
        this.tvDescription.text = value;
    }
}
