import Animator from '@smartface/native/ui/animator';

export function showToastAnimation(parent, component, duration, top): Promise<void> {
    component.touchEnabled = false;
    return new Promise<void>((resolve) => {
        Animator.animate(parent, duration, () => (component.bottom = top)).complete(() => {
            component.touchEnabled = true;
            resolve();
        });
    });
}

export function hideToastAnimation(parent, component, duration, bottom): Promise<void> {
    component.touchEnabled = false;
    return new Promise<void>((resolve) => {
        Animator.animate(parent, duration, () => (component.bottom = bottom)).complete(() => {
            component.touchEnabled = true;
            resolve();
        });
    });
}
