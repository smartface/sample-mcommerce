import { createServiceCallObject } from 'service';
import getCurrentEnvironment from 'lib/getCurrentEnvironment';
import config from 'config.json';
import { buildQueryParams } from 'lib/query';
import genericErrorHandler from 'lib/genericErrorHandler';
import { getAccessToken } from 'service/token';
import { ProductRequestQuery } from './service';
import { ProductResponse } from 'types';
const { serviceUrl } = config.environments[getCurrentEnvironment()];

const sc = createServiceCallObject(serviceUrl);

interface IAuthQueryParams {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export async function register({ firstName = '', lastName = '', email = '', password = '' }: IAuthQueryParams = {}): Promise<any> {
    try {
        const res = await sc.request('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                firstName,
                lastName,
                email,
                password
            }
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
    return `${serviceUrl}/commerce/categories/${categoryId}/image`;
}

export async function getShowcases(): Promise<any> {
    try {
        const response = await sc.request('/commerce/showcases', {
            method: 'GET'
        });
        return response;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}

export function getProfileImageUrl(): string {
    return `${serviceUrl}/user/profile-photo`;
}

export async function putProfileImage(base64: string): Promise<any> {
    try {
        const response = await sc.request('/user/profile-photo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAccessToken()}`
            },
            body: {
                image: base64
            }
        });
        return response;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}

export async function getProductsByQuery(query: ProductRequestQuery): Promise<ProductResponse> {
    try {
        const response = await sc.request(`/commerce/products?${buildQueryParams(query)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}

export function getProductImageUrl(imageId: string): string {
    return `${serviceUrl}/commerce/product/${imageId}/image`;
}

export function getBannerImage(bannerId: string): string {
    return `${serviceUrl}/commerce/banners/${bannerId}/image`;
}

export async function getBanners(): Promise<any> {
    try {
        const response = await sc.request('/commerce/banners', {
            method: 'GET'
        });
        return response;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}

export async function getProduct(productId: string): Promise<any> {
    try {
        const response = await sc.request(`/commerce/products/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}

export async function getReviewsByProduct(productId: string): Promise<any> {
    try {
        const response = await sc.request(`/commerce/products/${productId}/reviews`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}

export async function postProductReview(productId: string, star: number, comment: string): Promise<any> {
    try {
        const response = await sc.request(`/commerce/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAccessToken()}`
            },
            body: {
                productId,
                star,
                comment
            }
        });
        return response;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}
