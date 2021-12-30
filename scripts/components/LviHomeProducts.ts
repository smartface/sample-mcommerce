import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import LviHomeProductsDesign from 'generated/my-components/LviHomeProducts';
const originalHeight = getCombinedStyle('.lviHomeProducts').height;

export default class LviHomeProducts extends LviHomeProductsDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
  static getHeight(): number {
    return originalHeight;
  }
  get showcaseTitle(): string {
    return this.lblTitle.text;
  }
  set showcaseTitle(value: string) {
    this.lblTitle.text = value;
  }
  get showcaseLinkText(): string {
    return this.lblSeeAll.text;
  }
  set showcaseLinkText(value: string) {
    this.lblSeeAll.text = value;
  }
}
