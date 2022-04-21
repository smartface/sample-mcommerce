import Button from '@smartface/native/ui/button';
import FlLoginDesign from 'generated/my-components/FlLogin';
import { EMAIL_REGEXP, MINIMUM_CHARACTERS_REQUIRED_FOR_PASSWORD } from 'constants';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
import { NativeStackRouter, Router } from '@smartface/router';
import { login } from 'service/auth';

export default class FlLogin extends FlLoginDesign {
    pageName?: string | undefined;
    isMailValid = false;
    isPasswordValid = false;
    _router: Router;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.btnLogin.on('press', () => {
            this.initUserLogin();
        });
        this.lblTitle.text = global.lang.login;
        this.lblText.text = global.lang.loginSubText;
        this.btnLogin.text = global.lang.login;
        this.lblForgetPassword.text = global.lang.forgotPassword;
        this.lblRouteSignUp.text = global.lang.signup;
        this.lblLeft.text = global.lang.donthaveanaccount;
    }
    get router(): Router {
        return this._router;
    }

    set router(value: Router) {
        this.initMaterialBoxes();
        this._router = value;
    }
    
    private initMaterialBoxes() {
        this.mtbEmail.materialTextBox.ios.clearButtonEnabled = true;
        this.mtbEmail.enableErrorMessage = true;
        this.mtbPassword.materialTextBox.ios.clearButtonEnabled = true;
        this.mtbPassword.enableErrorMessage = true;

        this.mtbEmail.options = {
            hint: global.lang.email
        };
        this.mtbPassword.options = {
            hint: global.lang.password
        };
        this.mtbPassword.materialTextBox.isPassword = true;
    }
    private async initUserLogin() {
        if (this.initValidate()) {
            try {
                showWaitDialog();
                const response = await login({
                    username: this.mtbEmail.materialTextBox.text,
                    password: this.mtbPassword.materialTextBox.text
                });
                if (response && !!response?.access_token) {
                    if (this._router instanceof NativeStackRouter) {
                        this._router.dismiss();
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
    private initValidate() {
        let mailExist = !!this.mtbEmail.materialTextBox.text.replace(/\s+/g, '').trim();
        let passwordExists = !!this.mtbPassword.materialTextBox.text.replace(/\s+/g, '').trim();

        if (mailExist && this.checkIsEmailValid(this.mtbEmail.materialTextBox.text)) {
            this.isMailValid = true;
            this.mtbEmail.materialTextBox.errorMessage = '';
        } else {
            this.isMailValid = false;
            this.mtbEmail.materialTextBox.errorMessage = global.lang.invalidEmail;
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
    private checkIsEmailValid(email: string) {
        return EMAIL_REGEXP.test(email);
    }
}
