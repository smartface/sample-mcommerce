import Color from '@smartface/native/ui/color';
import Image from '@smartface/native/ui/image';
import GviHomeCategoryItemDesign from 'generated/my-components/GviHomeCategoryItem';

export default class GviHomeCategoryItem extends GviHomeCategoryItemDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get categoryImage(): any {
        return this.imgLeft.image;
    }
    set categoryImage(value: any) {
        this.imgLeft.image = `images://${value}`;
    }
    get categoryName() {
        return this.lblCategoryName.text;
    }
    set categoryName(value: string) {
        this.lblCategoryName.text = value;
    }
    get categoryBorderColor(): any {
        return this.flHomeCategoryWrapper.borderColor;
    }
    set categoryBorderColor(value: any) {
        this.flHomeCategoryWrapper.borderColor = Color.create(value);
    }
    get categoryBackgroundColor(): any {
        return this.flHomeCategoryWrapper.backgroundColor;
    }
    set categoryBackgroundColor(value: any) {
        this.flHomeCategoryWrapper.backgroundColor = Color.create(value);
    }
}
