import LviLoginDesign from 'generated/my-components/LviLogin';
import { BaseRouter as Router } from '@smartface/router';
import Screen from '@smartface/native/device/screen';

const originalHeight = Screen.height;
export default class LviLogin extends LviLoginDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        
    }
    static getHeight(){
        return originalHeight;
    }
    get router():Router{
        return this.flLogin.router;
    }
    set router(value:Router){
        this.flLogin.router = value;
    }
}
