import { NativeStackRouter, Route } from '@smartface/router';
import * as Pages from 'pages';

export default function () {
    return (
        NativeStackRouter.of({
            path: '/pgCheckoutSuccessful',
            routes: [
                Route.of<Pages.pgCheckoutSuccessful>({
                    path: '/pgCheckoutSuccessful/main',
                    build(router, route) {
                        return new Pages.pgCheckoutSuccessful(router, route);
                    }
                }),
            ]
        })
    )
}