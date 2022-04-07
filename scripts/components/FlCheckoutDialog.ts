import FlCheckoutDialogDesign from 'generated/my-components/FlCheckoutDialog';

export default class FlCheckoutDialog extends FlCheckoutDialogDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
}
