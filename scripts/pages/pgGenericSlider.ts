import PgGenericSliderDesign from 'generated/pages/pgGenericSlider';

export default function PgGenericSlider(props) {
    return class extends PgGenericSliderDesign {
        constructor() {
            super();
        }
        onShow() {
            super.onShow();
            const { image, url, urlForProduct } = props;
            if (url) {
                this.imgSliderItem.loadFromUrl({
                    url,
                    useHTTPCacheControl: true,
                    fade: true
                });
            } else if (urlForProduct) {
                this.imgSliderItem.loadFromUrl({
                    url: urlForProduct,
                    useHTTPCacheControl: true,
                    fade: true
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
