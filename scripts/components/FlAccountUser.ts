import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import FlAccountUserDesign from 'generated/my-components/FlAccountUser';

export default class FlAccountUser extends FlAccountUserDesign {
    pageName?: string | undefined;
    _value: (...args) => void;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
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
    get userImage(): any {
        return this.imgUserAccount.image;
    }
    set userImage(value: any) {
        this.imgUserAccount.image = Image.createFromFile(`images://${value}`);
    }
    get onAction(): (...args) => void {
        return this._value;
    }
    set onAction(value: (...args) => void) {
        this._value = value;
    }
}
