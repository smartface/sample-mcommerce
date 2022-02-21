import Screen from '@smartface/native/device/screen';

export const PROFILE_IMAGE_DIMENSIONS = {
    WIDTH: 1280,
    HEIGHT: 1280
};
export const MINIMUM_CHARACTERS_REQUIRED = 2;
export const MINIMUM_CHARACTERS_REQUIRED_FOR_PASSWORD = 8;
export const EMAIL_REGEXP = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const SERVICE_TIMEOUT = 120000;
export const ON_SHOW_TIMEOUT = 500;
export const NO_RATE = 0;
export const BANNER_ASPECT_RATIO = 3;
export const HOME_PRODUCT_LIMIT = 33;
export const PRODUCT_NAME_MAX_LINE = 2;
export const HALF_OF_SCREEN_WIDTH = Screen.width / 2;
export const REVIEW_MAX_LINE = 3;
