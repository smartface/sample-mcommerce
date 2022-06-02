import Application from '@smartface/native/application';
import { Router } from '@smartface/router';
import { getProduct } from 'service/commerce';
import URI from 'urijs';
import genericErrorHandler from './genericErrorHandler';
import { hideWaitDialog, showWaitDialog } from './waitDialog';
import config from 'config.json';
import getCurrentEnvironment from './getCurrentEnvironment';
import System from '@smartface/native/device/system';
import { i18n } from '@smartface/i18n';

type ApplicationCallReceivedParams = {
    url: string;
};

Application.on('applicationCallReceived', (params: ApplicationCallReceivedParams) => deeplinkHandler(params));

Application.ios.onUserActivityWithBrowsingWeb = (url) => {
    deeplinkHandler({ url });
    return true;
};

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
        if (!!product) {
            Router.currentRouter.push('productDetail', {
                productId: productId
            });
        } else {
            throw new Error(`${i18n.instance.t('productNotFound')}`);
        }
    } catch (error) {
        genericErrorHandler(error);
        alert(`${i18n.instance.t('productNotFound')}`);
    } finally {
        hideWaitDialog();
    }
}

export function generateProductDeeplinkUrl(productId: string) {
    return config.environments[getCurrentEnvironment()].serviceUrl + '/deeplink/redirect?productId=' + productId;
}

// Application.emit('applicationCallReceived', {
//     //@ts-ignore
//     url: 'https://smartapps-commerce.smartface.io/deeplink/redirect?productId=61ee8df32bd310de954a2712'
// });
// setTimeout(() => deeplinkHandler({ url: 'smartface-emulator://deeplink?productId=61ee8da12bd310de954a2708' }), 3000); //Deeplink tester
