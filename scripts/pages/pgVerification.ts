import KeyboardType from '@smartface/native/ui/keyboardtype';
import View from '@smartface/native/ui/view';
import PgVerificationDesign from 'generated/pages/pgVerification';

export default class PgVerification extends PgVerificationDesign {
    router: any
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.imgBack.on(View.Events.Touch, () => {
            this.router.goBack();
        })

        this.btnRouter.on(View.Events.Touch, () => {
            this.router.push('/pages/pgLogin')
        })

        this.tbCode.keyboardType = KeyboardType.NUMBER
	}
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgVerification, superOnShow: () => void) {
	superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgVerification, superOnLoad: () => void) {
	superOnLoad();
}
