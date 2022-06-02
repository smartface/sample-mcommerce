import { themeService } from 'theme';
import Button from '@smartface/native/ui/button';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import KeyboardType from '@smartface/native/ui/shared/keyboardtype';
import PgVerificationDesign from 'generated/pages/pgVerification';
const { image } = themeService.getNativeStyle('.sf-headerBar.back');
import { Router, Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { i18n } from '@smartface/i18n';

export default class PgVerification extends withDismissAndBackButton(PgVerificationDesign) {
    leftItem: HeaderBarItem;
    constructor(private router?: Router, private route?: Route) {
        super({});

        this.btnRouter.on('press', () => {
            this.router.push('pgLogin');
        });
        this.lblTitle.text = `${i18n.instance.t('enterdigitcode')}`;
        this.lblText.text = `${i18n.instance.t('code')}`;
        this.lblResend.text = `${i18n.instance.t('resendCode')}`;
    }
    initMaterialTextBox() {
        this.mtbNumber.options = {
            hint: `${i18n.instance.t('verificationCode')}`
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
