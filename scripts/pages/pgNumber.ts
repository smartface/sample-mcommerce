import PgNumberDesign from 'generated/pages/pgNumber';
import View from '@smartface/native/ui/view';
import KeyboardType from '@smartface/native/ui/keyboardtype';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { themeService } from 'theme';
import Image from '@smartface/native/ui/image';
const { image } = themeService.getStyle('.sf-headerBar.close');
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgNumber extends withDismissAndBackButton(PgNumberDesign) {
    leftItem: HeaderBarItem;
    constructor(private router?: Router, private route?: Route) {
        super({});

        //@ts-ignore FIX THIS AFTER EVENT FIX TODO
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
    onShow() {
        super.onShow();
        this.addHeaderWithDirectImage();
        this.initDismissButton(this.router);
        this.initBackButton(this.router);
    }
    onLoad() {
        super.onLoad();
        this.initMaterialTextBox();
    }
}
