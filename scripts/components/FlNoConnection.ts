import FlNoConnectionDesign from 'generated/my-components/FlNoConnection';

export default class FlNoConnection extends FlNoConnectionDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
