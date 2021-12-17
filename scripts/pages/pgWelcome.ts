import PgWelcomeDesign from 'generated/pages/pgWelcome';
import Screen from '@smartface/native/device/screen';
import View from '@smartface/native/ui/view';

export default class PgWelcome extends PgWelcomeDesign {
    router: any
	constructor() {
		super();
        imgHeight: 4096
        imgWidth: 2734
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.btnStart.on(View.Events.Touch, () => {
            this.router.push('/pages/pgNumber')
        })
	}
    initImageView() {
        // this.imageView1.top = 0
        // this.imageView1.right = 0
        // this.imageView1.bottom = 0
        // this.imageView1.left = 0
        //this.imageView1.width = Screen.width
        //this.imageView1.height = Screen.height
    }

}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgWelcome, superOnShow: () => void) {
	superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgWelcome, superOnLoad: () => void) {
	superOnLoad();
    this.initImageView()
}
