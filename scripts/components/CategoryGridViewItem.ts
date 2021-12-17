import CategoryGridViewItemDesign from 'generated/my-components/CategoryGridViewItem';

export default class CategoryGridViewItem extends CategoryGridViewItemDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
