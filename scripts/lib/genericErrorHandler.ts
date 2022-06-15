import isEmulator from '@smartface/extension-utils/lib/isEmulator';
const IS_EMULATOR = isEmulator();
import { errorStackBySourceMap } from '@smartface/source-map'

export default function genericErrorHandler(error) {
    const detailedError = errorStackBySourceMap(error);

    IS_EMULATOR && console.error(JSON.stringify(detailedError, null, '\t'));

    //TODO give info to user
    return error;
}
