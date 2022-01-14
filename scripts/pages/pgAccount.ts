import PgAccountDesign from 'generated/pages/pgAccount';
import store from '../store/index';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Color from '@smartface/native/ui/color';
import LviAccount from 'components/LviAccount';
import profileImageMenu from 'lib/profileImageMenu';
import Blob from '@smartface/native/blob';
import Image from '@smartface/native/ui/image';

type Processor =
    | ListViewItems.ProcessorTypes.ILviAccount
    | ListViewItems.ProcessorTypes.ILviProfile
    | ListViewItems.ProcessorTypes.ILviRow2LineButton
    | ListViewItems.ProcessorTypes.ILviSpacer;

export default class PgAccount extends PgAccountDesign {
    router: any;
    data: any;
    userInfo: any;
    rightItem: HeaderBarItem;
    updatedImage: Image;
    onExit: (...args) => any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.onRowSelected = (item: LviAccount, index) => {
            if (this.data[index].type === 'LVI_ACCOUNT') {
                if (this.data[index].properties.itemTitle === 'settings') {
                    this.router.push('/btb/tab5/settings');
                } else if (this.data[index].properties.itemTitle === 'notifications') {
                    this.router.push('/btb/tab5/notifications');
                } else {
                    alert({
                        title: 'ALERT',
                        message: this.data[index].properties.itemTitle
                    });
                }
            }
        };
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
                  userImage: this.updatedImage || this.userInfo.profileImage,
                  onAction: () => {
                      console.info('onActionClicked');
                      profileImageMenu({
                          imageUrl: 'https://i.picsum.photos/id/49/800/800.jpg?hmac=rAzFhjqrfdnRPLR5_nFV49tMbvavk1xvsaEngwbDUfc',
                          isProfileImageExists: true
                      })
                          .then((base64) => {
                              this.updatedImage = Image.createFromBlob(Blob.createFromBase64(base64));
                              this.refreshListView();
                          })
                          .catch((err) => {
                              console.error(err);
                          });
                  }
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
        return processorItems;
    }
    addRightItem() {
        this.rightItem = new HeaderBarItem();
        this.rightItem.image = 'images://logouticon.png';
        this.rightItem.color = Color.BLACK;
        this.rightItem.onPress = () => {
            return this.onExit();
        };
        this.headerBar.setItems([this.rightItem]);
    }
    initLogoutButton() {
        this.onExit = () => {
            store.dispatch({
                type: 'LOGOUT'
            });
            this.refreshListView();
        };
    }
}

function onShow(this: PgAccount, superOnShow: () => void) {
    superOnShow();
    console.log('isuserloggedin: =>', store.getState().isUserLoggedIn);
    store.subscribe(() => {
        if (store.getState().isUserLoggedIn) {
            this.addRightItem();
        } else {
            this.headerBar.setItems([]);
            this.layout.applyLayout();
        }
    });
    setTimeout(() => {
        this.refreshListView();
    }, 500);
}

function onLoad(this: PgAccount, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.title = global.lang.accountHeader;
    this.headerBar.android.elevation = 0;
    this.initLogoutButton();
    this.initListView();
}
