import Dialog from '@smartface/native/ui/dialog';
import FlWaitDialog from 'components/FlWaitDialog';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import { themeService } from 'theme';
import FlexLayout from '@smartface/native/ui/flexlayout';

var waitDialog = null;
var activeDialogCounter = 0;

function initWaitDialog() {
    console.log('initWaitDialog');

    let dialog = new Dialog({
        android: {
            themeStyle: Dialog.Android.Style.ThemeNoHeaderBar,
            cancelable: false
        }
    }) as StyleContextComponentType<Dialog>;
    const component = new FlWaitDialog();
    themeService.addGlobalComponent(component as any, 'flWaitDialog');
    themeService.addGlobalComponent(dialog.layout as any, 'waitDialog');
    (dialog.layout as StyleContextComponentType<FlexLayout>).dispatch({
        type: 'pushClassNames',
        classNames: '.dialog'
    });

    dialog.android.isTransparent = false;
    component.onTouch = () => {
        return true;
    };
    //@ts-ignore
    dialog.layout.addChild(component, 'waitDialogComp');
    dialog.layout.applyLayout();
    return dialog;
}

export const showWaitDialog = () => {
    console.log('showWaitDialog');
    if (!waitDialog) {
        waitDialog = initWaitDialog();
    }
    activeDialogCounter++ === 0 && waitDialog.show();
};

export const hideWaitDialog = (timeout = 0) => {
    if (waitDialog && activeDialogCounter > 0 && --activeDialogCounter === 0) {
        if (timeout) {
            setTimeout(() => waitDialog.hide(), timeout);
        } else {
            waitDialog.hide();
        }
    }
};
