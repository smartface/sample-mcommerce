import FlProductItemDesign from 'generated/my-components/FlProductItem';

export default class FlProductItem extends FlProductItemDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
