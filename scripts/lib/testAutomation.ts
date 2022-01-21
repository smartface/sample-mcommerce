import System from '@smartface/native/device/system';
import active from '@smartface/extension-utils/lib/router/active';
import MaterialTextBox from '@smartface/native/ui/materialtextbox';
import FlMaterialTextBox from '@smartface/component-materialtextbox';
import View from '@smartface/native/ui/view';
import ViewGroup from '@smartface/native/ui/viewgroup';
import Label from '@smartface/native/ui/label';
import TextView from '@smartface/native/ui/textview';
import TextBox from '@smartface/native/ui/textbox';
import genericErrorHandler from './genericErrorHandler';
import SearchView from '@smartface/native/ui/searchview';
import FlSearchBar from 'components/FlSearchBar';
// import FlMainSearchBar from 'components/FlMainSearchBar';

type AutomationAndAccessibilityOptions = {
    hint?: string;
    overrideAccessibilityElement?: boolean;
    shouldAssignHint?: boolean;
};

enum FOCUSABLE {
    YES = 1,
    NO = 2
}

export function setID(component: any, uniqueKey: string, opts?: AutomationAndAccessibilityOptions): void {
    //@ts-ignore
    const pageName = Router.currentRouter.getState().view?.pageName;
    if (!pageName) return;
    const id = removeSpaces(pageName + '/' + uniqueKey);
    setIDWithNativeAPIAccess(component, id, opts);
    // setIDWithoutNativeAPIAccess(component, id, opts);
}

function setIDWithoutNativeAPIAccess(component: any, id: string, opts?: AutomationAndAccessibilityOptions): void {
    if (!component) {
        return;
    }
    if (System.OS === System.OSType.IOS) {
        if (opts?.hint) {
            if (!(component instanceof Label || component instanceof TextView) || opts?.shouldAssignHint) {
                component.accessibilityLabel = opts.hint;
            }
        }
        component.testId = id;
        if (component instanceof MaterialTextBox) {
            if (component.rightLayout?.view) {
                component.rightLayout.view.testId = id;
            }
        } else if (component instanceof FlMaterialTextBox && component.materialTextBox instanceof MaterialTextBox) {
            const mtb = component?.materialTextBox;
            if (!mtb) {
                throw Error('No materialtextbox instance');
            }
            mtb.testId = id;
            if (mtb.rightLayout?.view) {
                mtb.rightLayout.view.testId = id;
            }
        } else if (component instanceof ViewGroup) {
            if (opts?.overrideAccessibilityElement) {
                component.accessible = true;
            }
        } else if (component instanceof View) {
            component.accessible = true;
        }
    } else {
        if (component instanceof TextBox) {
            component.accessible = false;
        } else if (component instanceof FlMaterialTextBox) {
            const hint = component.materialTextBox?.hint || '';
            const insideText = component.materialTextBox?.text || '';
            component.accessibilityLabel = `${hint} ${insideText}`;
            component.accessible = false;
        } else {
            if (opts?.hint) {
                component.accessibilityLabel = opts.hint;
            }
            if (component instanceof SearchView || component instanceof FlSearchBar) {
                return;
            } else {
                component.accessible = true;
            }
        }
    }
}

function setIDWithNativeAPIAccess(component: any, id: string, opts?: AutomationAndAccessibilityOptions): void {
    if (!component || !component.nativeObject) {
        return;
    }
    // console.log(id + ' ' + component.constructor.name)
    if (System.OS === System.OSType.IOS) {
        const Invocation = require('@smartface/native/util/iOS/invocation.js');
        const isAccessibility = new Invocation.Argument({
            type: 'BOOL',
            value: true
        });

        if (opts?.hint) {
            if (!(component instanceof Label || component instanceof TextView) || opts?.shouldAssignHint) {
                const accessibilityLabel = new Invocation.Argument({
                    type: 'NSString',
                    value: opts.hint
                });
                Invocation.invokeInstanceMethod(component.nativeObject, 'setAccessibilityLabel:', [accessibilityLabel]);
            }
        }
        if (component instanceof MaterialTextBox) {
            //@ts-ignore
            component.nativeObject?.setValueForKey(id, 'accessibilityIdentifier');
            component.rightLayout?.view?.nativeObject?.setValueForKey(id, 'accessibilityIdentifier');
        } else if (component instanceof FlMaterialTextBox && component.materialTextBox instanceof MaterialTextBox) {
            //@ts-ignore
            component.materialTextBox?.nativeObject.setValueForKey(id, 'accessibilityIdentifier');
            component.materialTextBox?.rightLayout?.view?.nativeObject?.setValueForKey(id, 'accessibilityIdentifier');
        } else if (component instanceof ViewGroup) {
            component.nativeObject?.setValueForKey(id, 'accessibilityIdentifier');
            if (opts?.overrideAccessibilityElement) {
                Invocation.invokeInstanceMethod(component.nativeObject, 'setIsAccessibilityElement:', [isAccessibility]);
            }
        } else if (component instanceof View) {
            Invocation.invokeInstanceMethod(component.nativeObject, 'setIsAccessibilityElement:', [isAccessibility]);
            component.nativeObject?.setValueForKey(id, 'accessibilityIdentifier');
        } else {
            component.nativeObject?.setValueForKey(id, 'accessibilityIdentifier');
        }
    } else {
        try {
            if (component instanceof TextBox) {
                component.nativeObject.setImportantForAccessibility(FOCUSABLE.NO);
            } else if (component instanceof FlMaterialTextBox && component.materialTextBox instanceof MaterialTextBox) {
                const hint = component.materialTextBox?.hint || '';
                const insideText = component.materialTextBox?.text || '';
                component.nativeObject.setContentDescription(`${hint} ${insideText}`);
                //@ts-ignore
                component.materialTextBox?.textBoxNativeObject.setImportantForAccessibility(FOCUSABLE.NO);
            } else {
                if (opts?.hint) {
                    component.nativeObject?.setContentDescription(opts.hint);
                }
                if (component instanceof SearchView || component instanceof FlSearchBar) {
                    /**
                     * FOCUSABLE.NO means the OS should not focus automatically to this view
                     * on pages with searchView you need to assign IDs to SearchComponents
                     */
                    component.nativeObject.setFocusable(FOCUSABLE.NO);
                    return;
                } else {
                    component.nativeObject.setFocusable(FOCUSABLE.YES);
                }
            }
        } catch (err) {
            genericErrorHandler(err, false);
        }
    }
}

function removeSpaces(str: string) {
    return str.replace(/ /g, '');
}
