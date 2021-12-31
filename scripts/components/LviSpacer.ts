import LviSpacerDesign from 'generated/my-components/LviSpacer';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import pushClassNames from '@smartface/contx/lib/styling/action/pushClassNames';
import { setID } from 'lib/testAutomation';

export default class LviSpacer extends LviSpacerDesign {
    private __className: string;
    private __backgroundColorClass: string;
    private __ID: string;
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get className(): string {
        return this.__className;
    }
    set className(value: string) {
        this.__className = value;
        this.dispatch(pushClassNames([value]));
    }
    get backgroundColorClass(): string {
        return this.__backgroundColorClass;
    }
    set backgroundColorClass(value: string) {
        this.__backgroundColorClass = value;
        this.dispatch(pushClassNames([`.lviSpacer-backgroundColors.${value}`]));
    }
    set ID(value: string) {
        setID(this, (this.__ID = value));
    }
    static getHeight(className: string): number {
        return getCombinedStyle(`.lviSpacer.${className}`).height || 0;
    }
}
