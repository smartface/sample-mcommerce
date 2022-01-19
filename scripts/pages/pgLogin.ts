import PgLoginDesign from 'generated/pages/pgLogin';
import View from '@smartface/native/ui/view';
import store from 'store/index';
import { Route, BaseRouter as Router, NativeStackRouter } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Button from '@smartface/native/ui/button';
import { themeService } from 'theme';

export default class PgLogin extends withDismissAndBackButton(PgLoginDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});

        this.lblRouteSignUp.on(View.Events.Touch, () => {
            this.router.push('/pages/pgSignUp');
        });
        //@ts-ignore FIX THIS AFTER EVENT FIX TODO
        this.btnLogIn.on(Button.Events.Press, () => {
            this.initUserLogin();
        });
        this.lblTitle.text = global.lang.login;
        this.lblText.text = global.lang.loginSubText;
        this.lblForgotPassword.text = global.lang.forgotPassword;
        this.btnLogIn.text = global.lang.login;

        this.lblLeft.text = global.lang.donthaveanaccount;
        this.lblRouteSignUp.text = global.lang.signup;
    }
    initMaterialTextBoxes() {
        this.mtbLogin.options = {
            hint: global.lang.email
        };
        this.mtbPassword.options = {
            hint: global.lang.password
        };
        this.mtbPassword.materialTextBox.isPassword = true;
    }
    initUserLogin() {
        if (
            this.mtbLogin.materialTextBox.text &&
            this.mtbLogin.materialTextBox.text !== '' &&
            this.mtbPassword.materialTextBox.text &&
            this.mtbPassword.materialTextBox.text !== ''
        ) {
            const found = store.getState().users.find((usr) => usr.email === this.mtbLogin.materialTextBox.text);
            if (found) {
                const isPasswordTrue = found.password == this.mtbPassword.materialTextBox.text;
                if (isPasswordTrue) {
                    store.dispatch({
                        type: 'SET_CURRENT_USER',
                        payload: {
                            data: found
                        }
                    });
                    // FIX LATER
                    (this.router as NativeStackRouter).dismiss();
                }
            }
        }
    }
    onShow() {
        super.onShow();
        this.initBackButton(this.router, {
            color: themeService.getStyle('.sf-headerBar.itemColor')
        });
    }
    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.loginHeader;
        this.initMaterialTextBoxes();
    }
}
