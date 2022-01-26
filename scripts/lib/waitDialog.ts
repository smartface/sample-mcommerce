import Dialog from '@smartface/native/ui/dialog';
import FlWaitDialog from 'components/FlWaitDialog';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import pushClassNames from '@smartface/contx/lib/styling/action/pushClassNames';

var waitDialog = null;
var activeDialogCounter = 0;

function initWaitDialog() {
    let dialog = new Dialog({
        android: {
            themeStyle: Dialog.Android.Style.ThemeNoHeaderBar,
            cancelable: false
        }
    }) as StyleContextComponentType<Dialog>;
    const component = new FlWaitDialog();
    componentContextPatch(dialog, 'waitDialog');
    dialog.dispatch(pushClassNames(['.dialog']));
    dialog.android.isTransparent = false;
    // component.touchEnabled = false;
    // dialog.layout.touchEnabled = false;
    component.onTouch = () => {
        return true;
    };
    //@ts-ignore
    dialog.layout.addChild(component, 'waitDialogComp');
    dialog.layout.applyLayout();
    return dialog;
}

export const showWaitDialog = () => {
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
