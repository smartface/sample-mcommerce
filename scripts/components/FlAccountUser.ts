import View from '@smartface/native/ui/view';
import FlAccountUserDesign from 'generated/my-components/FlAccountUser';
import { getAccessToken } from 'service/token';

export default class FlAccountUser extends FlAccountUserDesign {
    pageName?: string | undefined;
    private __imageUrl: string;
    _value: (...args) => void;
    private __onProfileClick: () => Promise<any>;
    private __onPhotoClick: () => Promise<any>;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.lblAccountEditIcon.on(View.Events.TouchEnded, () => {
            this._value && this._value();
        });
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
    get userImage(): string {
        return this.__imageUrl;
    }
    set userImage(value: string) {
        this.__imageUrl = value;
        this.imgUserAccount.loadFromUrl({
            url: this.__imageUrl,
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
    }
    get onProfileClick(): () => Promise<any> {
        return this.__onProfileClick;
    }
    set onProfileClick(value: () => Promise<any>) {
        this.__onProfileClick = value;
        this.lblAccountEditIcon.onTouchEnded = (isInside) => isInside && value();
    }
    get onPhotoClick(): () => Promise<any> {
        return this.__onPhotoClick;
    }
    set onPhotoClick(value: () => Promise<any>) {
        if (value) {
            this.__onPhotoClick = value;
            this.lblAccountEditIcon.onTouchEnded = (isInside) => isInside && value();
        }
    }
    get onAction(): (...args) => void {
        return this._value;
    }
    set onAction(value: (...args) => void) {
        this._value = value;
    }
}
