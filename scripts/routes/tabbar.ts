import Color from '@smartface/native/ui/color';
import Image from '@smartface/native/ui/image';
import TabBarItem from '@smartface/native/ui/tabbaritem';
import { BottomTabBarRouter, NativeStackRouter as StackRouter, Route } from '@smartface/router';
import buildExtender from '@smartface/extension-utils/lib/router/buildExtender';
import store from 'store';
import authRouteGenerator from './auth';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import BottomTabBarController from '@smartface/native/ui/bottomtabbarcontroller';
import { ThemeService } from 'theme';

ThemeService.onChange(() => {
    const { backgroundColor, itemColor } = getCombinedStyle('.tabs');
    const rootController = bottomTabBarRouter._renderer._rootController;
    if (rootController instanceof BottomTabBarController) {
        rootController.tabBar.backgroundColor = backgroundColor;
        rootController.tabBar.itemColor = itemColor;
    }
});

let btbItemCart = new TabBarItem();
btbItemCart.title = global.lang.cart;
btbItemCart.icon = Image.createFromFile('images://tabiconcart.png');
store.subscribe(() => {
    btbItemCart.badge.text = getBasketCounter();
    if (btbItemCart.badge.text == '0') {
        btbItemCart.badge.visible = false; // default false
    } else {
        btbItemCart.badge.visible = true;
        btbItemCart.badge.move(0, 0);
        btbItemCart.badge.backgroundColor = Color.create('#53b175');
    }
    if (parseInt(btbItemCart.badge.text) > 10) {
        btbItemCart.badge.text = '10+';
    }
});

const getBasketCounter = () => {
    if (store.getState().basket && store.getState().basket.length > 0) {
        return store
            .getState()
            .basket.reduce((total, product) => total + product.count, 0)
            .toString();
    } else {
        return null;
    }
};

const bottomTabBarRouter = BottomTabBarRouter.of({
    path: '/btb',
    to: '/btb/tab1/home',
    homeRoute: 0,
    tabbarParams: () => ({
        ios: { translucent: false },
        itemColor: {
            normal: Color.create('#181725'),
            selected: Color.create('#53B175')
        },
        backgroundColor: Color.create('#FFFFFF')
    }),
    items: [
        { title: global.lang.shop, icon: Image.createFromFile('images://tabiconhome.png') },
        { title: global.lang.explore, icon: Image.createFromFile('images://tabiconexplore.png') },
        btbItemCart,
        { title: global.lang.favourite, icon: Image.createFromFile('images://tabiconfavorite.png') },
        { title: global.lang.account, icon: Image.createFromFile('images://tabiconuser.png') }
    ],
    // tab1
    routes: [
        // tab1
        StackRouter.of({
            path: '/btb/tab1',
            to: '/btb/tab1/home',
            routes: [
                Route.of({
                    path: '/btb/tab1/home',
                    build: buildExtender({ getPageClass: () => require('pages/pgHome').default, headerBarStyle: { visible: true } })
                }),
                StackRouter.of({
                    path: '/btb/tab1/productDetail',
                    to: '/btb/tab1/productDetail/main',
                    modal: true,
                    routes: [
                        Route.of({
                            path: '/btb/tab1/productDetail/main',
                            build: buildExtender({
                                getPageClass: () => require('pages/pgProductDetail').default,
                                headerBarStyle: { visible: true }
                            })
                        })
                    ]
                }),
                StackRouter.of({
                    path: '/btb/tab1/categoryDetail',
                    to: '/btb/tab1/categoryDetail/main',
                    modal: true,
                    routes: [
                        Route.of({
                            path: '/btb/tab1/categoryDetail/main',
                            build: buildExtender({
                                getPageClass: () => require('pages/pgCategoryDetail').default,
                                headerBarStyle: { visible: true }
                            })
                        })
                    ]
                })
            ]
        }),
        // tab2
        StackRouter.of({
            path: '/btb/tab2',
            to: '/btb/tab2/categories',
            routes: [
                Route.of({
                    path: '/btb/tab2/categories',
                    build: buildExtender({
                        getPageClass: () => require('pages/pgCategories').default,
                        headerBarStyle: { visible: true }
                    })
                }),
                StackRouter.of({
                    path: '/btb/tab2/categoryDetail',
                    to: '/btb/tab2/categoryDetail/main',
                    modal: true,
                    routes: [
                        Route.of({
                            path: '/btb/tab2/categoryDetail/main',
                            build: buildExtender({
                                getPageClass: () => require('pages/pgCategoryDetail').default,
                                headerBarStyle: { visible: true }
                            })
                        })
                    ]
                })
            ]
        }),
        StackRouter.of({
            path: '/btb/tab3',
            to: '/btb/tab3/cart',
            routes: [
                Route.of({
                    path: '/btb/tab3/cart',
                    build: buildExtender({ getPageClass: () => require('pages/pgCart').default, headerBarStyle: { visible: true } })
                })
            ]
        }),
        StackRouter.of({
            path: '/btb/tab4',
            to: '/btb/tab4/favorites',
            routes: [
                Route.of({
                    path: '/btb/tab4/favorites',
                    build: buildExtender({
                        getPageClass: () => require('pages/pgFavorites').default,
                        headerBarStyle: { visible: true }
                    })
                })
            ]
        }),
        StackRouter.of({
            path: '/btb/tab5',
            to: '/btb/tab5/account',
            routes: [
                Route.of({
                    path: '/btb/tab5/account',
                    build: buildExtender({
                        getPageClass: () => require('pages/pgAccount').default,
                        headerBarStyle: { visible: true }
                    })
                }),
                StackRouter.of({
                    path: '/btb/tab5/settings',
                    to: '/btb/tab5/settings/main',
                    modal: true,
                    routes: [
                        Route.of({
                            path: '/btb/tab5/settings/main',
                            build: buildExtender({
                                getPageClass: () => require('pages/pgUserSettings').default,
                                headerBarStyle: { visible: true }
                            })
                        })
                    ]
                }),
                StackRouter.of({
                    path: '/btb/tab5/notifications',
                    to: '/btb/tab5/notifications/main',
                    modal: true,
                    routes: [
                        Route.of({
                            path: '/btb/tab5/notifications/main',
                            build: buildExtender({
                                getPageClass: () => require('pages/pgNotifications').default,
                                headerBarStyle: { visible: true }
                            })
                        })
                    ]
                }),
                authRouteGenerator('/btb/tab5')
            ]
        })
    ]
});

export default bottomTabBarRouter;
