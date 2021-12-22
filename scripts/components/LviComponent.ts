import LviComponentDesign from 'generated/my-components/LviComponent';

export default class LviComponent extends LviComponentDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
