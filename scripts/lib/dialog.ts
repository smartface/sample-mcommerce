import Dialog from '@smartface/native/ui/dialog';
import FlexLayout from '@smartface/native/ui/flexlayout';
import pushClassNames from '@smartface/contx/lib/styling/action/pushClassNames';
import createPageContext from '@smartface/styling-context/lib/pageContext';
import { themeService } from 'theme';

type DialogOpts = {
    className?: string;
    closeOnTouch?: boolean;
};

export default function (component: FlexLayout, opts?: DialogOpts): StyleContextComponentType<Dialog> {
    const dialog = new Dialog({
        android: {
            themeStyle: Dialog.Android.Style.ThemeNoHeaderBar,
            cancelable: false
        }
    }) as StyleContextComponentType<Dialog>;
    themeService.addPage(createPageContext(dialog, 'genericDialog'), 'genericDialog');
    dialog.dispatch(pushClassNames([opts?.className || '.dialog']));
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
