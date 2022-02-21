import Image from '@smartface/native/ui/image';
import TabBarItem from '@smartface/native/ui/tabbaritem';
import { BottomTabBarRouter, NativeStackRouter as StackRouter, Route, Router } from '@smartface/router';
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

function productDetailRouter(basePath: string) {
    return StackRouter.of({
        path: `${basePath}/productDetail`,
        to: `${basePath}/productDetail/main`,
        modal: true,
        routes: [
            Route.of<Pages.pgProductDetail>({
                path: `${basePath}/productDetail/main`,
                build(router, route) {
                    const page = new Pages.pgProductDetail(router, route);
                    router.setState({ view: page });
                    return page;
                },
                headerBarParams: () => ({
                    visible: true
                })
            }),
            Route.of<Pages.pgReviews>({
                path: `${basePath}/productDetail/reviews`,
                build(router, route) {
                    const page = new Pages.pgReviews(router, route);
                    router.setState({ view: page });
                    return page;
                }
            }),
            Route.of<Pages.pgAddReview>({
                path: `${basePath}/productDetail/addReview`,
                build(router, route) {
                    const page = new Pages.pgAddReview(router, route);
                    router.setState({ view: page });
                    return page;
                }
            }),
            Route.of<Pages.pgNutritions>({
                path: `${basePath}/productDetail/nutritions`,
                build(router, route) {
                    const page = new Pages.pgNutritions(router, route);
                    router.setState({ view: page });
                    return page;
                }
            }),
            Route.of<Pages.pgProductDescription>({
                path: `${basePath}/productDetail/description`,
                build(router, route) {
                    const page = new Pages.pgProductDescription(router, route);
                    router.setState({ view: page });
                    return page;
                }
            })
        ]
    });
}

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
                        const page = new Pages.pgHome(router, route);
                        router.setState({ view: page });
                        return page;
                    },
                    headerBarParams: () => ({
                        visible: true
                    })
                }),
                productDetailRouter('/btb/tab1'),
                StackRouter.of({
                    path: '/btb/tab1/categoryDetail',
                    to: '/btb/tab1/categoryDetail/main',
                    modal: true,
                    routes: [
                        Route.of<Pages.pgCategoryDetail>({
                            path: `/btb/tab1/categoryDetail/main`,
                            build(router, route) {
                                const page = new Pages.pgCategoryDetail(router, route);
                                router.setState({ view: page });
                                return page;
                            },
                            headerBarParams: () => ({
                                visible: true
                            })
                        }),
                        productDetailRouter('/btb/tab1/categoryDetail')
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
                        const page = new Pages.pgCategories(router, route);
                        router.setState({ view: page });
                        return page;
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
                                const page = new Pages.pgCategoryDetail(router, route);
                                router.setState({ view: page });
                                return page;
                            },
                            headerBarParams: () => ({
                                visible: true
                            })
                        }),
                        productDetailRouter('/btb/tab2/categoryDetail')
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
                        const page = new Pages.pgCart(router, route);
                        router.setState({ view: page });
                        return page;
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
                        const page = new Pages.pgFavorites(router, route);
                        router.setState({ view: page });
                        return page;
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
                        const page = new Pages.pgAccount(router, route);
                        router.setState({ view: page });
                        return page;
                    },
                    headerBarParams: () => ({
                        visible: true
                    })
                }),
                Route.of({
                    path: '/btb/tab5/settings',
                    to: '/btb/tab5/settings/main',
                    routes: [
                        Route.of<Pages.pgUserSettings>({
                            path: `/btb/tab5/settings/main`,
                            build(router, route) {
                                const page = Pages.pgUserSettings.getInstance(router, route);
                                router.setState({ view: page });
                                return page;
                            },
                            headerBarParams: () => ({
                                visible: true
                            })
                        })
                    ]
                }),
                Route.of({
                    path: '/btb/tab5/notifications',
                    to: '/btb/tab5/notifications/main',
                    routes: [
                        Route.of<Pages.pgNotifications>({
                            path: `/btb/tab5/notifications/main`,
                            build(router, route) {
                                const page = new Pages.pgNotifications(router, route);
                                router.setState({ view: page });
                                return page;
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
