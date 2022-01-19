import PgSignUpDesign from 'generated/pages/pgSignUp';
import Color from '@smartface/native/ui/color';
import View from '@smartface/native/ui/view';
import Application from '@smartface/native/application';
import store from 'store/index';
import System from '@smartface/native/device/system';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Button from '@smartface/native/ui/button';

export default class PgSignUp extends withDismissAndBackButton(PgSignUpDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});

        this.lblRouteLogin.on(View.Events.TouchEnded, () => {
            this.router.goBack();
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
        this.mtbUsername.options = {
            hint: global.lang.username
        };
        this.mtbEmail.options = {
            hint: global.lang.email
        };
        this.mtbPassword.options = {
            hint: global.lang.password
        };
        this.mtbPassword.materialTextBox.isPassword = true;
    }
    initUserSignup() {
        let userPayload = {
            fullName: null,
            username: null,
            password: null,
            email: null,
            profileImage: 'userprofilephoto.png'
        };
        userPayload.email = this.mtbEmail.materialTextBox.text.trim();
        userPayload.username = this.mtbUsername.materialTextBox.text.trim();
        userPayload.fullName = this.mtbUsername.materialTextBox.text.trim();
        userPayload.password = this.mtbPassword.materialTextBox.text.trim();

        store.dispatch({
            type: 'SET_NEW_USER',
            payload: {
                data: userPayload
            }
        });
        this.router.push('/pages/pgLogin');
    }

    onShow() {
        super.onShow();
        if (System.OS !== 'iOS') {
            Application.statusBar.visible = true;
            Application.statusBar.backgroundColor = Color.WHITE;
        }
        this.initDismissButton(this.router);
        this.initBackButton(this.router);
    }

    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.signUpHeader;
        this.initMaterialTextBoxes();
    }
}
