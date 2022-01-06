import FlPdNutritionsDesign from 'generated/my-components/FlPdNutritions';

export default class FlPdNutritions extends FlPdNutritionsDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
