import { NativeRouter as Router, NativeStackRouter } from '@smartface/router';
import Application from '@smartface/native/application';
import authRouteGenerator from './auth';
import TabbarRoute from './tabbar';
import isEmulator from '@smartface/extension-utils/lib/isEmulator';
import launchScreen from "./launch"
import checkoutSuccessful from './checkoutSuccessful';
import Network from '@smartface/native/device/network';
import noConnection from './noConnection'
import { ON_SHOW_TIMEOUT } from 'constants'
Application.on(Application.Events.BackButtonPressed, () => {
    Router.getActiveRouter()?.goBack();
});

const router = Router.of({
    path: '/',
    isRoot: true,
    routes: [launchScreen(), checkoutSuccessful(), authRouteGenerator(''), noConnection(), TabbarRoute]
});



router.listen((location) => {
    const noConnection = Network.connectionType === Network.ConnectionType.NONE;
    if ((!location.url.includes('launchScreen') && !location.url.includes('noConnection')) && noConnection) {
        if (Router.currentRouter instanceof NativeStackRouter) {
            setTimeout(()=>{
                //@ts-ignore
                Router.currentRouter.dismiss();
                router.push('/noConnection/main');
            },ON_SHOW_TIMEOUT)
        }
    }

    isEmulator() && console.log(`[ROUTER] location url: ${location.url}`);
    Application.hideKeyboard();
});

export default router;
