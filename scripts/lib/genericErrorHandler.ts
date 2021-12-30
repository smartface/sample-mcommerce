/* eslint-disable no-console */
import { errorStackBySourceMap } from 'error-by-sourcemap';
import isEmulator from '@smartface/extension-utils/lib/isEmulator';
import { NativeStackRouter, Router } from '@smartface/router';
const IS_EMULATOR = isEmulator();

export default function genericErrorHandler(error, informUser = true) {
    let messageToShow = '';
    let handledError = '';
    let redirectionToLoginOccured = false;
    const detailedError = errorStackBySourceMap(error);

    if (typeof error === 'string') {
        messageToShow = error;
    } else if (error.statusCode) {
        // Service error
        redirectionToLoginOccured = redirectToLoginIfNeeded(error);
        handledError = handleHumansoftError(error) || handleLeaveError(error);
        handledError && (messageToShow = handledError);
        redirectionToLoginOccured && (messageToShow = '');
        error.statusCode === 401 && (messageToShow = '');
        error.statusCode === 504 && (messageToShow = global.lang.timeoutError);
    }
    // Inform user
    if (informUser === false) {
        messageToShow = '';
    }
    if (messageToShow) {
        alert({
            title: global.lang.info,
            message: IS_EMULATOR ? JSON.stringify(detailedError, null, '\t') : messageToShow
        });
    }

    return error;
}

export function travelErrorHandler(e) {
    let errorMessage = global.lang.travelGetError;
    if (typeof e.body === 'string') {
        errorMessage = e.body;
    } else if (e?.body?.errors) {
        errorMessage = e.body.errors.map((err) => err.Message).join(' ');
    }
    genericErrorHandler(errorMessage);
}

export function officeErrorHandler(error) {
    if (Number(error.statusCode) === 409) {
        genericErrorHandler(error.body?.message || error.message);
    } else {
        genericErrorHandler(error, false);
        genericErrorHandler(global.lang.officeGetError);
    }
}

export function isSecureDataEmpty(error): boolean {
    if (error?.message?.includes('found') || error?.stack?.includes('found') || (error?.includes && error?.includes('found'))) return true;
    else return false;
}

function redirectToLoginIfNeeded(error): boolean {
    const currentRouter = Router.currentRouter;
    const isStatusCodeForbidden = Number(error.statusCode) === 401;
    const isLoaded = true; //store.getState().profile.isLoaded;
    const isUrlNotOnboarding = !currentRouter.getState().url.includes(`onboarding`);
    if (isStatusCodeForbidden && isLoaded && isUrlNotOnboarding) {
        if (currentRouter instanceof NativeStackRouter && currentRouter.isModal()) {
            currentRouter.dismiss(
                {
                    after: () => {
                        currentRouter.push(`onboarding`);
                    }
                },
                false
            );
        } else {
            currentRouter.push(`onboarding`);
        }
        return true;
    } else {
        return false;
    }
}

function handleHumansoftError(error): string {
    const errorCode = error.body && error.body.errorCode;
    const errorMessage = global.lang.humansoft[errorCode] || '';
    return errorMessage;
}

function handleLeaveError(error): string {
    let errorMessage = '';
    if (error.body && error.body.length > 0) {
        errorMessage = error.body[0].MESSAGE || error.body[0].message || '';
    } else {
        errorMessage = error.body?.CANCEL_DESC || '';
    }
    return errorMessage;
}
