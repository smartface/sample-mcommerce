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
        return this.flAccountUser.userName;
    }
    set userName(value: string) {
        this.flAccountUser.userName = value;
    }
    get userEditIcon(): string {
        return this.flAccountUser.userEditIcon;
    }
    set userEditIcon(value: string) {
        this.flAccountUser.userEditIcon = value;
    }
    get userEmail(): string {
        return this.flAccountUser.userEmail;
    }
    set userEmail(value: string) {
        this.flAccountUser.userEmail = value;
    }
    get userImage(): any {
        return this.flAccountUser.userImage.image;
    }
    set userImage(value: any) {
        this.flAccountUser.userImage = value;
    }
    static getHeight(): number {
        return originalHeight;
    }
}
