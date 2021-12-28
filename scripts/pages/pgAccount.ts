import PgAccountDesign from 'generated/pages/pgAccount';
import store from '../store/index';
import LviAccount from 'components/LviAccount';
import FlAccountUser from 'components/FlAccountUser';
import View from '@smartface/native/ui/view';
import Application from '@smartface/native/application';
import Data from '@smartface/native/global/data';
export default class PgAccount extends PgAccountDesign {
  router: any;

  constructor() {
    super();
    // Overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // Overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    this.btnLogout.on(View.Events.Touch, () => {
      store.dispatch({
        type: 'RESET',
      });
      this.router.push('/pages/pgLogin');
    });
    // this.button1.on(View.Events.Touch, () => {
    //     // SMF.i18n.switchLanguage('tr');
    //     Data.setStringVariable('language', 'en');
    //     Application.restart();
    // })

    this.btnLogout.text = global.lang.logout;
  }
  initAccountListView() {
    const accountMenus = store.getState().accountMenus;

    this.listViewAccount.onRowBind = (listViewItem: LviAccount, index: number) => {
      listViewItem.itemTitle = accountMenus[index].menuTitle;
      listViewItem.leftIcon = accountMenus[index].menuLeftIcon;
      listViewItem.bottomLine = index == accountMenus.length - 1;
    };
    this.listViewAccount.onRowSelected = (listViewItem: LviAccount, index: number) => {
      if (index == 1) this.router.push('/btb/tab5/settings');
    };

    this.listViewAccount.onRowHeight = (index) => LviAccount.getHeight();
    this.listViewAccount.itemCount = accountMenus.length;
    this.listViewAccount.refreshData();
  }
  initAccountUser() {
    console.log('CURRENT USER', store.getState().currentUser);
    this.flAccountUser.userName = store.getState().currentUser[0].fullName;
    this.flAccountUser.userEmail = store.getState().currentUser[0].email;
    this.flAccountUser.userEditIcon = '';
    this.flAccountUser.userImage = store.getState().currentUser[0].profileImage;
  }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgAccount, superOnShow: () => void) {
  superOnShow();
  this.initAccountUser();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgAccount, superOnLoad: () => void) {
  superOnLoad();
  this.headerBar.title = global.lang.accountHeader;
  this.headerBar.android.elevation = 0;
  this.initAccountListView();
}
