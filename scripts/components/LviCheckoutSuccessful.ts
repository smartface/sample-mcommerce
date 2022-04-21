import LviCheckoutSuccessfulDesign from 'generated/my-components/LviCheckoutSuccessful';
import Screen from '@smartface/native/device/screen';
import { IImage } from '@smartface/native/ui/image/image';
export default class LviCheckoutSuccessful extends LviCheckoutSuccessfulDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getScreenHeight(): number {
        return Screen.height / 1.1;
    }
    get image():string | IImage{
        return this.flCheckoutSuccessful.image;
    }
    set image(value:string | IImage){
        this.flCheckoutSuccessful.image = value;
    }
    get title():string{
        return this.flCheckoutSuccessful.title;
    }
    set title(value:string){
        this.flCheckoutSuccessful.title = value;
    }
    get description():string{
        return this.flCheckoutSuccessful.description;
    }
    set description(value:string){
        this.flCheckoutSuccessful.description = value;
    }
    get btnTrackOrderText():string{
        return this.flCheckoutSuccessful.btnTrackOrderText;
    }
    set btnTrackOrderText(value:string){
        this.flCheckoutSuccessful.btnTrackOrderText = value;
    }
    get backHome():string{
        return this.flCheckoutSuccessful.backHome;
    }
    set backHome(value:string){
        this.flCheckoutSuccessful.backHome = value;
    }

}
