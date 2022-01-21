import { NativeStackRouter as StackRouter, Route, Router } from '@smartface/router';
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
                    const page = new Pages.pgWelcome(router, route);
                    Router.getActiveRouter().setState({ view: page });
                    return page;
                },
                headerBarParams: () => ({
                    visible: true
                })
            }),
            Route.of<Pages.pgNumber>({
                path: `${basePath}/pages/pgNumber`,
                build(router, route) {
                    const page = new Pages.pgNumber(router, route);
                    Router.getActiveRouter().setState({ view: page });
                    return page;
                },
                headerBarParams: () => ({
                    visible: true
                })
            }),
            Route.of<Pages.pgVerification>({
                path: `${basePath}/pages/pgVerification`,
                build(router, route) {
                    const page = new Pages.pgVerification(router, route);
                    Router.getActiveRouter().setState({ view: page });
                    return page;
                },
                headerBarParams: () => ({
                    visible: true
                })
            }),
            Route.of<Pages.pgLogin>({
                path: `${basePath}/pages/pgLogin`,
                build(router, route) {
                    const page = new Pages.pgLogin(router, route);
                    Router.getActiveRouter().setState({ view: page });
                    return page;
                },
                headerBarParams: () => ({
                    visible: false
                })
            }),
            Route.of<Pages.pgSignUp>({
                path: `${basePath}/pages/pgSignUp`,
                build(router, route) {
                    const page = new Pages.pgSignUp(router, route);
                    Router.getActiveRouter().setState({ view: page });
                    return page;
                },
                headerBarParams: () => ({
                    visible: true
                })
            })
        ]
    });
}
