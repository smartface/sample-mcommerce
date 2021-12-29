import FlProductContainerDesign from 'generated/my-components/FlProductContainer';

export default class FlProductContainer extends FlProductContainerDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
  get title(): string {
    return this.lblTitle.text;
  }
  set title(value: string) {
    this.lblTitle.text = value;
  }
  get seeAll(): string {
    return this.lblSeeAll.text;
  }
  set seeAll(value: string) {
    this.lblSeeAll.text = value;
  }
}
