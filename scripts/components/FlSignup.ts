import FlSignupDesign from 'generated/my-components/FlSignup';
import { NativeStackRouter, Router } from '@smartface/router';
import Button from '@smartface/native/ui/button';
import { EMAIL_REGEXP, MINIMUM_CHARACTERS_REQUIRED_FOR_PASSWORD, MINIMUM_CHARACTERS_REQUIRED } from 'constants';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
import { register } from 'service/commerce';
import AttributedString from '@smartface/native/ui/attributedstring';
import { themeService } from 'theme';
import { i18n } from '@smartface/i18n';

export default class FlSignup extends FlSignupDesign {
    pageName?: string | undefined;
    _router: Router;
    isMailValid = false;
    isPasswordValid = false;
    namesValid = false;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.btnSignUp.on('press', () => {
            this.initUserSignup();
        });
        this.flWrapper.onTouchEnded = () =>{
            this.mtbFirstName.materialTextBox.removeFocus();
            return true;
        }
        this.tvTermsAndPrivacy.onTouchEnded = () => {
            this.mtbFirstName.materialTextBox.removeFocus();
            return true;
        }
        this.lblTitle.text = `${i18n.instance.t('signup')}`;
        this.lblText.text = `${i18n.instance.t('signupSubText')}`;
        this.btnSignUp.text = `${i18n.instance.t('signup')}`;
        
    }
    get router(): Router {
        return this._router;
    }

    set router(value: Router) {
        this.initMaterialBoxes();
        this.initAttributedStrings();
        this._router = value;
    }
    
    initMaterialBoxes(){
        this.mtbFirstName.options = {
            hint: `${i18n.instance.t('firstName')}`
        };
        this.mtbLastName.options = {
            hint: `${i18n.instance.t('lastName')}`
        };
        this.mtbEmail.options = {
            hint: `${i18n.instance.t('email')}`
        };
        this.mtbPassword.options = {
            hint: `${i18n.instance.t('password')}`
        };
        this.mtbPassword.materialTextBox.isPassword = true;
    }

    private async initUserSignup() {
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
                    title: `${i18n.instance.t('warning')}`,
                    message: `${i18n.instance.t('alreadyExist')}`
                });
            } finally {
                hideWaitDialog();
            }
        }
    }

    private initValidate() {
        const firstNameExist = !!this.mtbFirstName.materialTextBox.text.replace(/\s+/g, '').trim();
        const lastNameExist = !!this.mtbLastName.materialTextBox.text.replace(/\s+/g, '').trim();
        const mailExist = !!this.mtbEmail.materialTextBox.text.replace(/\s+/g, '').trim();
        const passwordExists = !!this.mtbPassword.materialTextBox.text.replace(/\s+/g, '').trim();

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
            this.mtbFirstName.materialTextBox.errorMessage = `${i18n.instance.t('invalidName')}`.replace('$1', MINIMUM_CHARACTERS_REQUIRED.toString());
            this.mtbLastName.materialTextBox.errorMessage = `${i18n.instance.t('invalidName')}`.replace('$1', MINIMUM_CHARACTERS_REQUIRED.toString());
        }

        if (mailExist && this.checkIsEmailValid(this.mtbEmail.materialTextBox.text)) {
            this.isMailValid = true;
            this.mtbEmail.materialTextBox.errorMessage = '';
        } else {
            this.isMailValid = false;
            this.mtbEmail.materialTextBox.errorMessage = `${i18n.instance.t('invalidEmail')}`;
        }

        if (passwordExists && this.mtbPassword.materialTextBox.text.length >= MINIMUM_CHARACTERS_REQUIRED_FOR_PASSWORD) {
            this.isPasswordValid = true;
            this.mtbPassword.materialTextBox.errorMessage = '';
        } else {
            this.isPasswordValid = false;
            this.mtbPassword.materialTextBox.errorMessage = `${i18n.instance.t('minimumCharacterErrorOnPassword')}`.replace(
                '$1',
                MINIMUM_CHARACTERS_REQUIRED_FOR_PASSWORD.toString()
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

    private initAttributedStrings() {
        const termsLeft = new AttributedString({
            string: `${i18n.instance.t('termsLeft')}`,
            font: themeService.getNativeStyle('.signup.termsLeft').font,
            foregroundColor: themeService.getNativeStyle('.signup.termsLeft').textColor
        });
        const termsRight = new AttributedString({
            string: `${i18n.instance.t('termsRight')}`,
            font: themeService.getNativeStyle('.signup.termsPrivacyRight').font,
            foregroundColor: themeService.getNativeStyle('.signup.termsPrivacyRight').textColor
        });
        const privacyLeft = new AttributedString({
            string: `${i18n.instance.t('privacyLeft')}`,
            font: themeService.getNativeStyle('.signup.privacyLeft').font,
            foregroundColor: themeService.getNativeStyle('.signup.privacyLeft').textColor
        });
        const privacyRight = new AttributedString({
            string: `${i18n.instance.t('privacyRight')}`,
            font: themeService.getNativeStyle('.signup.termsPrivacyRight').font,
            foregroundColor: themeService.getNativeStyle('.signup.termsPrivacyRight').textColor
        });
        this.tvTermsAndPrivacy.attributedText = [termsLeft, termsRight, privacyLeft, privacyRight];
    }
}
