import GviProductItemDesign from 'generated/my-components/GviProductItem';

export default class GviProductItem extends GviProductItemDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
