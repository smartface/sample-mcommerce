import PgHomeSliderDesign from 'generated/pages/pgHomeSlider';

export default function PgHomeSlider(props) {
    return class extends PgHomeSliderDesign {
        private __indicating = false;
        constructor() {
            super();
            this.onShow = onShow.bind(this, this.onShow.bind(this), props);
            this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        }
    };
}

function onShow(this: InstanceType<ReturnType<typeof PgHomeSlider>>, superOnShow: () => void, props: any) {
    superOnShow();
    const { image } = props;
    this.imgSliderItem.image = image;
}

async function onLoad(this: InstanceType<ReturnType<typeof PgHomeSlider>>, superOnLoad: () => void) {
    superOnLoad();
}
