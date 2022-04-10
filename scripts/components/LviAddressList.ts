import LviAddressListDesign from 'generated/my-components/LviAddressList';
import { themeService } from 'theme';
const originalHeight = themeService.getStyle('.lviAddressList').height;

export default class LviAddressList extends LviAddressListDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight():number{
        return originalHeight;
    }
    get fullName():string{
        return this.flAddressList.fullName;
    }
    set fullName(value:string){
        this.flAddressList.fullName = value;
    }
    get address():string{
        return this.flAddressList.address;
    }
    set address(value:string){
        this.flAddressList.address = value;
    }
    get title():string{
        return this.flAddressList.title;
    }
    set title(value:string){
        this.flAddressList.title = value;
    }
}
