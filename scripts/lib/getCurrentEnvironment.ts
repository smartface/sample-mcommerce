import Data from '@smartface/native/global/data';
import config from 'config.json';
import { CURRENT_ENVIRONMENT } from 'constants/deviceVariables.json';

export default function getCurrentEnvironment(): string {
    return Data.getStringVariable(CURRENT_ENVIRONMENT) || config.defaultEnvironment;
}
