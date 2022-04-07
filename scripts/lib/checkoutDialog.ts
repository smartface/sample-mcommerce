import Dialog from '@smartface/native/ui/dialog';
import FlCheckout from 'components/FlCheckoutDialog';
import { themeService } from 'theme';
import FlexLayout from '@smartface/native/ui/flexlayout';
import router from 'routes';
import store from 'store/index';
import storeActions from 'store/main/actions';

let checkoutDialog = null;
let activeDialogCounter = 0;

function initDialog(totalCost: string | number) {
    let dialog = new Dialog({
        android: {
            themeStyle: Dialog.Android.Style.ThemeNoHeaderBar,
            cancelable: false
        }
    }) as StyleContextComponentType<Dialog>

    const component = new FlCheckout();
    component.lblCheckout.text = global.lang.checkout;
    component.lblDeliveryTitle.text = global.lang.delivery;
    component.lblCostTitle.text = global.lang.totalCost;
    component.lblPaymentTitle.text = global.lang.payment;
    component.lblTermsAndCond.text = global.lang.checkoutTermsAndCond;
    component.lblPromoTitle.text = global.lang.promoCode;
    component.btnPlaceOrder.text = global.lang.placeOrder;
    component.lblPaymentDescription.text = global.lang.payAtTheDoor;
    component.lblCostDescription.text = totalCost.toString();
    component.lblPromoDescription.text = "No Promo Code"
    component.lblDissmisIcon.onTouchEnded = () => {
        hideCheckoutDialog();
    }
    component.btnPlaceOrder.onTouchEnded = () => {
        hideCheckoutDialog();
        store.dispatch(storeActions.EmptyTheBasket());
        router.push('/pgCheckoutSuccessful/main');

    }
    themeService.addGlobalComponent(component, 'flCheckout');
    themeService.addGlobalComponent(dialog.layout, 'dialogCheckout');
    (dialog.layout as StyleContextComponentType<FlexLayout>).dispatch({
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