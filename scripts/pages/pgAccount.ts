import PgAccountDesign from 'generated/pages/pgAccount';
import store from '../store/index';
import LviAccount from 'components/LviAccount';
import FlAccountUser from 'components/FlAccountUser';
import View from '@smartface/native/ui/view';
import Application from '@smartface/native/application';
import Data from '@smartface/native/global/data';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';

type Processor = ListViewItems.ProcessorTypes.ILviAccount;

export default class PgAccount extends PgAccountDesign {
    router: any;
    data: any;

    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.btnLogout.on(View.Events.Touch, () => {
            store.dispatch({
                type: 'RESET'
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
    initAccountUser() {
        console.log('CURRENT USER', store.getState().currentUser);
        this.flAccountUser.userName = store.getState().currentUser[0].fullName;
        this.flAccountUser.userEmail = store.getState().currentUser[0].email;
        this.flAccountUser.userEditIcon = '';
        this.flAccountUser.userImage = store.getState().currentUser[0].profileImage;
    }

    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.refreshEnabled = false;
    }
    refreshListView() {
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
    processor(): Processor[] {
        const accountMenus = store.getState().accountMenus;
        return accountMenus.map((menu, index) =>
            ListViewItems.getLviAccount({
                itemTitle: menu.menuTitle,
                leftIcon: menu.menuLeftIcon,
                bottomLine: index === accountMenus.length - 1
            })
        );
    }
}

function onShow(this: PgAccount, superOnShow: () => void) {
    superOnShow();
    this.initAccountUser();
}

function onLoad(this: PgAccount, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = global.lang.accountHeader;
    this.headerBar.android.elevation = 0;
    this.initListView();
    this.refreshListView();
}
