import Dialog from '@smartface/native/ui/dialog';
import FlexLayout from '@smartface/native/ui/flexlayout';
import { themeService } from 'theme';

type DialogOpts = {
    className?: string;
    closeOnTouch?: boolean;
};

export default function (component: FlexLayout, opts?: DialogOpts): StyleContextComponentType<Dialog> {
    const dialog: StyleContextComponentType<Dialog> = new Dialog({
        android: {
            themeStyle: Dialog.Android.Style.ThemeNoHeaderBar,
            cancelable: false
        }
    }) as StyleContextComponentType<Dialog>;
    themeService.addGlobalComponent(dialog.layout as any /** to be fixed with stylingcontext next version */, 'genericDialog');
    (dialog.layout as StyleContextComponentType<FlexLayout>).dispatch({
        type: 'pushClassNames',
        classNames: [opts?.className || '.dialog']
    });
    dialog.android.isTransparent = false;
    if (opts?.closeOnTouch) {
        dialog.layout.onTouchEnded = (isInside) => isInside && dialog.hide();
    }
    component.onTouch = () => {
        return true;
    };
    //@ts-ignore
    dialog.layout.addChild(component, 'genericDialogChild');
    dialog.layout.applyLayout();
    return dialog;
}
