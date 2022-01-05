import FlProductDetailInfoSectionDesign from 'generated/my-components/FlProductDetailInfoSection';

export default class FlProductDetailInfoSection extends FlProductDetailInfoSectionDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
