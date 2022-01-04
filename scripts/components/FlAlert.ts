import FlAlertDesign from 'generated/my-components/FlAlert';

export default class FlAlert extends FlAlertDesign {
    pageName?: string | undefined;
    private __duration: number;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get title(): string {
        return this.lblAlertMessage.text;
    }
    set title(value: string) {
        this.lblAlertMessage.text = value;
    }
}
