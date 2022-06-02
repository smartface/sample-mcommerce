import PgAccountDesign from 'generated/pages/pgAccount';
import store from '../store/index';
import storeActions from '../store/main/actions';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import LviAccount from 'components/LviAccount';
import profileImageMenu from 'lib/profileImageMenu';
import { themeService } from 'theme';
import { User } from 'types';
import LviSpacer from 'generated/my-components/LviSpacer';
import LviProfile from 'components/LviProfile';
import LviRow2LineButton from 'components/LviRow2LineButton';
import { Router, Route } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { getProfileImageUrl, putProfileImage } from 'service/commerce';
import AlertView from '@smartface/native/ui/alertview';
import {getAccessToken} from '../service/token';
import { i18n } from '@smartface/i18n';

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
                if (item.itemTitle === `${i18n.instance.t('settings')}`) {
                    this.router.push('settings');
                } else if (item.itemTitle === `${i18n.instance.t('notifications')}`) {
                    this.router.push('notifications');
                } else if(item.itemTitle === `${i18n.instance.t('myDetails')}`){
                    this.router.push('myDetails');
                }else {
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
                  mainButtonText: `${i18n.instance.t('loginHeader')}`,
                  bottomLeftLabelText: `${i18n.instance.t('signup')}`,
                  bottomRightLabelText: `${i18n.instance.t('forgotPassword')}`,
                  mainOnClick: () => {
                      this.router.push('pages/pgLogin');
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
            if(!getAccessToken() && menu.menuTitle == 'myDetails'){
                return;
            }
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
            image: 'images://logout_icon.png',
            onPress: () => {
                return this.onExit();
            }
        });
        this.headerBar.setItems([this.rightItem]);
    }
    initLogoutButton() {
        this.onExit = () => {
            alert({
                title: `${i18n.instance.t('warning')}`,
                message: `${i18n.instance.t('sureToLogout')}`,
                buttons: [
                    {
                        text: `${i18n.instance.t('yes')}`,
                        type: AlertView.Android.ButtonType.POSITIVE,
                        onClick: () => {
                            store.dispatch(storeActions.logout());
                            this.refreshListView();
                        }
                    },
                    {
                        text: `${i18n.instance.t('cancel')}`,
                        type: AlertView.Android.ButtonType.NEGATIVE,
                        onClick: () => {}
                    }
                ]
            });
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
        this.initLogoutButton();
        this.initListView();
        this.headerBar.leftItemEnabled = false;
        this.headerBar.title = `${i18n.instance.t('accountHeader')}`;
    }
}
