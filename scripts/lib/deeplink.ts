import Application from '@smartface/native/application';
import { getProduct } from 'service/commerce';
import URI from 'urijs';
import { hideWaitDialog, showWaitDialog } from './waitDialog';

type ApplicationCallReceivedParams = {
    url: string;
};

Application.on(Application.Events.ApplicationCallReceived, (params: ApplicationCallReceivedParams) => deeplinkHandler(params));

export function deeplinkHandler(params: ApplicationCallReceivedParams) {
    const { productId } = URI(params?.url || '').query(true);
    if (productId) {
        productDetailHandler(productId);
    }
}

export async function productDetailHandler(productId: string) {
    try {
        showWaitDialog();
        const product = await getProduct(productId);
        if (product) {
            this.router.push('productDetail', {
                productId: productId
            });
        } else {
            throw new Error(global.lang.productNotFound);
        }
    } catch (error) {
        alert(global.lang.productNotFound);
    } finally {
        hideWaitDialog();
    }
}
