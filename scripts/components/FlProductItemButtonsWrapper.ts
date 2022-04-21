import Button from '@smartface/native/ui/button';
import FlProductItemButtonsWrapperDesign from 'generated/my-components/FlProductItemButtonsWrapper';
import setVisibility from 'lib/setVisibility';
import { themeService } from 'theme';

export default class FlProductItemButtonsWrapper extends FlProductItemButtonsWrapperDesign {
    pageName?: string | undefined;
    private _plusClick: (...args) => void;
    private _minusClick: (...args) => void;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.btnPlus.on('press', () => {
            this?._plusClick();
        });
        this.btnMinus.on('press', () => {
            this?._minusClick();
        });
        this.aiMinus.android.zIndex = 99;
        this.aiPlus.android.zIndex = 99;
    }
    set minusTextColor(value: string) {
        const defaultClass = '.flProductItemButtonsWrapper-btnMinus';
        this.btnMinus.dispatch({
            type: 'pushClassNames',
            classNames: defaultClass + value
        });
    }
    set showHideMinusButton(toggle: boolean) {
        setVisibility(this.btnMinus, toggle);
        setVisibility(this.lblCount, toggle);
        this.dispatch({
            type: 'pushClassNames',
            classNames: toggle ? '.flProductItemButtonsWrapper.active' : '.flProductItemButtonsWrapper.inactive'
        });
    }
    toggleIndicatorMinus(toggle: boolean): void {
        setVisibility(this.aiMinus, toggle);
    }
    toggleIndicatorPlus(toggle: boolean): void {
        setVisibility(this.aiPlus, toggle);
    }
    set productCount(value: string) {
        this.lblCount.text = value;
    }
    get productCount(): string {
        return this.lblCount.text;
    }
    get buttonMinusText(): string {
        return this.btnMinus.text;
    }
    set buttonMinusText(value: string) {
        this.btnMinus.text = value;
    }
    get onActionClickPlus(): (...args) => void {
        return this._plusClick;
    }
    set onActionClickPlus(value: (...args) => void) {
        this._plusClick = value;
    }
    get onActionClickMinus(): (...args) => void {
        return this._minusClick;
    }
    set onActionClickMinus(value: (...args) => void) {
        this._minusClick = value;
    }
}
