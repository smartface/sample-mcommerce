import LviNoAdressDesign from 'generated/my-components/LviNoAdress';
import Image from '@smartface/native/ui/image';
import Screen from '@smartface/native/device/screen';
import { themeService } from 'theme';

export default class LviNoAdress extends LviNoAdressDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return themeService.getStyle(`.lviNoAddress`).height || 0;
    }
    static getScreenHeightDivide2(): number {
        return Screen.height / 1.5;
    }
    get title():string{
        return this.flNoAddress.title;
    }
    set title(value:string){
        this.flNoAddress.title = value;
    }
    get image():string | Image{
        return this.flNoAddress.image;
    }
    set image(value:string | Image){
        this.flNoAddress.image = value;
    }
    get buttonText():string{
        return this.flNoAddress.buttonText;
    }
    set buttonText(value:string){
        this.flNoAddress.buttonText = value;
    }
}
