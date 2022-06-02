import PgNumberDesign from 'generated/pages/pgNumber';
import KeyboardType from '@smartface/native/ui/shared/keyboardtype';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { themeService } from 'theme';
import { Router, Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Button from '@smartface/native/ui/button';
import { i18n } from '@smartface/i18n';

export default class PgNumber extends withDismissAndBackButton(PgNumberDesign) {
    leftItem: HeaderBarItem;
    constructor(private router?: Router, private route?: Route) {
        super({});

        this.btnRoute.on('press', () => {
            this.router.push('pgVerification');
        });
        this.lblTitle.text = `${i18n.instance.t('enterMobilNumberText')}`;
        this.lblText.text = `${i18n.instance.t('mobileNumber')}`;
    }
    initMaterialTextBox() {
        this.mtbNumber.options = {
            text: `${i18n.instance.t('phoneCode')}`
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
