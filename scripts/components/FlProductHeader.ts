import { touchSupported } from '@smartface/native/device/screen';
import View from '@smartface/native/ui/view';
import FlProductHeaderDesign from 'generated/my-components/FlProductHeader';

export default class FlProductHeader extends FlProductHeaderDesign {
    pageName?: string | undefined;
    _onSeeAllClick: (...args) => void;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.lblSeeAll.on(View.Events.TouchEnded, () => {
            this._onSeeAllClick && this._onSeeAllClick();
        });
    }
    get showcaseTitle(): string {
        return this.lblTitle.text;
    }
    set showcaseTitle(value: string) {
        this.lblTitle.text = value;
    }
    get showcaseLinkText(): string {
        return this.lblSeeAll.text;
    }
    set showcaseLinkText(value: string) {
        this.lblSeeAll.text = value;
    }
    get onSeeAllClick(): (...args) => void {
        return this._onSeeAllClick;
    }
    set onSeeAllClick(value: (...args) => void) {
        this._onSeeAllClick = value;
    }
}
