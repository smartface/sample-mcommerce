import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import KeyboardType from '@smartface/native/ui/keyboardtype';
import View from '@smartface/native/ui/view';
import { NativeStackRouter } from '@smartface/router';
import PgVerificationDesign from 'generated/pages/pgVerification';
const { image } = getCombinedStyle('.sf-headerBar.close');

export default class PgVerification extends PgVerificationDesign {
    router: NativeStackRouter;
    leftItem: HeaderBarItem;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.btnRouter.on(View.Events.Touch, () => {
            this.router.push('pgLogin');
        });
        this.lblTitle.text = global.lang.enterdigitcode;
        this.lblText.text = global.lang.code;
        this.lblResend.text = global.lang.resendCode;
    }
    initMaterialTextBox() {
        this.mtbNumber.options = {
            hint: global.lang.verificationCode
        };
        this.mtbNumber.materialTextBox.keyboardType = KeyboardType.NUMBER;
    }
    addHeaderWithDirectImage() {
        this.leftItem = new HeaderBarItem({
            image: Image.createFromFile(image),
            onPress: () => {
                this.router.goBack();
            }
        });
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
    this.addHeaderWithDirectImage();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgVerification, superOnLoad: () => void) {
    superOnLoad();
    this.initMaterialTextBox();
}
