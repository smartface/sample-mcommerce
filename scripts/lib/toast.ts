import Dialog from '@smartface/native/ui/dialog';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import { themeService } from 'theme';
import FlexLayout from '@smartface/native/ui/flexlayout';
import FlToast from 'generated/my-components/FlToast';

var toastDialog = null;
var activeDialogCounter = 0;

function initToast() {
    let dialog = new Dialog({
        android: {
            themeStyle: Dialog.Android.Style.ThemeNoHeaderBar,
            cancelable: false,
            isTransparent: true
        }
    }) as StyleContextComponentType<Dialog>;
    const component = new FlToast();
    themeService.addGlobalComponent(component as any, 'flToast');
    (component as StyleContextComponentType<FlexLayout>).dispatch({
        type: 'pushClassNames',
        classNames: '.flToast'
    });
    themeService.addGlobalComponent(dialog.layout as any, 'toast');
    (dialog.layout as StyleContextComponentType<FlexLayout>).dispatch({
        type: 'pushClassNames',
        classNames: '.dialog-transparent'
    });
    component.onTouch = () => {
        return true;
    };
    //@ts-ignore
    dialog.layout.addChild(component, 'toastComp');
    dialog.layout.applyLayout();
    return dialog;
}

export const showToastDialog = () => {
    if (!toastDialog) {
        toastDialog = initToast();
    }
    activeDialogCounter++ === 0 && toastDialog.show();
};

export const hideToastDialog = (timeout = 0) => {
    if (toastDialog && activeDialogCounter > 0 && --activeDialogCounter === 0) {
        if (timeout) {
            setTimeout(() => toastDialog.hide(), timeout);
        } else {
            toastDialog.hide();
        }
    }
};
