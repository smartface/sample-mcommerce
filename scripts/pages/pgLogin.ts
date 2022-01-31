import PgLoginDesign from 'generated/pages/pgLogin';
import View from '@smartface/native/ui/view';
import { Route, NativeStackRouter, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Button from '@smartface/native/ui/button';
import { EMAIL_REGEXP, MINIMUM_CHARACTERS_REQUIRED_FOR_PASSWORD } from 'constants';
import { login } from 'service/auth';
import { themeService } from 'theme';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
export default class PgLogin extends withDismissAndBackButton(PgLoginDesign) {
    isMailValid = false;
    isPasswordValid = false;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.lblRouteSignUp.on(View.Events.Touch, () => {
            this.router.push('pgSignUp');
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
        this.mtbLogin.materialTextBox.ios.clearButtonEnabled = true;
        this.mtbLogin.enableErrorMessage = true;
        this.mtbPassword.materialTextBox.ios.clearButtonEnabled = true;
        this.mtbPassword.enableErrorMessage = true;

        this.mtbLogin.options = {
            hint: global.lang.email
        };
        this.mtbPassword.options = {
            hint: global.lang.password
        };
        this.mtbPassword.materialTextBox.isPassword = true;
    }
    async initUserLogin() {
        if (this.initValidate()) {
            try {
                showWaitDialog();
                const response = await login({
                    username: this.mtbLogin.materialTextBox.text,
                    password: this.mtbPassword.materialTextBox.text
                });
                if (response && !!response?.access_token) {
                    if (this.router instanceof NativeStackRouter) {
                        this.router.dismiss();
                    }
                }
            } catch (error) {
                alert({
                    title: global.lang.warning,
                    message: global.lang.userNotFoundWithThisCredentials
                });
            } finally {
                hideWaitDialog();
            }
        } else {
            hideWaitDialog();
            return;
        }
    }
    initValidate() {
        let mailExist = !!this.mtbLogin.materialTextBox.text.replace(/\s+/g, '').trim();
        let passwordExists = !!this.mtbPassword.materialTextBox.text.replace(/\s+/g, '').trim();

        if (mailExist && this.checkIsEmailValid(this.mtbLogin.materialTextBox.text)) {
            this.isMailValid = true;
            this.mtbLogin.materialTextBox.errorMessage = '';
        } else {
            this.isMailValid = false;
            this.mtbLogin.materialTextBox.errorMessage = global.lang.invalidEmail;
        }

        if (passwordExists && this.mtbPassword.materialTextBox.text.length >= MINIMUM_CHARACTERS_REQUIRED_FOR_PASSWORD) {
            this.isPasswordValid = true;
            this.mtbPassword.materialTextBox.errorMessage = '';
        } else {
            this.isPasswordValid = false;
            this.mtbPassword.materialTextBox.errorMessage = global.lang.minimumCharacterErrorOnPassword.replace(
                '$1',
                MINIMUM_CHARACTERS_REQUIRED_FOR_PASSWORD
            );
        }
        if (this.isMailValid && this.isPasswordValid) {
            return true;
        } else {
            return false;
        }
    }
    checkIsEmailValid(email: string) {
        return EMAIL_REGEXP.test(email);
    }
    onShow() {
        super.onShow();
        this.initBackButton(this.router);
    }
    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.loginHeader;
        this.initMaterialTextBoxes();
    }
}
