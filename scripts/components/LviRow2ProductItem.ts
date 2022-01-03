import LviRow2ProductItemDesign from 'generated/my-components/LviRow2ProductItem';

export default class LviRow2ProductItem extends LviRow2ProductItemDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
