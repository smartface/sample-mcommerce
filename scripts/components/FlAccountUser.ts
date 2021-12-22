import Image from '@smartface/native/ui/image';
import FlAccountUserDesign from 'generated/my-components/FlAccountUser';

export default class FlAccountUser extends FlAccountUserDesign {
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
        this.lblAccountName.text = value
    }
    get userEditIcon(): string {
        return this.lblAccountEditIcon.text;
    }
    set userEditIcon(value: string) {
        this.lblAccountEditIcon.text = value
    }
    get userEmail(): string {
        return this.lblAccountEmail.text;
    }
    set userEmail(value: string) {
        this.lblAccountEmail.text = value
    }
    get userImage(): any {
        return this.imgUserAccount.image;
    }
    set userImage(value: any) {
        this.imgUserAccount.image = Image.createFromFile(`images://${value}`)
    }
    
}
