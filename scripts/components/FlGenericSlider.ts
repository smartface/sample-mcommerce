import System from '@smartface/native/device/system';
import SwipeView from '@smartface/native/ui/swipeview';
import FlGenericSliderDesign from 'generated/my-components/FlGenericSlider';
import pgGenericSlider from 'pages/pgGenericSlider';
import { getBannerImage, getProductImageUrl } from 'service/commerce';

export default class FlGenericSlider extends FlGenericSliderDesign {
    pageName?: string | undefined;
    private __images: string[];
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get images(): string[] {
        return this.__images;
    }
    set images(value: string[]) {
        this.__images = value;
        this.initSlider();
    }
    private initSlider() {
        this.flSwipeViewLayout.removeAll();
        const swipeView = new SwipeView({
            page: this,
            flexGrow: 1,
            pages: this.images.map((image: string) => pgGenericSlider({ url: image })),
            onPageSelected: (index: number) => {}
        });
        this.flSwipeViewLayout.addChild(swipeView, 'swipeView', '.grow-relative');
        if (System.OS === System.OSType.IOS) {
            this.flSwipeViewLayout.applyLayout();
        }
    }
}
