import '@smartface/extension-utils/lib/router/goBack'; // Implements onBackButtonPressed
import { NativeRouter as Router } from '@smartface/router';
import Image from '@smartface/native/ui/image';
import backClose from '@smartface/extension-utils/lib/router/back-close';
import Application from '@smartface/native/application';
import authRouteGenerator from './auth';
import TabbarRoute from './tabbar';
import Color from '@smartface/native/ui/color';
import System from '@smartface/native/device/system';

// backClose.setDefaultBackStyle({ image: Image.createFromFile('images://backbtn.png'), hideTitle: true });
// backClose.dismissBuilder = () => {
//     return {
//         image: Image.createFromFile('images://backbtn.png'),
//         position: backClose.DismissPosition.LEFT
//     };
// };

backClose.dismissBuilder = () => {
    return {
        image: Image.createFromFile('images://closeicon.png'),
        position: backClose.DismissPosition.LEFT,
        color: System.OS === System.OSType.IOS ? Color.BLACK : undefined
    };
};

const router = Router.of({
    path: '/',
    isRoot: true,
    routes: [authRouteGenerator(''), TabbarRoute]
});

router.listen(() => {
    Application.hideKeyboard();
});

export default router;
