import { themeService } from 'theme';
import Button from '@smartface/native/ui/button';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import KeyboardType from '@smartface/native/ui/shared/keyboardtype';
import PgVerificationDesign from 'generated/pages/pgVerification';
const { image } = themeService.getNativeStyle('.sf-headerBar.back');
import { Router, Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgVerification extends withDismissAndBackButton(PgVerificationDesign) {
    leftItem: HeaderBarItem;
    constructor(private router?: Router, private route?: Route) {
        super({});

        this.btnRouter.on('press', () => {
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
    onShow() {
        super.onShow();
        this.initBackButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
    }
    onLoad() {
        super.onLoad();
        this.initMaterialTextBox();
    }
}
