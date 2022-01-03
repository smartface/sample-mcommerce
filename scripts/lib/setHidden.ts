import pushClassNames from '@smartface/contx/lib/styling/action/pushClassNames';
import removeClassNames from '@smartface/contx/lib/styling/action/removeClassNames';

export default function setHidden(components: any[], visible: boolean) {
    if (!components || !components.length) {
        return;
    }
    components.forEach((component) => {
        component.dispatch(visible ? removeClassNames(['.hidden']) : pushClassNames(['.hidden']));
    });
}
