import LviCheckoutDesign from 'generated/my-components/LviCheckout';
import { themeService } from 'theme';
const originalHeight = themeService.getStyle('.lviCheckout').height;
export default class LviCheckout extends LviCheckoutDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return originalHeight;
    }
    get title():string{
        return this.lblTitle.text;
    }
    set title(value:string){
        this.lblTitle.text = value;
    }
    get description():string{
        return this.lblDescription.text;
    }
    set description(value:string){
        this.lblDescription.text = value
    }

}
