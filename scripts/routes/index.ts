import { NativeRouter } from '@smartface/router';
import Application from '@smartface/native/application';
import authRouteGenerator from './auth';
import TabbarRoute from './tabbar';
import isEmulator from '@smartface/extension-utils/lib/isEmulator';
import launchScreen from "./launch"
import checkoutSuccessful from './checkoutSuccessful';

Application.on('backButtonPressed', () => {
    NativeRouter.getActiveRouter()?.goBack();
});

const router = NativeRouter.of({
    path: '/',
    isRoot: true,
    routes: [launchScreen(),checkoutSuccessful(),authRouteGenerator(''), TabbarRoute]
});

router.listen((location) => {
    isEmulator() && console.log(`[ROUTER] location url: ${location.url}`);
    Application.hideKeyboard();
});

export default router;
