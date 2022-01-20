import PgNumberDesign from 'generated/pages/pgNumber';
import KeyboardType from '@smartface/native/ui/keyboardtype';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { themeService } from 'theme';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Button from '@smartface/native/ui/button';

export default class PgNumber extends withDismissAndBackButton(PgNumberDesign) {
    leftItem: HeaderBarItem;
    constructor(private router?: Router, private route?: Route) {
        super({});

        //@ts-ignore FIX THIS AFTER EVENT FIX TODO
        this.btnRoute.on(Button.Events.Press, () => {
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
    onShow() {
        super.onShow();
        this.initBackButton(this.router, {
            color: themeService.getStyle('.sf-headerBar').itemColor
        });
    }
    onLoad() {
        super.onLoad();
        this.initMaterialTextBox();
    }
}
