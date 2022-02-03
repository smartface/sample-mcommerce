import Application from '@smartface/native/application';
import { Router } from '@smartface/router';
import { getProduct } from 'service/commerce';
import URI from 'urijs';
import genericErrorHandler from './genericErrorHandler';
import { hideWaitDialog, showWaitDialog } from './waitDialog';
import config from 'config.json';
import getCurrentEnvironment from './getCurrentEnvironment';
import System from '@smartface/native/device/system';

type ApplicationCallReceivedParams = {
    url: string;
};

Application.on(Application.Events.ApplicationCallReceived, (params: ApplicationCallReceivedParams) => deeplinkHandler(params));

Application.ios.onUserActivityWithBrowsingWeb = (url) => {
    deeplinkHandler({ url });
    return true;
};

export function deeplinkHandler(params: ApplicationCallReceivedParams) {
    if (System.OS === System.OSType.ANDROID) {
        const { productId } = URI(params?.url || '').query(true);
        if (productId) {
            productDetailHandler(productId);
        }
    }
}

export async function productDetailHandler(productId: string) {
    try {
        showWaitDialog();
        const product = await getProduct(productId);
        if (!!product) {
            Router.currentRouter.push('productDetail', {
                productId: productId
            });
        } else {
            throw new Error(global.lang.productNotFound);
        }
    } catch (error) {
        genericErrorHandler(error);
        alert(global.lang.productNotFound);
    } finally {
        hideWaitDialog();
    }
}

export function generateProductDeeplinkUrl(productId: string) {
    return config.environments[getCurrentEnvironment()].serviceUrl + '/deeplink/redirect?productId=' + productId;
}

// Application.emit(Application.Events.ApplicationCallReceived, {
//     //@ts-ignore
//     url: 'https://smartapps-commerce.smartface.io/deeplink/redirect?productId=61ee8df32bd310de954a2712'
// });
// setTimeout(() => deeplinkHandler({ url: 'smartface-emulator://deeplink?productId=61ee8da12bd310de954a2708' }), 3000); //Deeplink tester
