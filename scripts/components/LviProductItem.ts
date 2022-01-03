import LviProductItemDesign from 'generated/my-components/LviProductItem';

export default class LviProductItem extends LviProductItemDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
