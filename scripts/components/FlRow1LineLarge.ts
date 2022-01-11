import pushClassNames from '@smartface/contx/lib/styling/action/pushClassNames';
import Image from '@smartface/native/ui/image';
import FlRow1LineLargeDesign from 'generated/my-components/FlRow1LineLarge';
import setVisibility from 'lib/setVisibility';

export default class FlRow1LineLarge extends FlRow1LineLargeDesign {
    pageName?: string | undefined;
    private __icon: any;
    private __showSeparator: boolean;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get title(): string {
        return this.lblTitle.text;
    }
    set title(value: string) {
        this.lblTitle.text = value;
    }
    get image(): any {
        return this.__icon;
    }
    set image(value: any) {
        this.imgIcon.image = Image.createFromFile(`${(this.__icon = value)}`);
        if (value) {
            this.flImageWrapper.dispatch(pushClassNames('.flRow1LineLarge-flImageWrapper.active'));
            this.lblTitle.dispatch(pushClassNames('.flRow1LineLarge-lblTitle.active'));
        }
    }
    get showSeparator(): boolean {
        return this.__showSeparator;
    }
    set showSeparator(value: boolean) {
        setVisibility(this.seperator, value);
        this.__showSeparator = value;
    }
    // get themeSwitch(): boolean {
    //     return this.__largeSwitch;
    // }
    // set themeSwitch(value: boolean) {
    //     value ? this.setLargeSwitch() : setVisibility(this.flSwitch, false);;
    //     this.__largeSwitch = value;
    // }
}
