import FlAddressListDesign from 'generated/my-components/FlAddressList';

export default class FlAddressList extends FlAddressListDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get fullName():string{
        return this.lblFullName.text;
    }
    set fullName(value:string){
        this.lblFullName.text = value;
    }
    get address():string{
        return this.lblAddress.text;
    }
    set address(value:string){
        this.lblAddress.text = value;
    }
    get title():string{
        return this.lblTitle.text;
    }
    set title(value:string){
        this.lblTitle.text = value;
    }
}
