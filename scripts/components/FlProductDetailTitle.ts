import FlProductDetailTitleDesign from 'generated/my-components/FlProductDetailTitleSection';

export default class FlProductDetailTitle extends FlProductDetailTitleDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
}
