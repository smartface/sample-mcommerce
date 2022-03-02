import ImageView from '@smartface/native/ui/imageview';
import FlCheckDesign from 'generated/my-components/FlCheck';
import setVisibility from 'lib/setVisibility';

export default class FlCheck extends FlCheckDesign {
    pageName?: string | undefined;
    private active = false;
    private __onToggleChange: (toggle: boolean) => void;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.onToggleChange = () => (this.toggle = !this.active);
        this.imgCheck.on(ImageView.Events.TouchEnded, (value) => {
            this.__onToggleChange && this.__onToggleChange(value);
        });
    }
    get toggle(): boolean {
        return this.active;
    }
    set toggle(value: boolean) {
        this.toggleActiveInActive(value);
    }
    get onToggleChange(): (toggle: boolean) => void {
        return this.__onToggleChange;
    }
    set onToggleChange(value: (toggle: boolean) => void) {
        this.__onToggleChange = value;
    }
    private toggleActiveInActive(value: boolean) {
        setVisibility(this.imgCheck, value);
        if (value) {
            this.dispatch({
                type: 'removeClassName',
                className: '.flCheck.inactive'
            });
            this.active = true;
        } else {
            this.dispatch({
                type: 'pushClassNames',
                classNames: '.flCheck.inactive'
            });
            this.active = false;
        }
        this.applyLayout();
    }
}
