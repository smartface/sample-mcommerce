import PgAccountDesign from 'generated/pages/pgAccount';
import store from '../store/index';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import LviAccount from 'components/LviAccount';
import profileImageMenu from 'lib/profileImageMenu';
import Blob from '@smartface/native/blob';
import Image from '@smartface/native/ui/image';
import { themeService } from 'theme';
import { User } from 'types';
import LviSpacer from 'generated/my-components/LviSpacer';
import LviProfile from 'components/LviProfile';
import LviRow2LineButton from 'components/LviRow2LineButton';
const { image } = themeService.getStyle('.lviRow2LineButton.leftIcon');
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

type Processor =
    | ListViewItems.ProcessorTypes.ILviAccount
    | ListViewItems.ProcessorTypes.ILviProfile
    | ListViewItems.ProcessorTypes.ILviRow2LineButton
    | ListViewItems.ProcessorTypes.ILviSpacer;

export default class PgAccount extends withDismissAndBackButton(PgAccountDesign) {
    data: Processor[];
    userInfo: User;
    rightItem: HeaderBarItem;
    updatedImage: Image;
    unsubscribe = null;
    onExit: (...args) => any;
    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.onRowSelected = (item: LviAccount | LviProfile | LviRow2LineButton | LviSpacer, index) => {
            if (item instanceof LviAccount) {
                if (item.itemTitle === global.lang.settings) {
                    this.router.push('/btb/tab5/settings');
                } else if (item.itemTitle === global.lang.notifications) {
                    this.router.push('/btb/tab5/notifications');
                } else {
                    alert({
                        title: 'ALERT',
                        message: item.itemTitle
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
        this.userInfo = store.getState().currentUser;
        const accountItem = this.userInfo
            ? ListViewItems.getLviProfile({
                  userName: this.userInfo.fullName,
                  userEmail: this.userInfo.email,
                  userEditIcon: '',
                  userImage: this.updatedImage || this.userInfo.profileImage,
                  onAction: () => {
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
                  leftIcon: image,
                  mainButtonText: global.lang.loginHeader,
                  bottomLeftButtonText: global.lang.signup,
                  bottomRightButtonText: global.lang.forgotPassword,
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
        this.rightItem = new HeaderBarItem({
            image: 'images://logouticon.png',
            onPress: () => {
                return this.onExit();
            }
        });
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
    handleChange() {
        if (store.getState().isUserLoggedIn) {
            this.addRightItem();
        } else {
            this.headerBar.setItems([]);
            this.layout.applyLayout();
            this.unsubscribe();
        }
    }

    onShow() {
        super.onShow();
        this.unsubscribe = store.subscribe(() => this.handleChange());
        setTimeout(() => {
            this.refreshListView();
        }, 500);
    }

    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.accountHeader;
        this.initLogoutButton();
        this.initListView();
        this.headerBar.leftItemEnabled = false;
    }
}
