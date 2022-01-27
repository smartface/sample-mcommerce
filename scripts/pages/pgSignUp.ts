import PgSignUpDesign from 'generated/pages/pgSignUp';
import Color from '@smartface/native/ui/color';
import View from '@smartface/native/ui/view';
import Application from '@smartface/native/application';
import System from '@smartface/native/device/system';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Button from '@smartface/native/ui/button';
import { themeService } from 'theme';
import { register } from 'service/commerce';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
import { EMAIL_REGEXP, MINIMUM_CHARACTERS_REQUIRED_FOR_PASSWORD, MINIMUM_CHARACTERS_REQUIRED } from 'constants';

export default class PgSignUp extends withDismissAndBackButton(PgSignUpDesign) {
    sMailValid = false;
    isPasswordValid = false;
    tnamesValid = false;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.lblRouteLogin.on(View.Events.TouchEnded, () => {
            this.router.push('/pages/pgLogin');
        });
        //@ts-ignore FIX THIS AFTER EVENT FIX TODO
        this.btnSignUp.on(Button.Events.Press, () => {
            this.initUserSignup();
        });
        this.lblTitle.text = global.lang.signup;
        this.lblText.text = global.lang.signupSubText;
        this.btnSignUp.text = global.lang.signup;
        this.lblFooterLeft.text = global.lang.alreadyhaveanaccount;
        this.lblRouteLogin.text = global.lang.login;
    }
    initMaterialTextBoxes() {
        this.mtbFirstName.options = {
            hint: global.lang.firstName
        };
        this.mtbLastName.options = {
            hint: global.lang.lastName
        };
        this.mtbEmail.options = {
            hint: global.lang.email
        };
        this.mtbPassword.options = {
            hint: global.lang.password
        };
        this.mtbPassword.materialTextBox.isPassword = true;
    }
    async initUserSignup() {
        let userPayload = {
            id: 10,
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            profileImage: ''
        };
        userPayload.firstName = this.mtbFirstName.materialTextBox.text.trim();
        userPayload.lastName = this.mtbLastName.materialTextBox.text.trim();
        userPayload.email = this.mtbEmail.materialTextBox.text.trim();
        userPayload.password = this.mtbPassword.materialTextBox.text.trim();
        if (this.initValidate()) {
            try {
                showWaitDialog();
                const registerResponse = await register({
                    firstName: userPayload.firstName,
                    lastName: userPayload.lastName,
                    email: userPayload.email,
                    password: userPayload.password
                });
                if (registerResponse && registerResponse.success) {
                    this.router.push('pgLogin');
                }
            } catch (error) {
                alert({
                    title: global.lang.warning,
                    message: global.lang.alreadyExist
                });
            } finally {
                hideWaitDialog();
            }
        }
    }
    initValidate() {
        let firstNameExist = !!this.mtbFirstName.materialTextBox.text.replace(/\s+/g, '').trim();
        let lastNameExist = !!this.mtbLastName.materialTextBox.text.replace(/\s+/g, '').trim();
        let mailExist = !!this.mtbEmail.materialTextBox.text.replace(/\s+/g, '').trim();
        let passwordExists = !!this.mtbPassword.materialTextBox.text.replace(/\s+/g, '').trim();

        if (
            firstNameExist &&
            lastNameExist &&
            this.mtbFirstName.materialTextBox.text.length >= MINIMUM_CHARACTERS_REQUIRED &&
            this.mtbLastName.materialTextBox.text.length >= MINIMUM_CHARACTERS_REQUIRED
        ) {
            this.namesValid = true;
            this.mtbFirstName.materialTextBox.errorMessage = '';
            this.mtbLastName.materialTextBox.errorMessage = '';
        } else {
            this.namesValid = false;
            this.mtbFirstName.materialTextBox.errorMessage = global.lang.invalidName.replace('$1', MINIMUM_CHARACTERS_REQUIRED);
            this.mtbLastName.materialTextBox.errorMessage = global.lang.invalidName.replace('$1', MINIMUM_CHARACTERS_REQUIRED);
        }

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
    checkIsEmailValid(email: string) {
        return EMAIL_REGEXP.test(email);
    }
    onShow() {
        super.onShow();
        if (System.OS !== 'iOS') {
            Application.statusBar.visible = true;
            Application.statusBar.backgroundColor = Color.WHITE;
        }
        this.initBackButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
    }
    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.signUpHeader;
        this.initMaterialTextBoxes();
    }
}
