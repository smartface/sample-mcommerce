import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import FlCheckoutSuccessfulDesign from 'generated/my-components/FlCheckoutSuccessful';
import router from 'routes';

export default class FlCheckoutSuccessful extends FlCheckoutSuccessfulDesign {
    pageName?: string | undefined;
    
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.lblHome.on(View.Events.TouchEnded, () => {
            router.push('/btb')
        });
    }
    get image(): string | Image {
        return this.imgSuccess.image;
    }
    set image(value: string | Image) {
        this.imgSuccess.image = value;
    }
    get title(): string {
        return this.lblTitle.text;
    }
    set title(value: string) {
        this.lblTitle.text = value;
    }
    get description(): string {
        return this.lblDescription.text;
    }
    set description(value: string) {
        this.lblDescription.text = value;
    }
    get btnTrackOrderText(): string {
        return this.btnTrackOrder.text;
    }
    set btnTrackOrderText(value: string) {
        this.btnTrackOrder.text = value;
    }
    get backHome(): string {
        return this.lblHome.text;
    }
    set backHome(value: string) {
        this.lblHome.text = value;
    }

}
