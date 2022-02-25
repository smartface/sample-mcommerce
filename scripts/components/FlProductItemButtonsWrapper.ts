import Button from '@smartface/native/ui/button';
import FlProductItemButtonsWrapperDesign from 'generated/my-components/FlProductItemButtonsWrapper';
import setVisibility from 'lib/setVisibility';
import { themeService } from 'theme';

export default class FlProductItemButtonsWrapper extends FlProductItemButtonsWrapperDesign {
    pageName?: string | undefined;
    _valuePlus: (...args) => void;
    _valueMinus: (...args) => void;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.btnPlus.on(Button.Events.Press, () => {
            this._valuePlus && this._valuePlus();
        });
        this.btnMinus.on(Button.Events.Press, () => {
            this._valueMinus && this._valueMinus();
        });
        this.aiMinus.android.zIndex = 99;
        this.aiPlus.android.zIndex = 99;
    }
    showHideMinusButton(toggle: boolean): void {
        setVisibility(this.btnMinus, toggle);
        setVisibility(this.lblCount, toggle);
        if (toggle) {
            this.dispatch({
                type: 'pushClassNames',
                classNames: '.flProductItemButtonsWrapper.active'
            });
        } else {
            this.dispatch({
                type: 'removeClassName',
                className: '.flProductItemButtonsWrapper.active'
            });
        }
    }
    toggleIndicatorMinus(toggle: boolean): void {
        setVisibility(this.aiMinus, toggle);
    }
    toggleIndicatorPlus(toggle: boolean): void {
        setVisibility(this.aiPlus, toggle);
    }
    get buttonMinusText(): string {
        return this.btnMinus.text;
    }
    set buttonMinusText(value: string) {
        this.btnMinus.text = value;
    }
    set productCount(value: string) {
        this.lblCount.text = value;
    }
    get productCount(): string {
        return this.lblCount.text;
    }
    get onActionClickPlus(): (...args) => void {
        return this._valuePlus;
    }
    set onActionClickPlus(value: (...args) => void) {
        this._valuePlus = value;
    }
    get onActionClickMinus(): (...args) => void {
        return this._valueMinus;
    }
    set onActionClickMinus(value: (...args) => void) {
        this._valueMinus = value;
    }
}
