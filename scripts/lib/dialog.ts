import Dialog from '@smartface/native/ui/dialog';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { themeService } from 'theme';

type DialogOpts = {
    className?: string;
    closeOnTouch?: boolean;
};

export default function (component: FlexLayout, opts?: DialogOpts): Dialog {
    const dialog: Dialog = new Dialog({
        android: {
            themeStyle: Dialog.Android.Style.ThemeNoHeaderBar,
            cancelable: false
        }
    });
    themeService.addGlobalComponent(dialog.layout as any /** to be fixed with stylingcontext next version */, 'genericDialog');
    (dialog.layout as StyleContextComponentWithDispatch<FlexLayout>).dispatch({
        type: 'pushClassNames',
        classNames: [opts?.className || '.dialog']
    });
    dialog.android.isTransparent = false;
    if (opts?.closeOnTouch) {
        dialog.layout.onTouchEnded = (isInside) => {
            isInside && dialog.hide();
            return true;
        };
    }
    component.onTouch = () => {
        return true;
    };
    //@ts-ignore
    dialog.layout.addChild(component, 'genericDialogChild');
    dialog.layout.applyLayout();
    return dialog;
}
