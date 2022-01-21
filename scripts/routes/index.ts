import { NativeRouter as Router } from '@smartface/router';
import Application from '@smartface/native/application';
import authRouteGenerator from './auth';
import TabbarRoute from './tabbar';
import isEmulator from '@smartface/extension-utils/lib/isEmulator';

Application.on(Application.Events.BackButtonPressed, () => {
    Router.getActiveRouter()?.goBack();
});

const router = Router.of({
    path: '/',
    isRoot: true,
    routes: [authRouteGenerator(''), TabbarRoute]
});

router.listen((location) => {
    isEmulator() && console.log(`[ROUTER] location url: ${location.url}`);
    Application.hideKeyboard();
});

export default router;
