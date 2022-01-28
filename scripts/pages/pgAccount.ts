import PgAccountDesign from 'generated/pages/pgAccount';
import store from '../store/index';
import storeActions from '../store/main/actions';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import LviAccount from 'components/LviAccount';
import profileImageMenu from 'lib/profileImageMenu';
import Image from '@smartface/native/ui/image';
import { themeService } from 'theme';
import { User } from 'types';
import LviSpacer from 'generated/my-components/LviSpacer';
import LviProfile from 'components/LviProfile';
import LviRow2LineButton from 'components/LviRow2LineButton';
const { image } = themeService.getNativeStyle('.lviRow2LineButton.leftIcon');
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { getProfileImageUrl, putProfileImage } from 'service/commerce';

type Processor =
    | ListViewItems.ProcessorTypes.ILviAccount
    | ListViewItems.ProcessorTypes.ILviProfile
    | ListViewItems.ProcessorTypes.ILviRow2LineButton
    | ListViewItems.ProcessorTypes.ILviSpacer;

export default class PgAccount extends withDismissAndBackButton(PgAccountDesign) {
    data: Processor[];
    userInfo: User;
    rightItem: HeaderBarItem;
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
        this.userInfo = store.getState().main.currentUser;
        const accountItem = this.userInfo
            ? ListViewItems.getLviProfile({
                  userName: this.userInfo.name,
                  userEmail: this.userInfo.email,
                  userEditIcon: '',
                  userImage: getProfileImageUrl(),
                  onAction: () => {
                      profileImageMenu({
                          imageUrl: getProfileImageUrl()
                      })
                          .then(async (base64) => {
                              const response = await putProfileImage(base64);
                              if (response && response?.success) {
                                  this.refreshListView();
                              }
                          })
                          .catch((err) => {
                              console.error(err);
                          });
                  }
              })
            : ListViewItems.getLviRow2LineButton({
                  // FIX AFTER THE UPDATE
                  leftIcon: Image.createFromFile(`images://${image}`),
                  mainButtonText: global.lang.loginHeader,
                  bottomLeftButtonText: global.lang.signup,
                  bottomRightButtonText: global.lang.forgotPassword,
                  mainOnClick: () => {
                      this.router.push('pages/pgWelcome');
                  },
                  bottomLeftOnClick: () => {
                      this.router.push('pages/pgSignUp');
                  },
                  bottomRightOnClick: () => {
                      alert('todo');
                  }
              });
        const processorItems = [accountItem, ListViewItems.getLviSpacerItem({ className: 'small' })];
        const accountMenus = store.getState().main.accountMenus;
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
            //Native › NTVE-435
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor,
            image: 'images://logouticon.png',
            onPress: () => {
                return this.onExit();
            }
        });
        this.headerBar.setItems([this.rightItem]);
    }
    initLogoutButton() {
        this.onExit = () => {
            store.dispatch(storeActions.logout());
            this.refreshListView();
        };
    }
    handleChange() {
        if (store.getState().main.isUserLoggedIn) {
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
        if (store.getState().main.isUserLoggedIn) {
            this.addRightItem();
        }
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
