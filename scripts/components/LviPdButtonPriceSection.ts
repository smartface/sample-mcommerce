import LviPdButtonPriceSectionDesign from 'generated/my-components/LviPdButtonPriceSection';

export default class LviPdButtonPriceSection extends LviPdButtonPriceSectionDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
