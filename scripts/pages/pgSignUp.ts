import PgSignUpDesign from 'generated/pages/pgSignUp';
import Color from '@smartface/native/ui/color';
import View from '@smartface/native/ui/view';
import Application from '@smartface/native/application';
import store from 'store/index';
import System from '@smartface/native/device/system';

export default class PgSignUp extends PgSignUpDesign {
    router: any
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.lblRouteLogin.on(View.Events.Touch, () => {
            this.router.goBack()
        })
        this.btnSignUp.on(View.Events.Touch, () => {
            this.initUserSignup()
        })
        this.lblTitle.text = global.lang.signup
        this.lblText.text = global.lang.signupSubText
        this.btnSignUp.text = global.lang.signup
        this.lblFooterLeft.text = global.lang.alreadyhaveanaccount
        this.lblRouteLogin.text = global.lang.login
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
    initUserSignup(){
      let userPayload = {
          fullName: null,
          username: null,
          password: null,
          email: null,
          profileImage: 'userprofilephoto.png'
      }
      userPayload.email = this.mtbEmail.materialTextBox.text.trim();
      userPayload.username = this.mtbUsername.materialTextBox.text.trim();
      userPayload.fullName = this.mtbUsername.materialTextBox.text.trim();
      userPayload.password = this.mtbPassword.materialTextBox.text.trim(); 
       
      store.dispatch({
        type: "SET_NEW_USER",
        payload: {
          data: userPayload
        }
      })
      this.router.push('/pages/pgLogin')
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgSignUp, superOnShow: () => void) {
    superOnShow();
  if (System.OS !== 'iOS') {
    Application.statusBar.visible = true;
    Application.statusBar.backgroundColor = Color.WHITE
  }
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgSignUp, superOnLoad: () => void) {
	superOnLoad();
    this.initMaterialTextBoxes();
}
