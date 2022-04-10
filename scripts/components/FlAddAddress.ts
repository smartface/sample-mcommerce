import FlAddAddressDesign from 'generated/my-components/FlAddAddress';

export default class FlAddAddress extends FlAddAddressDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
