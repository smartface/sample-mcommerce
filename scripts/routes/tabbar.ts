import Color from '@smartface/native/ui/color';
import Image from '@smartface/native/ui/image';
import TabBarItem from '@smartface/native/ui/tabbaritem';
import { BottomTabBarRouter, NativeStackRouter as StackRouter, Route } from '@smartface/router';
import store from 'store/index';
import authRouteGenerator from './auth';
import { themeService } from 'theme';
import BottomTabBarController from '@smartface/native/ui/bottomtabbarcontroller';
import * as Pages from 'pages';
const { backgroundColor, itemColor } = themeService.getNativeStyle('.tabs');

themeService.onChange(() => {
    const { backgroundColor, itemColor } = themeService.getNativeStyle('.tabs');
    const rootController = bottomTabBarRouter._renderer._rootController;
    if (rootController instanceof BottomTabBarController) {
        rootController.tabBar.backgroundColor = backgroundColor;
        rootController.tabBar.itemColor = itemColor;
    }
});

let btbItemCart = new TabBarItem();
btbItemCart.title = global.lang.cart;
btbItemCart.badge.backgroundColor = itemColor.selected;
btbItemCart.badge.visible = false;
btbItemCart.icon = Image.createFromFile('images://tabiconcart.png');
store.subscribe(() => {
    if (getBasketCounter() !== '') {
        btbItemCart.badge.visible = true;
        btbItemCart.badge.move(0, 0);
        btbItemCart.badge.text = getBasketCounter();
    } else {
        btbItemCart.badge.visible = false;
    }
    if (parseInt(btbItemCart.badge.text) > 10) {
        btbItemCart.badge.text = '10+';
    }
});

const getBasketCounter = () => {
    if (store.getState().main.basket && store.getState().main.basket.length > 0) {
        return store
            .getState()
            .main.basket.reduce((total, product) => total + product.count, 0)
            .toString();
    } else {
        return '';
    }
};

const bottomTabBarRouter = BottomTabBarRouter.of({
    path: '/btb',
    to: '/btb/tab1/home',
    homeRoute: 0,
    tabbarParams: () => ({
        ios: { translucent: false },
        itemColor: itemColor,
        backgroundColor: backgroundColor
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
                Route.of<Pages.pgHome>({
                    path: `/btb/tab1/home`,
                    build(router, route) {
                        return new Pages.pgHome(router, route);
                    },
                    headerBarParams: () => ({
                        visible: true
                    })
                }),
                StackRouter.of({
                    path: '/btb/tab1/productDetail',
                    to: '/btb/tab1/productDetail/main',
                    modal: true,
                    routes: [
                        Route.of<Pages.pgProductDetail>({
                            path: `/btb/tab1/productDetail/main`,
                            build(router, route) {
                                return new Pages.pgProductDetail(router, route);
                            },
                            headerBarParams: () => ({
                                visible: true
                            })
                        })
                    ]
                }),
                StackRouter.of({
                    path: '/btb/tab1/categoryDetail',
                    to: '/btb/tab1/categoryDetail/main',
                    modal: true,
                    routes: [
                        Route.of<Pages.pgCategoryDetail>({
                            path: `/btb/tab1/categoryDetail/main`,
                            build(router, route) {
                                return new Pages.pgCategoryDetail(router, route);
                            },
                            headerBarParams: () => ({
                                visible: true
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
                Route.of<Pages.pgCategories>({
                    path: `/btb/tab2/categories`,
                    build(router, route) {
                        return new Pages.pgCategories(router, route);
                    },
                    headerBarParams: () => ({
                        visible: true
                    })
                }),
                StackRouter.of({
                    path: '/btb/tab2/categoryDetail',
                    to: '/btb/tab2/categoryDetail/main',
                    modal: true,
                    routes: [
                        Route.of<Pages.pgCategoryDetail>({
                            path: `/btb/tab2/categoryDetail/main`,
                            build(router, route) {
                                return new Pages.pgCategoryDetail(router, route);
                            },
                            headerBarParams: () => ({
                                visible: true
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
                Route.of<Pages.pgCart>({
                    path: `/btb/tab3/cart`,
                    build(router, route) {
                        return new Pages.pgCart(router, route);
                    },
                    headerBarParams: () => ({
                        visible: true
                    })
                })
            ]
        }),
        StackRouter.of({
            path: '/btb/tab4',
            to: '/btb/tab4/favorites',
            routes: [
                Route.of<Pages.pgFavorites>({
                    path: `/btb/tab4/favorites`,
                    build(router, route) {
                        return new Pages.pgFavorites(router, route);
                    },
                    headerBarParams: () => ({
                        visible: true
                    })
                })
            ]
        }),
        StackRouter.of({
            path: '/btb/tab5',
            to: '/btb/tab5/account',
            routes: [
                Route.of<Pages.pgAccount>({
                    path: `/btb/tab5/account`,
                    build(router, route) {
                        return new Pages.pgAccount(router, route);
                    },
                    headerBarParams: () => ({
                        visible: true
                    })
                }),
                StackRouter.of({
                    path: '/btb/tab5/settings',
                    to: '/btb/tab5/settings/main',
                    modal: true,
                    routes: [
                        Route.of<Pages.pgUserSettings>({
                            path: `/btb/tab5/settings/main`,
                            build(router, route) {
                                return new Pages.pgUserSettings(router, route);
                            },
                            headerBarParams: () => ({
                                visible: true
                            })
                        })
                    ]
                }),
                StackRouter.of({
                    path: '/btb/tab5/notifications',
                    to: '/btb/tab5/notifications/main',
                    modal: true,
                    routes: [
                        Route.of<Pages.pgNotifications>({
                            path: `/btb/tab5/notifications/main`,
                            build(router, route) {
                                return new Pages.pgNotifications(router, route);
                            },
                            headerBarParams: () => ({
                                visible: true
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
