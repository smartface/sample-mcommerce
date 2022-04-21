import { NativeStackRouter, Route, NativeRouter } from '@smartface/router';
import * as Pages from 'pages';

export default function (basePath: string) {
    return NativeStackRouter.of({
        path: `${basePath}/pages`,
        to: `${basePath}/pages/pgWelcome`,
        modal: true,
        routes: [
            Route.of<Pages.pgLogin>({
                path: `${basePath}/pages/pgLogin`,
                build(router, route) {
                    const page = new Pages.pgLogin(router, route);
                    NativeRouter.getActiveRouter().setState({ view: page });
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
                    NativeRouter.getActiveRouter().setState({ view: page });
                    return page;
                },
                headerBarParams: () => ({
                    visible: true
                })
            })
        ]
    });
}
