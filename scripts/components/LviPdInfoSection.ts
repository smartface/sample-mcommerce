import LviPdInfoSectionDesign from 'generated/my-components/LviPdInfoSection';

export default class LviPdInfoSection extends LviPdInfoSectionDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
