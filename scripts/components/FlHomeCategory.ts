import Image from '@smartface/native/ui/image';
import FlHomeCategoryDesign from 'generated/my-components/FlHomeCategory';

export default class FlHomeCategory extends FlHomeCategoryDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get categoryImage() {
        return this.imgLeft.image;
    }
    set categoryImage(value: string | Image) {
        this.imgLeft.image = value;
    }
    get categoryName() {
        return this.lblCategoryName.text;
    }
    set categoryName(value: string) {
        this.lblCategoryName.text = value;
    }
}
