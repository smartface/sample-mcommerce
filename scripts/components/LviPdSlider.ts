import LviPdSliderDesign from 'generated/my-components/LviPdSlider';

export default class LviPdSlider extends LviPdSliderDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
