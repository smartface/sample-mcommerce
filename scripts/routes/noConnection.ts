import { NativeStackRouter as StackRouter, Route, Router, } from '@smartface/router';
import * as Pages from 'pages';

export default function () {
    return (
        StackRouter.of({
            path: '/noConnection',
            routes: [
                Route.of<Pages.pgNoConnection>({
                    path: '/noConnection/main',
                    build(router, route) {
                        return new Pages.pgNoConnection(router, route);
                    }
                }),
            ]
        })
    )
}