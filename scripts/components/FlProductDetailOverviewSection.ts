import FlProductDetailOverviewSectionDesign from 'generated/my-components/FlProductDetailOverviewSection';

export default class FlProductDetailOverviewSection extends FlProductDetailOverviewSectionDesign {
    private __onArrowClick: () => void;

    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get overviewTitle(): string {
        return this.lblOverviewTitle.text;
    }
    set overviewTitle(value: string) {
        this.lblOverviewTitle.text = value;
    }
    get onArrowClick(): () => void {
        return this.__onArrowClick;
    }
    set onArrowClick(value: () => void) {
        this.__onArrowClick = value;
        this.imgRouteArrow.onTouchEnded = value;
    }
}
