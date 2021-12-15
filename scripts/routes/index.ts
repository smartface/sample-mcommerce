import buildExtender from '@smartface/extension-utils/lib/router/buildExtender';
import {
  NativeRouter as Router,
  NativeStackRouter as StackRouter,
  Route,
} from '@smartface/router';
import * as Pages from 'pages';
import '@smartface/extension-utils/lib/router/goBack'; // Implements onBackButtonPressed

const router = Router.of({
  path: '/',
  isRoot: true,
  routes: [
    StackRouter.of({
      path: '/pages',
      routes: [
        Route.of({
            path: '/pages/pgHome',
            build: buildExtender({
              getPageClass: () => Pages.Page1,
              headerBarStyle: { visible: true },
            }),
          }),
        Route.of({
          path: '/pages/page1',
          build: buildExtender({
            getPageClass: () => Pages.Page1,
            headerBarStyle: { visible: true },
          }),
        }),
        Route.of({
          path: '/pages/page2',
          build: buildExtender({
            getPageClass: () => Pages.Page2,
            headerBarStyle: { visible: true },
          }),
        }),
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
  ],
});

export default router;
