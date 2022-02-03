import PgGenericSliderDesign from 'generated/pages/pgGenericSlider';

export default function PgGenericSlider(props) {
    return class extends PgGenericSliderDesign {
        constructor() {
            super();
        }
        onShow() {
            super.onShow();
            const { image, url } = props;
            if (url) {
                this.imgSliderItem.loadFromUrl({
                    url,
                    useHTTPCacheControl: true,
                    fade: false
                });
            } else {
                this.imgSliderItem.image = image;
            }
        }
        onLoad() {
            super.onLoad();
        }
    };
}
