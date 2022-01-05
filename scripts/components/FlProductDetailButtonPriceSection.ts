import FlProductDetailButtonPriceSectionDesign from 'generated/my-components/FlProductDetailButtonPriceSection';

export default class FlProductDetailButtonPriceSection extends FlProductDetailButtonPriceSectionDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
