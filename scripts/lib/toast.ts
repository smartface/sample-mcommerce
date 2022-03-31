import { themeService } from 'theme';
import Toast from '@smartface/native/ui/toast';
import Screen from '@smartface/native/device/screen';
import System from '@smartface/native/device/system';

//header height ~ 55px, ios and android difference ~ 50px
const bottomOffsetIOS = Screen.height - 150;
const bottomOffsetAnd = Screen.height - 200;

const addToBasketBackground = themeService.getNativeStyle('.flProductItemButtonsWrapper-btnMinus.main').textColor;
const removeFromBasketBackground = themeService.getNativeStyle('.flProductItemButtonsWrapper-btnMinus.danger').textColor;

export const addToBasketToast = () => {
    const myToastMessage = new Toast({
        message: global.lang.addedToBasket,
        bottomOffset: System.OS === System.OSType.ANDROID ? bottomOffsetAnd : bottomOffsetIOS,
        backgroundColor: addToBasketBackground,
        duration: 1
    });
    myToastMessage.show();
};

export const removeFromBasketToast = () => {
    const myToastMessage = new Toast({
        message: global.lang.removedFromBasket,
        bottomOffset: System.OS === System.OSType.ANDROID ? bottomOffsetAnd : bottomOffsetIOS,
        backgroundColor: removeFromBasketBackground,
        duration: 1
    });
    myToastMessage.show();
};
