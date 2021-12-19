import LviFavoritesDesign from 'generated/my-components/LviFavorites';

export default class LviFavorites extends LviFavoritesDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
