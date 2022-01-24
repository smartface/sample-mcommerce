// import * as Actions from 'duck/actions';
import genericErrorHandler from 'lib/genericErrorHandler';
import Blob from '@smartface/native/blob';
import Data from '@smartface/native/global/data';
import { ACCESS_TOKEN, REFRESH_TOKEN, ID_TOKEN } from 'constants/deviceVariables.json';

let accessToken = Data.getStringVariable(ACCESS_TOKEN) || '';
let refreshToken = Data.getStringVariable(REFRESH_TOKEN) || '';
let idToken = Data.getStringVariable(ID_TOKEN) || '';

export function setAccessToken(_accessToken: string) {
    Data.setStringVariable(ACCESS_TOKEN, _accessToken);
    accessToken = _accessToken;
}

export function getAccessToken() {
    return accessToken || Data.getStringVariable(ACCESS_TOKEN);
}

export function setIdToken(_idToken: string) {
    Data.setStringVariable(ID_TOKEN, _idToken);
    idToken = _idToken;
}

export function getIdToken() {
    return idToken || Data.getStringVariable(ID_TOKEN);
}

export function setRefreshToken(_refreshToken: string) {
    Data.setStringVariable(REFRESH_TOKEN, _refreshToken);
    refreshToken = _refreshToken;
    try {
        refreshToken;
    } catch (ex) {
        genericErrorHandler(ex);
    }
}

export function getRefreshToken() {
    return refreshToken || Data.getStringVariable(REFRESH_TOKEN);
}
