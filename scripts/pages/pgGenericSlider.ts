import PgGenericSliderDesign from 'generated/pages/pgGenericSlider';

export default function PgGenericSlider(props) {
    return class extends PgGenericSliderDesign {
        constructor() {
            super();
        }
        onShow() {
            super.onShow();
            const { image } = props;
            this.imgSliderItem.image = image;
        }
        onLoad() {
            super.onLoad();
        }
    };
}
