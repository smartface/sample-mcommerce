import FlProductDetailTitleSectionDesign from 'generated/my-components/FlProductDetailTitleSection';

export default class FlProductDetailTitleSection extends FlProductDetailTitleSectionDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
