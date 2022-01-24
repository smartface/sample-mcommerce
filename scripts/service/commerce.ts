import { createServiceCallObject } from 'service';
import getCurrentEnvironment from 'lib/getCurrentEnvironment';
import config from 'config.json';
import { buildQueryParams } from 'lib/query';

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
        throw err;
    }
}
