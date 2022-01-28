import FlHomeCategoryDesign from 'generated/my-components/FlHomeCategory';

export default class FlHomeCategory extends FlHomeCategoryDesign {
    pageName?: string | undefined;
    private __imageUrl: string;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get categoryImage() {
        return this.__imageUrl;
    }
    set categoryImage(value: string) {
        this.__imageUrl = value;
        this.imgLeft.loadFromUrl({
            url: this.__imageUrl,
            useHTTPCacheControl: true
        });
    }
    get categoryName() {
        return this.lblCategoryName.text;
    }
    set categoryName(value: string) {
        this.lblCategoryName.text = value;
    }
}
