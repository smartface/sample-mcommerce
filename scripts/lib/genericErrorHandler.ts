import System from '@smartface/native/device/system';
import { errorStackBySourceMap } from '@smartface/source-map'

const IS_EMULATOR = System.isEmulator;

export default function genericErrorHandler(error) {
    const detailedError = errorStackBySourceMap(error);

    IS_EMULATOR && console.error(JSON.stringify(detailedError, null, '\t'));

    //TODO give info to user
    return error;
}
