import Button from '@smartface/native/ui/button';
import Image from '@smartface/native/ui/image';
import FlNoAddressDesign from 'generated/my-components/FlNoAddress';
import router from 'routes';

export default class FlNoAddress extends FlNoAddressDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.btnAddAddress.on(Button.Events.Press, ()=>{
            router.push('/btb/tab5/addAddress')
        })
    }
    get title():string{
        return this.lblTitle.text;
    }
    set title(value:string){
        this.lblTitle.text = value;
    }
    get image():string | Image{
        return this.imgIcon.image;
    }
    set image(value: string | Image){
        this.imgIcon.image = value;
    }
    get buttonText():string{
        return this.btnAddAddress.text;
    }
    set buttonText(value: string){
        this.btnAddAddress.text = value;
    }
}