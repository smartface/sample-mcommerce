import PgSignInDesign from 'generated/pages/pgSignIn';
import TextAlignment from '@smartface/native/ui/textalignment';
import TextBox from '@smartface/native/ui/textbox';
import View from '@smartface/native/ui/view';
import KeyboardType from '@smartface/native/ui/keyboardtype';

export default class PgSignIn extends PgSignInDesign {
    router: any
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.tbNumber.on(TextBox.Events.EditBegins, () => {
            this.router.push('/pages/pgNumber')
            // this.imageView1.dispatch({
            //     type: "updateUserStyle",
            //     userStyle: {
            //         visible: false,
            //         flexGrow: 0,
            //     }
            // })
            // this.flexLayout2.dispatch({
            //     type: "updateUserStyle",
            //     userStyle: {
            //         flexGrow: 9,
            //     }
            // })
            // this.flexLayout1.dispatch({
            //     type: "updateUserStyle",
            //     userStyle: {
            //         flexGrow: 3,
            //     }
            // })
        })
        // this.lblFlag.on(View.Events.Touch, () => {
        //     this.router.push('/pages/pgNumber')
        // })
        this.tbNumber.keyboardType = KeyboardType.NUMBER
	}
    initImageView() {
        this.imgTop.rotation = -141
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgSignIn, superOnShow: () => void) {
	superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgSignIn, superOnLoad: () => void) {
	superOnLoad();
    this.initImageView()
}
