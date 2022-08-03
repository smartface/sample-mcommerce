import Color from '@smartface/native/ui/color';
import ShimmerFlexLayout from '@smartface/native/ui/shimmerflexlayout';
import { ShimmerHighlight } from '@smartface/native/ui/shimmerflexlayout/shimmerflexlayout';
import CategoryGridViewItemDesign from 'generated/my-components/CategoryGridViewItem';
import { getCategoryImage } from 'service/commerce';

export default class CategoryGridViewItem extends CategoryGridViewItemDesign {
    pageName?: string | undefined;
    private __imageUrl: string;
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
    get imageUrl(): string {
        return this.__imageUrl;
    }
    set imageUrl(categoryId: string) {
        this.__imageUrl = getCategoryImage(categoryId);
        this.imgCategoryItem.loadFromUrl({
            url: this.__imageUrl,
            useHTTPCacheControl: true
        });
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
    startShimmering() {
        this.sflCategoryItem.baseAlpha = 0.5;
        this.sflCategoryItem.android.build(ShimmerHighlight.AlphaHighlight);
        this.sflCategoryItem.startShimmering();
        this.lblCategoryItemTitle.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                backgroundColor: '#D2D2D2'
            }
        });
        this.imgCategoryItem.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                backgroundColor: '#D2D2D2'
            }
        });
    }
    stopShimmering() {
        this.sflCategoryItem.stopShimmering();
        this.lblCategoryItemTitle.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                backgroundColor: 'rgba(0,0,0,0)'
            }
        });
        this.imgCategoryItem.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                backgroundColor: 'rgba(0,0,0,0)'
            }
        });
    }
}
