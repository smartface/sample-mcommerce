import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import KeyboardType from '@smartface/native/ui/keyboardtype';
import View from '@smartface/native/ui/view';
import PgVerificationDesign from 'generated/pages/pgVerification';

export default class PgVerification extends PgVerificationDesign {
    router: any
    leftItem: HeaderBarItem
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        // this.imgBack.on(View.Events.Touch, () => {
        //     this.router.goBack();
        // })

        this.btnRouter.on(View.Events.Touch, () => {
            this.router.push('/pages/pgLogin')
        })
        //this.tbCode.keyboardType = KeyboardType.NUMBER
	}
    initMaterialTextBox() {
        this.mtbNumber.options = {
            //hint: "",
            //text: "smartface"
        }
        
        this.mtbNumber.materialTextBox.keyboardType = KeyboardType.NUMBER;
        //this.mtbPassword.rightLayout = { view: this.imgShow, width: 30 };
    }
    addHeaderWithDirectImage() {
        this.leftItem = new HeaderBarItem();
        this.leftItem.image = "images://backbtn.png";
        this.leftItem.color = Color.BLACK;
        this.headerBar.setLeftItem(this.leftItem);
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
    this.addHeaderWithDirectImage()
    this.initMaterialTextBox()
}
