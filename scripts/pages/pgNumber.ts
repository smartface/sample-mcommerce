import PgNumberDesign from 'generated/pages/pgNumber';
import View from '@smartface/native/ui/view';
import KeyboardType from '@smartface/native/ui/keyboardtype';
import Application from '@smartface/native/application';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';

export default class PgNumber extends PgNumberDesign {
    router: any;
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

        this.btnRoute.on(View.Events.Touch, () => {
            this.router.push('/pages/pgVerification')
        })
        
        //this.mtbNumber.keyboardType = KeyboardType.NUMBER
	}
    initMaterialTextBox() {
        this.mtbNumber.options = {
            //hint: "+90",
            text: "+90"
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
function onShow(this: PgNumber, superOnShow: () => void) {
	superOnShow();
    Application.statusBar.visible = true;
    //Application.statusBar.backgroundColor = Color.create("#000fff");
    //this.headerbaritem.title = "Naber"
    //this.headerBar.setLeftItem(this.headerbaritem)
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgNumber, superOnLoad: () => void) {
	superOnLoad();
    this.initMaterialTextBox()
    this.addHeaderWithDirectImage()
}
