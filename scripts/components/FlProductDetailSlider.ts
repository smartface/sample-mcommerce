import System from '@smartface/native/device/system';
import SwipeView from '@smartface/native/ui/swipeview';
import FlProductDetailSliderDesign from 'generated/my-components/FlProductDetailSlider';
import PgProductDetailSlider from 'pages/pgProductDetailSlider';

export default class FlProductDetailSlider extends FlProductDetailSliderDesign {
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
            pages: this.images.map((image: string) => PgProductDetailSlider({ image })),
            onPageSelected: (index: number) => {
                console.log('index', index);
                // this.indicatorCurrentIndex = index;
            }
        });
        this.flSwipeViewLayout.addChild(swipeView, 'swipeView', '.grow-relative');
        if (System.OS === System.OSType.IOS) {
            this.flSwipeViewLayout.applyLayout();
        }
    }
}
