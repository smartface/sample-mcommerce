import PgNumberDesign from 'generated/pages/pgNumber';
import View from '@smartface/native/ui/view';
import KeyboardType from '@smartface/native/ui/keyboardtype';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { NativeStackRouter } from '@smartface/router';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import Image from '@smartface/native/ui/image';
const { image } = getCombinedStyle('.sf-headerBar.close');

export default class PgNumber extends PgNumberDesign {
    router: NativeStackRouter;
    leftItem: HeaderBarItem;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.btnRoute.on(View.Events.Touch, () => {
            this.router.push('pgVerification');
        });
        this.lblTitle.text = global.lang.enterMobilNumberText;
        this.lblText.text = global.lang.mobileNumber;
    }
    initMaterialTextBox() {
        this.mtbNumber.options = {
            text: global.lang.phoneCode
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

function onShow(this: PgNumber, superOnShow: () => void) {
    superOnShow();
    this.addHeaderWithDirectImage();
}

function onLoad(this: PgNumber, superOnLoad: () => void) {
    superOnLoad();
    this.initMaterialTextBox();
}
