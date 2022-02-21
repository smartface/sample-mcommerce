import { errorStackBySourceMap } from 'error-by-sourcemap';
import isEmulator from '@smartface/extension-utils/lib/isEmulator';
const IS_EMULATOR = isEmulator();

export default function genericErrorHandler(error) {
    const detailedError = errorStackBySourceMap(error);

    IS_EMULATOR && console.error(JSON.stringify(detailedError, null, '\t'));

    //TODO give info to user
    return error;
}
