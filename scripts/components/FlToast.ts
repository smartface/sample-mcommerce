import Screen from '@smartface/native/device/screen';
import { HALF_OF_SCREEN_HEIGHT, TOAST_DEFAULT_ANIMATION_DURATION, TOAST_OPEN_HIDE_DURATION } from 'constants';
import FlToastDesign from 'generated/my-components/FlToast';
import { hideToastAnimation, showToastAnimation } from 'lib/animation';
import { themeService } from 'theme';

const { height: containerHeight } = themeService.getNativeStyle('.flToast');

export default class FlToast extends FlToastDesign {
    pageName?: string | undefined;
    private __duration: number;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }
    get title(): string {
        return this.lblText.text;
    }
    set title(value: string) {
        this.lblText.text = value;
    }
    get duration(): number {
        return this.__duration || TOAST_DEFAULT_ANIMATION_DURATION;
    }
    set duration(value: number) {
        this.__duration = value;
    }
    show() {
        return new Promise<void>((resolve) => {
            showToastAnimation(this.getParent(), this, TOAST_OPEN_HIDE_DURATION, HALF_OF_SCREEN_HEIGHT);
            setTimeout(() => this.hide().then(() => resolve()), this.duration);
        });
    }
    private hide() {
        return new Promise<void>((resolve) => {
            hideToastAnimation(this.getParent(), this, TOAST_OPEN_HIDE_DURATION, -(containerHeight + HALF_OF_SCREEN_HEIGHT));
            setTimeout(() => resolve(), this.duration);
        });
    }
}
