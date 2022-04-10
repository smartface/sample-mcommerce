import { NativeStackRouter as StackRouter, Route, Router, } from '@smartface/router';
import * as Pages from 'pages';

export default function () {
    return (
        StackRouter.of({
            path: '/launchScreen',
            routes: [
                Route.of<Pages.pgLaunchScreen>({
                    path: '/launchScreen/main',
                    build(router, route) {
                        return new Pages.pgLaunchScreen(router, route);
                    }
                }),
            ]
        })
    )
}