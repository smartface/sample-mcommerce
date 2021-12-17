import FlProductItem_1Design from 'generated/my-components/FlProductItem_1';

export default class FlProductItem_1 extends FlProductItem_1Design {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
