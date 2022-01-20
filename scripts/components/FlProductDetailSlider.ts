import FlProductDetailSliderDesign from 'generated/my-components/FlProductDetailSlider';

export default class FlProductDetailSlider extends FlProductDetailSliderDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
