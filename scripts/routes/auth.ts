import { NativeStackRouter as StackRouter, Route } from '@smartface/router';
import * as Pages from 'pages';

export default function (basePath: string) {
    return StackRouter.of({
        path: `${basePath}/pages`,
        to: `${basePath}/pages/pgWelcome`,
        modal: true,
        routes: [
            Route.of<Pages.pgWelcome>({
                path: `${basePath}/pages/pgWelcome`,
                build(router, route) {
                    return new Pages.pgWelcome(router, route);
                },
                headerBarParams: () => ({
                    visible: true
                })
            }),
            Route.of<Pages.pgNumber>({
                path: `${basePath}/pages/pgNumber`,
                build(router, route) {
                    return new Pages.pgNumber(router, route);
                },
                headerBarParams: () => ({
                    visible: true
                })
            }),
            Route.of<Pages.pgVerification>({
                path: `${basePath}/pages/pgVerification`,
                build(router, route) {
                    return new Pages.pgVerification(router, route);
                },
                headerBarParams: () => ({
                    visible: true
                })
            }),
            Route.of<Pages.pgLogin>({
                path: `${basePath}/pages/pgLogin`,
                build(router, route) {
                    return new Pages.pgLogin(router, route);
                },
                headerBarParams: () => ({
                    visible: false
                })
            }),
            Route.of<Pages.pgSignUp>({
                path: `${basePath}/pages/pgSignUp`,
                build(router, route) {
                    return new Pages.pgSignUp(router, route);
                },
                headerBarParams: () => ({
                    visible: true
                })
            })
        ]
    });
}
