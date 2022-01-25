import { createServiceCallObject } from 'service';
import getCurrentEnvironment from 'lib/getCurrentEnvironment';
import config from 'config.json';
import { buildQueryParams } from 'lib/query';
import genericErrorHandler from 'lib/genericErrorHandler';
import storeActions from 'store/main/actions';
import { getAccessToken } from 'service/token';
import store from 'store/index';
const { serviceUrl } = config.environments[getCurrentEnvironment()];

const sc = createServiceCallObject(serviceUrl);

interface IAuthQueryParams {
    email?: string;
    password?: string;
}

export async function register({ email = '', password = '' }: IAuthQueryParams = {}): Promise<any> {
    try {
        const res = await sc.request('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: buildQueryParams({
                email,
                password
            })
        });
        return res;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}

export async function getCategories(): Promise<any> {
    try {
        const response = await sc.request('/commerce/categories', {
            method: 'GET'
        });
        return response;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}

export function getCategoryImage(categoryId: string): string {
    return `${serviceUrl}/commerce/category/${categoryId}/image`;
}