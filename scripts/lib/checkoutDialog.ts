import Dialog from '@smartface/native/ui/dialog';
import FlCheckout from 'components/FlCheckoutDialog';
import { themeService } from 'theme';
import FlexLayout from '@smartface/native/ui/flexlayout';
import router from 'routes';
import store from 'store/index';
import storeActions from 'store/main/actions';
import { CheckoutListItem } from 'types';
import { i18n } from '@smartface/i18n';

let checkoutDialog = null;
let activeDialogCounter = 0;

function initDialog(totalCost: string | number) {
    const checkoutListItems: CheckoutListItem[] = [
        { title: `${i18n.instance.t('delivery')}`, description: 'Home' }, 
        { title: `${i18n.instance.t('payment')}`, description: `${i18n.instance.t('payAtTheDoor')}` }, 
        { title: `${i18n.instance.t('promoCode')}`, description: 'No Promo Code' },
        { title: `${i18n.instance.t('totalCost')}`, description: totalCost.toString() }
        ]
    let dialog = new Dialog({
        android: {
            themeStyle: Dialog.Android.Style.ThemeNoHeaderBar,
            cancelable: false
        }
    });

    const component = new FlCheckout();
    component.items = checkoutListItems;
    component.lblCheckout.text = `${i18n.instance.t('checkout')}`;
    component.lblTermsAndCond.text = `${i18n.instance.t('checkoutTermsAndCond')}`;
    component.btnPlaceOrder.text = `${i18n.instance.t('placeOrder')}`;
    component.lblDissmisIcon.onTouchEnded = () => {
        hideCheckoutDialog();
        return true;
    }
    component.btnPlaceOrder.onTouchEnded = () => {
        hideCheckoutDialog();
        store.dispatch(storeActions.EmptyTheBasket());
        router.push('/pgCheckoutSuccessful/main');
        return true;

    }
    themeService.addGlobalComponent(component, 'flCheckout');
    themeService.addGlobalComponent(dialog.layout, 'dialogCheckout');
    (dialog.layout as StyleContextComponentWithDispatch<FlexLayout>).dispatch({
        type: 'pushClassNames',
        classNames: '.dialogCheckout'
    });

    dialog.android.isTransparent = false;

    //@ts-ignore
    dialog.layout.addChild(component, 'checkoutDialogComp');
    dialog.layout.applyLayout();
    return dialog;
}

export const showCheckoutDialog = (totalCost: string | number) => {
    checkoutDialog = initDialog(totalCost);
    activeDialogCounter++ === 0 && checkoutDialog.show();
}

export const hideCheckoutDialog = (timeout = 0) => {
    if (checkoutDialog && activeDialogCounter > 0 && --activeDialogCounter === 0) {
        if (timeout) {
            setTimeout(() => checkoutDialog.hide(), timeout);
        } else {
            checkoutDialog.hide();
        }
    }
};