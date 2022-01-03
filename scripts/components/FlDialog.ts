import FlDialogDesign from 'generated/my-components/FlDialog';

export default class FlDialog extends FlDialogDesign {
    pageName?: string | undefined;
    private __denyClick: () => void;
    private __acceptClick: () => void;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get dialogTitle(): string {
        return this.lblDialogTitle.text;
    }
    set dialogTitle(value: string) {
        this.lblDialogTitle.text = value;
    }
    get btnAcceptTitle(): string {
        return this.btnDialogAccept.text;
    }
    set btnAcceptTitle(value: string) {
        this.btnDialogAccept.text = value || 'Yess';
    }
    get btnDenyTitle(): string {
        return this.btnDialogDeny.text;
    }
    set btnDenyTitle(value: string) {
        this.btnDialogDeny.text = value || 'No';
    }
    get denyClick(): () => void {
        return this.__denyClick;
    }
    set denyClick(value: () => void) {
        this.__denyClick = value;
        this.btnDialogDeny.onPress = value;
    }
    get acceptClick(): () => void {
        return this.__acceptClick;
    }
    set acceptClick(value: () => void) {
        this.__acceptClick = value;
        this.btnDialogAccept.onPress = value;
    }
}
