import Dialog from '@smartface/native/ui/dialog';
import FlWaitDialog from 'components/FlWaitDialog';
import { themeService } from 'theme';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { DialogStyle } from '@smartface/native/ui/dialog/dialog';

var waitDialog = null;
var activeDialogCounter = 0;

function initWaitDialog() {
    let dialog = new Dialog({
        android: {
            themeStyle: DialogStyle.ThemeNoHeaderBar,
            cancelable: false,
            isTransparent: true
        }
    }) as StyleContextComponentWithDispatch<Dialog>;
    const component = new FlWaitDialog();
    themeService.addGlobalComponent(component as any, 'flWaitDialog');
    themeService.addGlobalComponent(dialog.layout as any, 'waitDialog');
    (dialog.layout as StyleContextComponentWithDispatch<FlexLayout>).dispatch({
        type: 'pushClassNames',
        classNames: '.dialog-transparent'
    });
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
