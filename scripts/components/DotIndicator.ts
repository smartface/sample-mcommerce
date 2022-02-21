import DotIndicatorDesign from 'generated/my-components/DotIndicator';
import FlexLayout from '@smartface/native/ui/flexlayout';
import System from '@smartface/native/device/system';
import { themeService } from 'theme';
const PREFIX = 'dot';

export default class DotIndicator extends DotIndicatorDesign {
    pageName?: string | undefined;
    private __dots: StyleContextComponentType<FlexLayout>[];
    private __lastActiveIndex: number;
    private __size: number;
    private __currentIndex: number;
    private __style: {
        activeClassName: string;
        inActiveClassName: string;
    };
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.__dots = [];
        this.__currentIndex = 0;
        this.__size = 2;
        this.__lastActiveIndex = 0;
    }
    get currentIndex(): number {
        return this.__currentIndex;
    }
    set currentIndex(value: number) {
        if (value >= this.__size || value < 0) {
            console.error('currentIndex is out of range');
            return;
        }
        const currentDot = this.__dots[value];
        const lastDot = this.__dots[this.currentIndex];
        lastDot && lastDot.dispatch({ type: 'pushClassNames', classNames: [this.__style.inActiveClassName] });
        currentDot && currentDot.dispatch({ type: 'pushClassNames', classNames: [this.__style.activeClassName] });
        this.__lastActiveIndex = this.currentIndex;
        this.__currentIndex = value;
    }
    set style(value: string) {
        this.__style = {
            activeClassName: `.dotIndicator-dot.${value}.active`,
            inActiveClassName: `.dotIndicator-dot.${value}.inactive`
        };
    }
    get size(): number {
        return this.__size;
    }
    set size(value: number) {
        this.__size = value;
        this.toggleIndicator(this.__size > 1);
        this.__size > 1 && this.setSize(this.__size);
    }
    setSize(newSize: number): void {
        this.removeAll();
        this.__dots.length = 0;
        for (let i = 0; i < newSize; ++i) {
            const dotName = PREFIX + i;
            const d = new FlexLayout();
            this.addChild(d, dotName, `.sf-flexLayout ${this.__style.inActiveClassName}`);
            this.addStyleableChild(d, dotName, `.sf-flexLayout ${this.__style.inActiveClassName}`);
            this.__dots.push(d as StyleContextComponentType<FlexLayout>);
        }
        this.currentIndex = 0;
        System.OS === System.OSType.IOS ? this.getParent().applyLayout() : this.applyLayout();
    }
    toggleIndicator(visible: boolean): void {
        this.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                maxHeight: visible ? null : 0,
                visible
            }
        });
    }
    static getHeight(visible: boolean): number {
        return visible ? themeService.getStyle('.dotIndicator').height || 0 : 0;
    }
}
