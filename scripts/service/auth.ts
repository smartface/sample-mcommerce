import { createServiceCallObject } from 'service';
import { setAccessToken, setRefreshToken, getRefreshToken, getAccessToken, setIdToken, parseToken } from 'service/token';
import genericErrorHandler from 'lib/genericErrorHandler';
import getCurrentEnvironment from 'lib/getCurrentEnvironment';
import config from 'config.json';
import { buildQueryParams } from 'lib/query';

const { client_id, client_secret, identityProviderHint, redirect_uri, serviceUrl } = config.environments[getCurrentEnvironment()].auth;

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

export async function login(
    { username = '', password = '', login_hint = '', grant_type = 'password', authType = '' }: IAuthQueryParams = {},
    loginOptions: LoginOptions = {
        handleErrors: true,
        sendToken: false
    }
): Promise<any> {
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
                grant_type,
                redirect_uri,
                login_hint,
                authType
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
        throw err;
    }
}

export async function register(
    { username = '', password = '' }: IAuthQueryParams = {},
    loginOptions: LoginOptions = {
        handleErrors: true,
        sendToken: false
    }
): Promise<any> {
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
                redirect_uri
            })
        });
        return res;
    } catch (err) {
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
        genericErrorHandler(err, false);
        throw err;
    }
}
export async function logout(): Promise<any> {
    try {
        const response = await sc.request('/auth/realms/turkcell/protocol/openid-connect/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            },
            body: buildQueryParams({ client_id, client_secret, grant_type: 'refresh_token', refresh_token: getRefreshToken() })
        });
        return response;
    } catch (err) {
        genericErrorHandler(err, false);
        throw err;
    }
}
