import LviSpacerDesign from 'generated/my-components/LviSpacer';
import { themeService } from 'theme';
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
        this.dispatch({
            type: 'pushClassNames',
            classNames: `.${value}`
        });
    }
    get backgroundColorClass(): string {
        return this.__backgroundColorClass;
    }
    set backgroundColorClass(value: string) {
        this.__backgroundColorClass = value;
        this.dispatch({
            type: 'pushClassNames',
            classNames: `.lviSpacer-backgroundColors.${value}`
        });
    }
    set ID(value: string) {
        setID(this, (this.__ID = value));
    }
    static getHeight(className: string): number {
        return themeService.getStyle(`.lviSpacer.${className}`).height || 0;
    }
}
