import LviPdTitleLikeSectionDesign from 'generated/my-components/LviPdTitleLikeSection';

export default class LviPdTitleLikeSection extends LviPdTitleLikeSectionDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
