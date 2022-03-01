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
import AttributedString from '@smartface/native/ui/attributedstring';

export default class PgSignUp extends withDismissAndBackButton(PgSignUpDesign) {
    isMailValid = false;
    isPasswordValid = false;
    namesValid = false;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.btnSignUp.on(Button.Events.Press, () => {
            this.initUserSignup();
        });
        this.lblTitle.text = global.lang.signup;
        this.lblText.text = global.lang.signupSubText;
        this.btnSignUp.text = global.lang.signup;
    }
    initAttributedStrings() {
        let termsLeft = new AttributedString({
            string: global.lang.termsLeft,
            font: themeService.getNativeStyle('.signup.termsLeft').font,
            foregroundColor: themeService.getNativeStyle('.signup.termsLeft').textColor
        });
        let termsRight = new AttributedString({
            string: global.lang.termsRight,
            font: themeService.getNativeStyle('.signup.termsPrivacyRight').font,
            foregroundColor: themeService.getNativeStyle('.signup.termsPrivacyRight').textColor
        });
        let privacyLeft = new AttributedString({
            string: global.lang.privacyLeft,
            font: themeService.getNativeStyle('.signup.privacyLeft').font,
            foregroundColor: themeService.getNativeStyle('.signup.privacyLeft').textColor
        });
        let privacyRight = new AttributedString({
            string: global.lang.privacyRight,
            font: themeService.getNativeStyle('.signup.termsPrivacyRight').font,
            foregroundColor: themeService.getNativeStyle('.signup.termsPrivacyRight').textColor
        });
        this.tvTermsAndPrivacy.attributedText = [termsLeft, termsRight, privacyLeft, privacyRight];
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
        if (this.initValidate()) {
            try {
                showWaitDialog();
                const registerResponse = await register({
                    firstName: this.mtbFirstName.materialTextBox.text.trim(),
                    lastName: this.mtbLastName.materialTextBox.text.trim(),
                    email: this.mtbEmail.materialTextBox.text.trim(),
                    password: this.mtbPassword.materialTextBox.text.trim()
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
        this.initDismissButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.transparent.white').itemColor
        });
    }
    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.signUpHeader;
        this.initMaterialTextBoxes();
        this.initAttributedStrings();
    }
}
