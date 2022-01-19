import PgLoginDesign from 'generated/pages/pgLogin';
import View from '@smartface/native/ui/view';
import store from 'store/index';
import { NativeStackRouter } from '@smartface/router';
export default class PgLogin extends PgLoginDesign {
    router: NativeStackRouter;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.lblRouteSignUp.on(View.Events.Touch, () => {
            this.router.push('/pages/pgSignUp');
        });
        this.btnLogIn.on(View.Events.Touch, () => {
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
                    this.router.dismiss();
                }
            }
        }
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgLogin, superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgLogin, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = global.lang.loginHeader;
    this.initMaterialTextBoxes();
}
