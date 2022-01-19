import { NativeRouter as Router } from '@smartface/router';
import Application from '@smartface/native/application';
import authRouteGenerator from './auth';
import TabbarRoute from './tabbar';

Application.on(Application.Events.BackButtonPressed, () => {
    Router.getActiveRouter()?.goBack();
});

const router = Router.of({
    path: '/',
    isRoot: true,
    routes: [authRouteGenerator(''), TabbarRoute]
});

router.listen(() => {
    Application.hideKeyboard();
});

export default router;
