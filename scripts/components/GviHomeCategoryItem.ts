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
        return this.flHomeCategory.categoryImage;
    }
    set categoryImage(value: any) {
        this.flHomeCategory.categoryImage = `images://${value}`;
    }
    get categoryName() {
        return this.flHomeCategory.categoryName;
    }
    set categoryName(value: string) {
        this.flHomeCategory.categoryName = value;
    }
    get categoryBorderColor(): any {
        return this.flHomeCategory.borderColor;
    }
    set categoryBorderColor(value: any) {
        this.flHomeCategory.borderColor = Color.create(value);
    }
    get categoryBackgroundColor(): any {
        return this.flHomeCategory.backgroundColor;
    }
    set categoryBackgroundColor(value: any) {
        this.flHomeCategory.backgroundColor = Color.create(value);
    }
}
