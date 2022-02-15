import Application from '@smartface/native/application';
import FlSmartfaceDesign from 'generated/my-components/FlSmartface';

export default class FlSmartface extends FlSmartfaceDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.lblVersion.text = `v${Application.version}`;
    }
}
