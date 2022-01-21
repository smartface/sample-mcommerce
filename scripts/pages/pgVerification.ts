import { themeService } from 'theme';
import Button from '@smartface/native/ui/button';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import KeyboardType from '@smartface/native/ui/keyboardtype';
import PgVerificationDesign from 'generated/pages/pgVerification';
const { image } = themeService.getNativeStyle('.sf-headerBar.back');
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgVerification extends withDismissAndBackButton(PgVerificationDesign) {
    leftItem: HeaderBarItem;
    constructor(private router?: Router, private route?: Route) {
        super({});

        //@ts-ignore FIX THIS AFTER EVENT FIX TODO
        this.btnRouter.on(Button.Events.Press, () => {
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
            image,
            onPress: () => {
                this.router.goBack();
            }
        });
        this.headerBar.setLeftItem(this.leftItem);
    }
    onShow() {
        super.onShow();
        this.addHeaderWithDirectImage();
        this.initBackButton(this.router);
    }
    onLoad() {
        super.onLoad();
        this.initMaterialTextBox();
    }
}
