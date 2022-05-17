/* globals lang */
import 'i18n/i18n'; // Generates global lang object
import '@smartface/native';
import 'theme';
import 'lib/deeplink';
import router from 'routes';
import Application from '@smartface/native/application';
import { errorStackBySourceMap } from '@smartface/source-map';
import System from '@smartface/native/device/system';
import '@smartface/native';

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = (e: UnhandledError) => {
  const error = errorStackBySourceMap(e);
  const errorData = {
    message: System.OS === System.OSType.ANDROID ? error.stack : e.message,
    stack: System.OS === System.OSType.IOS ? error.stack : undefined
  };
  if (errorData.stack || System.OS === System.OSType.ANDROID) {
    console.error('Unhandled Error: ', errorData.message, {
      ...errorData
    });
    alert(JSON.stringify(errorData, null, 2), e.type || lang.applicationError);
  }
};

if (!System.isEmulator) {
  router.push('/launchScreen/main');
}
else {
  router.push("/btb/tab1/home");
}
