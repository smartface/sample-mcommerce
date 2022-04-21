import LviSignupDesign from 'generated/my-components/LviSignup';
import { Router } from '@smartface/router';
import Screen from '@smartface/native/device/screen';

const originalHeight = Screen.height;
export default class LviSignup extends LviSignupDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight():number{
        return originalHeight*1.1;
    }
    get router():Router{
        return this.flSignup.router;
    }
    set router(value:Router){
        this.flSignup.router = value;
    }
    
}
