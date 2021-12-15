import PgSignUpDesign from 'generated/pages/pgSignUp';
import Color from '@smartface/native/ui/color';
import View from '@smartface/native/ui/view';

export default class PgSignUp extends PgSignUpDesign {
    router: any
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.label5.on(View.Events.Touch, () => {
            this.router.push("/pages/pgLogin")
        })
	}
    initMaterialTextBoxes() {
        this.mtbUsername.options = {
            hint: "Username",
            text: "smartface"
        };
        this.mtbEmail.options = {
            hint: "Email",
            text: "username@smartface.io"
        };
        this.mtbPassword.options = {
            hint: "Password",
            text: "●●●●●●●"
        };
        this.mtbPassword.materialTextBox.isPassword = true;

        // this.mtbUsername.dispatch({
        //     type: "updateUserStyle",
        //         userStyle: {
        //             lineColor: {
        //                 normal: Color.GREEN,
        //                 selected: Color.RED
        //             }
        //         }
        // })
        //this.mtbPassword.rightLayout = { view: this.imgShow, width: 30 };
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgSignUp, superOnShow: () => void) {
	superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgSignUp, superOnLoad: () => void) {
	superOnLoad();
    this.initMaterialTextBoxes();
}
