import { createServiceCallObject } from 'service';
import { setAccessToken, setRefreshToken, getAccessToken, setIdToken } from 'service/token';
import genericErrorHandler from 'lib/genericErrorHandler';
import getCurrentEnvironment from 'lib/getCurrentEnvironment';
import config from 'config.json';
import { buildQueryParams } from 'lib/query';

const { client_id, client_secret, serviceUrl } = config.environments[getCurrentEnvironment()].auth;

const sc = createServiceCallObject(serviceUrl);

interface IAuthQueryParams {
    client_id?: string;
    client_secret?: string;
    grant_type?: string;
    username?: string;
    password?: string;
    login_hint?: string;
    redirect_uri?: string;
    code?: string;
    scope?: string;
    encryptedDeviceInformation?: string;
    authType?: string;
}

type LoginOptions = {
    handleErrors: boolean;
    sendToken: boolean;
};

export async function login({ username = '', password = '', grant_type = 'password' }: IAuthQueryParams): Promise<any> {
    try {
        const res = await sc.request('/auth/realms/smartcommerce/protocol/openid-connect/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: buildQueryParams({
                client_id,
                client_secret,
                username,
                password,
                grant_type
            })
        });
        if (res.access_token) {
            setIdToken(res.id_token);
            setAccessToken(res.access_token);
            setRefreshToken(res.refresh_token);
            await getUserInfo();
        }
        return res;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}

export async function register({ username = '', password = '' }: IAuthQueryParams): Promise<any> {
    try {
        const res = await sc.request('/auth/realms/smartcommerce/protocol/openid-connect/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: buildQueryParams({
                client_id,
                client_secret,
                username,
                password
            })
        });
        return res;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}

export async function getUserInfo(): Promise<any> {
    try {
        const response = await sc.request('/auth/realms/smartcommerce/protocol/openid-connect/userinfo', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
        return response;
    } catch (err) {
        genericErrorHandler(err);
        throw err;
    }
}
