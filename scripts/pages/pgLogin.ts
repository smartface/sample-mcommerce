import PgLoginDesign from 'generated/pages/pgLogin';
import ImageView from '@smartface/native/ui/imageview';

export default class PgLogin extends PgLoginDesign {
	constructor() {
        imgShow: ImageView
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        // this.imgShow = new ImageView({
        //     height: 20,
        //     image: "images://eye.png",
        //     imageFillType: ImageView.FillType.ASPECTFIT
        // });
	}
    initMaterialTextBoxes() {
        

        this.mtbLogin.options = {
            hint: "Email"
        };
        this.mtbPassword.options = {
            hint: "Password"
        };
        this.mtbPassword.materialTextBox.isPassword = true;

        //this.mtbPassword.rightLayout = { view: this.imgShow, width: 30 };
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgLogin, superOnShow: () => void) {
	superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgLogin, superOnLoad: () => void) {
	superOnLoad();
    this.initMaterialTextBoxes();
}
