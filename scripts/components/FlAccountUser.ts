import FlAccountUserDesign from 'generated/my-components/FlAccountUser';

export default class FlAccountUser extends FlAccountUserDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
