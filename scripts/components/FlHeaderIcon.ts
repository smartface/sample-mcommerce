import FlHeaderIconDesign from 'generated/my-components/FlHeaderIcon';

export default class FlHeaderIcon extends FlHeaderIconDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get appName(): string {
        return this.lblHeader.text;
    }
    set appName(value: string) {
        this.lblHeader.text = value;
    }
}
