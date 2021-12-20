import buildExtender from '@smartface/extension-utils/lib/router/buildExtender';
import {
    BottomTabBarRouter,
    NativeRouter as Router,
    NativeStackRouter as StackRouter,
    Route,
} from '@smartface/router';
import * as Pages from 'pages';
import '@smartface/extension-utils/lib/router/goBack'; // Implements onBackButtonPressed
import Color from '@smartface/native/ui/color';
import TabBarItem from "@smartface/native/ui/tabbaritem";
import Image from '@smartface/native/ui/image';
import backClose from '@smartface/extension-utils/lib/router/back-close';
backClose.setDefaultBackStyle({ image: Image.createFromFile("images://backbtn.png"), hideTitle: true });
backClose.dismissBuilder = () => {
    return {
        image: Image.createFromFile('images://tabiconuser.png'),
        position: backClose.DismissPosition.LEFT
    };
};

// let btbItemMessages = new TabBarItem();
// btbItemMessages.title = "Tab2";
// btbItemMessages.badge.text = "1000";
// btbItemMessages.badge.visible = true; // default false
// if (parseInt(btbItemMessages.badge.text) > 99) {
//     btbItemMessages.badge.text = "99+";
// }

const router = Router.of({
    path: '/',
    isRoot: true,
    routes: [
        StackRouter.of({
            path: '/pages',
            routes: [
                Route.of({
                    path: '/pages/pgWelcome',
                    build: buildExtender({
                        getPageClass: () => Pages.pgWelcome,
                        headerBarStyle: { visible: true },
                    }),
                }),
                Route.of({
                    path: '/pages/pgSignIn',
                    build: buildExtender({
                        getPageClass: () => Pages.pgSignIn,
                        headerBarStyle: { visible: true },
                    }),
                }),
                Route.of({
                    path: '/pages/pgNumber',
                    build: buildExtender({
                        getPageClass: () => Pages.pgNumber,
                        headerBarStyle: { visible: true },
                    }),
                }),
                Route.of({
                    path: '/pages/pgVerification',
                    build: buildExtender({
                        getPageClass: () => Pages.pgVerification,
                        headerBarStyle: { visible: true },
                    }),
                }),
                Route.of({
                    path: '/pages/pgLogin',
                    build: buildExtender({
                        getPageClass: () => Pages.pgLogin,
                        headerBarStyle: { visible: true },
                    }),
                }),
                Route.of({
                    path: '/pages/pgSignUp',
                    build: buildExtender({
                        getPageClass: () => Pages.pgSignUp,
                        headerBarStyle: { visible: true },
                    }),
                }),
            ],
        }),
        BottomTabBarRouter.of({
            path: "/btb",
            to: "/btb/tab1/home",
            homeRoute: 0,
            tabbarParams: () => ({
                ios: { translucent: false },
                itemColor: {
                    normal: Color.create("#181725"),
                    selected: Color.create("#53B175"),
                },
                backgroundColor: Color.create("#FFFFFF"),
            }),
            items: [
                { title: "Shop", icon: Image.createFromFile('images://tabiconhome.png') },
                { title: "Explore", icon: Image.createFromFile('images://tabiconexplore.png') },
                { title: "Cart", icon: Image.createFromFile('images://tabiconcart.png') },
                { title: "Favourite", icon: Image.createFromFile('images://tabiconfavorite.png') },
                { title: "Account", icon: Image.createFromFile('images://tabiconuser.png') },
            ],
            // tab1
            routes: [
                // tab1
                StackRouter.of({
                    path: "/btb/tab1",
                    to: "/btb/tab1/home",
                    routes: [
                        Route.of({
                            path: "/btb/tab1/home",
                            build: buildExtender({ getPageClass: () => require("pages/pgHome").default })
                        }),
                        Route.of({
                            path: "/btb/tab1/productDetail",
                            build: buildExtender({ getPageClass: () => require("pages/pgProductDetail").default })
                        }),
                    ],
                }),
                // tab2
                Route.of({
                    path: "/btb/tab2/categories",
                    build: buildExtender({ getPageClass: () => require("pages/pgCategories").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/btb/tab3/pgWelcome",
                    build: buildExtender({ getPageClass: () => require("pages/pgWelcome").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/btb/tab4/favorites",
                    build: buildExtender({ getPageClass: () => require("pages/pgFavorites").default, headerBarStyle: { visible: true } })
                }),
                Route.of({
                    path: "/btb/tab5/page2",
                    build: buildExtender({ getPageClass: () => require("pages/pgWelcome").default, headerBarStyle: { visible: true } })
                }),
            ]
        })
    ],
});

export default router;
