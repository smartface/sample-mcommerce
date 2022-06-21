import Screen from '@smartface/native/device/screen';
import ShimmerFlexLayout from '@smartface/native/ui/shimmerflexlayout';
import { ShimmerHighlight } from '@smartface/native/ui/shimmerflexlayout/shimmerflexlayout';
import LviGenericSliderDesign from 'generated/my-components/LviGenericSlider';
import { themeService } from 'theme';
const originalHeight = themeService.getStyle('.lviGenericSlider').height;

export default class LviGenericSlider extends LviGenericSliderDesign {
  pageName?: string | undefined;
  private __initialized: boolean;

  constructor(props?: any, pageName?: string) {
    super(props);
    this.pageName = pageName;
  }
  get initialized(): boolean {
    return this.__initialized;
  }
  set initialized(value: boolean) {
    this.__initialized = value;
  }
  get images(): string[] {
    return this.flGenericSlider.images;
  }
  set images(value: string[]) {
    this.initialized ? this.stopShimmering() : this.startShimmering();
    this.flGenericSlider.images = value;
  }
  static calculateHeightWithAspectRatio(aspectRatio: number = 1, margin: number = 0) {
    return (Screen.width - margin) / aspectRatio;
  }
  static getHeight(opts: { className?: string; height?: number } = {}) {
    const { className, height } = opts;
    if (height) {
      return height;
    } else if (className) {
      return themeService.getStyle(className).height;
    } else {
      return originalHeight;
    }
  }

  private startShimmering() {
    this.sflGenericSlider.baseAlpha = 0.5;
    this.sflGenericSlider.android.build(ShimmerHighlight.AlphaHighlight);

    this.sflGenericSlider.startShimmering();
    this.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        backgroundColor: '#D2D2D2'
      }
    });
  }
  private stopShimmering() {
    this.sflGenericSlider.stopShimmering();
    this.dispatch({
      type: 'updateUserStyle',
      userStyle: {
        backgroundColor: 'rgba(0,0,0,0)'
      }
    });
  }
}
