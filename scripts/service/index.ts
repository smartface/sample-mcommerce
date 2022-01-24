import { SERVICE_TIMEOUT } from 'constants';
import System from '@smartface/native/device/system';
import Hardware from '@smartface/native/device/hardware';
import Application from '@smartface/native/application';
import ServiceCall from '@smartface/extension-utils/lib/service-call';

import { getAccessToken } from 'service/token';

export function defaultHeaders() {
    return {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json'
    };
}
export function createServiceCallObject(serviceUrl: string) {
    return new ServiceCall({
        baseUrl: serviceUrl,
        logEnabled: true,
        timeout: SERVICE_TIMEOUT,
        headers: {
            'x-app-version': `v${Application.version}`,
            'x-device-id': Hardware.UID,
            'x-device-os': System.OS,
            'x-device-os-version': System.OSVersion,
            'x-device-brand-name': System.OS === System.OSType.IOS ? 'Apple' : encodeURI(Hardware.brandName),
            'x-device-brand-model': encodeURI(Hardware.brandModel)
        }
    });
}
