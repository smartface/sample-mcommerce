import PgHomeSliderDesign from 'generated/pages/pgHomeSlider';

export default function PgHomeSlider(props) {
    return class extends PgHomeSliderDesign {
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
