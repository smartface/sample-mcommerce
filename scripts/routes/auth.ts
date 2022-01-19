import { NativeStackRouter as StackRouter, Route } from '@smartface/router';
import buildExtender from '@smartface/extension-utils/lib/router/buildExtender';
import * as Pages from 'pages';

export default function (basePath: string) {
    return StackRouter.of({
        path: `${basePath}/pages`,
        to: `${basePath}/pages/pgWelcome`,
        modal: true,
        routes: [
            Route.of({
                path: `${basePath}/pages/pgWelcome`,
                build: buildExtender({
                    getPageClass: () => Pages.pgWelcome,
                    headerBarStyle: { visible: true }
                })
            }),
            Route.of({
                path: `${basePath}/pages/pgNumber`,
                build: buildExtender({
                    getPageClass: () => Pages.pgNumber,
                    headerBarStyle: { visible: true }
                })
            }),
            Route.of({
                path: `${basePath}/pages/pgVerification`,
                build: buildExtender({
                    getPageClass: () => Pages.pgVerification,
                    headerBarStyle: { visible: true }
                })
            }),
            Route.of({
                path: `${basePath}/pages/pgLogin`,
                build: buildExtender({
                    getPageClass: () => Pages.pgLogin,
                    headerBarStyle: { visible: false }
                })
            }),
            Route.of({
                path: `${basePath}/pages/pgSignUp`,
                build: buildExtender({
                    getPageClass: () => Pages.pgSignUp,
                    headerBarStyle: { visible: true }
                })
            })
        ]
    });
}
