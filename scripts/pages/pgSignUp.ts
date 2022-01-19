import PgSignUpDesign from 'generated/pages/pgSignUp';
import View from '@smartface/native/ui/view';
import store from 'store/index';
import { NativeStackRouter } from '@smartface/router';

export default class PgSignUp extends PgSignUpDesign {
    router: NativeStackRouter;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.lblRouteLogin.on(View.Events.Touch, () => {
            this.router.goBack();
        });
        this.btnSignUp.on(View.Events.Touch, () => {
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
}

function onShow(this: PgSignUp, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgSignUp, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = global.lang.signUpHeader;
    this.initMaterialTextBoxes();
}
