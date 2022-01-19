import Color from '@smartface/native/ui/color';
import Image from '@smartface/native/ui/image';
import CategoryGridViewItemDesign from 'generated/my-components/CategoryGridViewItem';

export default class CategoryGridViewItem extends CategoryGridViewItemDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get categoryTitle(): string {
        return this.lblCategoryItemTitle.text;
    }
    set categoryTitle(value: string) {
        this.lblCategoryItemTitle.text = value;
    }
    get categoryImage(): string | Image {
        return this.imgCategoryItem.image;
    }
    set categoryImage(value: string | Image) {
        this.imgCategoryItem.image = Image.createFromFile(`images://${value}`);
    }
    get flCategoryItemWrapperBorderColor(): any {
        return this.flCategoryItemWrapper.borderColor;
    }
    set flCategoryItemWrapperBorderColor(value: any) {
        this.flCategoryItemWrapper.borderColor = Color.create(value);
    }
    get flCategoryItemWrapperBackgroundColor(): any {
        return this.flCategoryItemWrapper.backgroundColor;
    }
    set flCategoryItemWrapperBackgroundColor(value: any) {
        this.flCategoryItemWrapper.backgroundColor = Color.create(value);
    }
}
