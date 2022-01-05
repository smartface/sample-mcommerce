import PgProductDetailSliderDesign from 'generated/pages/pgProductDetailSlider';

export default function PgProductDetailSlider(props) {
    return class extends PgProductDetailSliderDesign {
        private __indicating = false;
        constructor() {
            super();
            this.onShow = onShow.bind(this, this.onShow.bind(this), props);
            this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        }
    };
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: InstanceType<ReturnType<typeof PgProductDetailSlider>>, superOnShow: () => void, props: any) {
    superOnShow();
    const { image } = props;
    this.imgProductDetailSlider.image = image;
}

async function onLoad(this: InstanceType<ReturnType<typeof PgProductDetailSlider>>, superOnLoad: () => void) {
    superOnLoad();
}
