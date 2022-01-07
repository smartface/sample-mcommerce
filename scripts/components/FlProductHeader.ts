import FlProductHeaderDesign from 'generated/my-components/FlProductHeader';

export default class FlProductHeader extends FlProductHeaderDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
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
}
