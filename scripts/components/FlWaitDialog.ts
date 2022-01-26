import FlWaitDialogDesign from 'generated/my-components/FlWaitDialog';

export default class FlWaitDialog extends FlWaitDialogDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
