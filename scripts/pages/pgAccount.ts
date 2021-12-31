import PgAccountDesign from 'generated/pages/pgAccount';
import store from '../store/index';
import LviAccount from 'components/LviAccount';
import FlAccountUser from 'components/FlAccountUser';
import View from '@smartface/native/ui/view';
import Application from '@smartface/native/application';
import Data from '@smartface/native/global/data';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import ListView from '@smartface/native/ui/listview';

type Processor =
    | ListViewItems.ProcessorTypes.ILviAccount
    | ListViewItems.ProcessorTypes.ILviProfile
    | ListViewItems.ProcessorTypes.ILviRow2LineButton
    | ListViewItems.ProcessorTypes.ILviSpacer;

export default class PgAccount extends PgAccountDesign {
    router: any;
    data: any;
    userInfo: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        // this.btnLogout.on(View.Events.Touch, () => {
        //     store.dispatch({
        //         type: 'RESET'
        //     });
        //     this.router.push('/pages/pgLogin');
        // });
        // this.button1.on(View.Events.Touch, () => {
        //     // SMF.i18n.switchLanguage('tr');
        //     Data.setStringVariable('language', 'en');
        //     Application.restart();
        // })

        //this.btnLogout.text = global.lang.logout;
    }

    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.refreshEnabled = false;
        this.refreshListView();
    }
    refreshListView() {
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
    processor(): Processor[] {
        this.userInfo = store.getState().currentUser[0];
        console.info('userInfo: ', this.userInfo);
        const accountItem = this.userInfo
            ? ListViewItems.getLviProfile({
                  userName: this.userInfo.fullName,
                  userEmail: this.userInfo.email,
                  userEditIcon: '',
                  userImage: this.userInfo.profileImage
              })
            : ListViewItems.getLviRow2LineButton({
                  leftIcon: 'images://tabiconuser.png',
                  mainButtonText: 'Log In',
                  bottomLeftButtonText: 'Register',
                  bottomRightButtonText: 'Forgot Password',
                  mainOnClick: () => {
                      this.router.push('pages/pgWelcome');
                  },
                  bottomLeftOnClick: () => {
                      console.info('bottomLeftOnClick');
                  },
                  bottomRightOnClick: () => {
                      console.info('bottomRightOnClick');
                  }
              });
        const processorItems = [accountItem, ListViewItems.getLviSpacerItem({ className: 'small' })];
        const accountMenus = store.getState().accountMenus;
        accountMenus.forEach((menu, index) => {
            processorItems.push(
                ListViewItems.getLviAccount({
                    itemTitle: menu.menuTitle,
                    leftIcon: menu.menuLeftIcon,
                    bottomLine: index === accountMenus.length - 1
                })
            );
        });
        console.info('processorItems: ', processorItems);
        return processorItems;
    }
}

function onShow(this: PgAccount, superOnShow: () => void) {
    superOnShow();
    console.info('onShow');
    setTimeout(() => {
        this.refreshListView();
    }, 500);
}

function onLoad(this: PgAccount, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = global.lang.accountHeader;
    this.headerBar.android.elevation = 0;
    this.initListView();
}
