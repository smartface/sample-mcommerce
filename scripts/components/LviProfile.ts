import Image from '@smartface/native/ui/image';
import LviProfileDesign from 'generated/my-components/LviProfile';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import store from 'store/index';
const originalHeight = getCombinedStyle('.lviProfile').height;

export default class LviProfile extends LviProfileDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get userName(): string {
        return this.lblAccountName.text;
    }
    set userName(value: string) {
        this.lblAccountName.text = value;
    }
    get userEditIcon(): string {
        return this.lblAccountEditIcon.text;
    }
    set userEditIcon(value: string) {
        this.lblAccountEditIcon.text = value;
    }
    get userEmail(): string {
        return this.lblAccountEmail.text;
    }
    set userEmail(value: string) {
        this.lblAccountEmail.text = value;
    }
    get userImage(): any {
        return this.imgUserAccount.image;
    }
    set userImage(value: any) {
        this.imgUserAccount.image = `images://${value}`;
    }
    static getHeight(): number {
        return originalHeight;
    }
}
