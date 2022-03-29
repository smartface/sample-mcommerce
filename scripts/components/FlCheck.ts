import ImageView from '@smartface/native/ui/imageview';
import FlCheckDesign from 'generated/my-components/FlCheck';

export default class FlCheck extends FlCheckDesign {
    pageName?: string | undefined;
    private active = false;
    private __onToggleChange: (toggle: boolean) => void;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.onToggleChange = () => (this.toggle = !this.active);
        
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
        if (value) {
            this.dispatch({
                type: 'removeClassName',
                className: '.flCheck.inactive'
            });
            this.imgCheck.dispatch({
                type: 'removeClassName',
                className: '.flCheck-imgCheck.hidden'
            });
            this.active = true;
        } else {
            this.dispatch({
                type: 'pushClassNames',
                classNames: '.flCheck.inactive'
            });
            this.imgCheck.dispatch({
                type: 'pushClassNames',
                classNames: '.flCheck-imgCheck.hidden'
            });
            this.active = false;
        }
    }
}
