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
    get onProfileClick(): () => Promise<any> {
        return this.flAccountUser.onProfileClick;
    }
    set onProfileClick(value: () => Promise<any>) {
        this.flAccountUser.onProfileClick = value;
    }
    get onPhotoClick(): () => Promise<any> {
        return this.flAccountUser.onPhotoClick;
    }
    set onPhotoClick(value: () => Promise<any>) {
        this.flAccountUser.onPhotoClick = value;
    }
    get onAction(): (...args) => void {
        return this.flAccountUser.onAction;
    }
    set onAction(value: (...args) => void) {
        this.flAccountUser.onAction = value;
    }
    static getHeight(): number {
        return originalHeight;
    }
}
