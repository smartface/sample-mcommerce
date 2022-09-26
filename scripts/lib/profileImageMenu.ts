import Multimedia from '@smartface/native/device/multimedia';
import System from '@smartface/native/device/system';
import Application from '@smartface/native/application';
import Menu from '@smartface/native/ui/menu';
import Image from '@smartface/native/ui/image';
import Blob from '@smartface/native/global/blob';
const MenuItem = require('@smartface/native/ui/menuitem');
import active from '@smartface/extension-utils/lib/router/active';
import permissionUtil from '@smartface/extension-utils/lib/permission';
import Permission from '@smartface/native/device/permission';
import { PROFILE_IMAGE_DIMENSIONS } from '../constants';
import dialog from 'lib/dialog';
import FlPicture from 'components/FlPicture';
import genericErrorHandler from './genericErrorHandler';
// WORKAROUND : SUPDEV-2198 - Remove following lines when resolved
import Contacts from '@smartface/native/device/contacts';
import { NativeRouter as Router } from '@smartface/router';
import { themeService } from 'theme';
import { IImage } from '@smartface/native/ui/image/image';
import { PermissionResult, Permissions } from '@smartface/native/device/permission/permission';
import CallDetection from '@smartface/native/device/calldetection';
import { OSType } from '@smartface/native/device/system/system';
//@ts-ignore
const contactActivity = Contacts.onActivityResult;
//@ts-ignore
Contacts.onActivityResult = function (requestCode, resultCode, data) {
    //@ts-ignore
    Multimedia.onActivityResult(requestCode, resultCode, data);
    //@ts-ignore
    Contacts.onActivityResult = contactActivity;
};
// END OF WORKAROUND

const compressImage = (UIImage: IImage, opts?: IPhotoEdit): Promise<any> => {
    const resize = (image: IImage): Promise<IImage> =>
        new Promise((resolve, reject) => {
            if (opts.resizeRateMultiplier) {
                return image.resize(
                    Math.round(image.width / opts.resizeRateMultiplier),
                    Math.round(image.height / opts.resizeRateMultiplier),
                    ({ image }) => resolve(image),
                    (error) => reject(error)
                );
            } else if (image.width > PROFILE_IMAGE_DIMENSIONS.WIDTH) {
                return image.resize(
                    PROFILE_IMAGE_DIMENSIONS.WIDTH,
                    PROFILE_IMAGE_DIMENSIONS.HEIGHT,
                    ({ image }) => resolve(image),
                    (error) => reject(error)
                );
            } else {
                resolve(image);
            }
        });
    const compress = (image): Promise<Blob> =>
        new Promise((resolve, reject) => {
            return image.compress(
                Image.Format.JPEG,
                opts.compressionRate || 100,
                ({ blob }) => resolve(blob),
                (error) => reject(error)
            );
        });
    return resize(UIImage)
        .then((image) => compress(image))
        .then((blob) => blob.toBase64())
        .catch((err) => genericErrorHandler(err));
};

const updateImage = (params: IPhotoMenu): Promise<string> => {
    return new Promise((resolve, reject) => {
        const menu = new Menu();
        const menuItems = [];
        menu.headerTitle = params.title ? params.title : global.lang.updatePhoto;
        const pictureDialog = initPictureDialog(params.imageUrl);
        menuItems.push(
            new MenuItem({
                title: global.lang.show,
                onSelected: () => {
                    pictureDialog.show();
                }
            })
        );
        menuItems.push(
            new MenuItem({
                title: global.lang.openCamera,
                onSelected: () => {
                    onCameraSelect().then((base64: string) => {
                        resolve(base64);
                    });
                }
            })
        );
        menuItems.push(
            new MenuItem({
                title: global.lang.selectFromGallery,
                onSelected: () => {
                    onGallerySelect().then((base64: string) => {
                        resolve(base64);
                    });
                }
            })
        );
        if (System.OS === System.OSType.IOS) {
            const cancelMenuItem = new MenuItem({
                title: global.lang.cancel
            });
            cancelMenuItem.ios.style = MenuItem.ios.Style.CANCEL;
            menuItems.push(cancelMenuItem);
        }
        menu.items = menuItems;
        menu.show(Router.currentRouter.getState().view);
    });
};

export const onCameraSelect = (opts: IPhotoEdit = {}) => {

    return Permission.requestPermission('CAMERA')
        .then(() => {
            return new Promise((resolve, reject) => {
                const startCameraOpts = {
                    onSuccess: ({ image }) => {
                        return compressImage(image, opts)
                            .then((base64) => resolve(base64))
                            .catch(reject);
                    },
                    onCancel: () => {
                        // WORKAROUND: SUPDEV - 2198
                        //@ts-ignore
                        Contacts.onActivityResult = contactActivity;
                        // END OF WORKAROUND
                        reject();
                    },
                    onFailure: reject,
                    allowsEditing: !opts.blockAllowsEditing,
                    android: {
                        cropShape:
                            opts.cropShape === 'RECTANGLE' ? Multimedia.Android.CropShape.RECTANGLE : Multimedia.Android.CropShape.OVAL,
                        rotateText: global.lang.rotate,
                        scaleText: global.lang.stretch,
                        cropText: global.lang.crop,
                        headerBarTitle: global.lang.photoEditHeaderTitle,
                        hideBottomControls: false
                    },
                    page: Router.currentRouter.getState().view
                };
                !opts.freeAspectRatio && (startCameraOpts['aspectRatio'] = { x: 1, y: 1 });
                !opts.freeMaxResultSize &&
                    (startCameraOpts['android']['maxResultSize'] = {
                        width: PROFILE_IMAGE_DIMENSIONS.WIDTH,
                        height: PROFILE_IMAGE_DIMENSIONS.HEIGHT
                    });
                return Multimedia.capturePhoto(startCameraOpts)
            })
                .catch((err) => {
                    alert({
                        title: 'Camera Permission', // title of the alert dialog
                        message: 'Camere permission is required to use this app', // message of the alert dialog
                    });
                    console.error('Permission failed ' + JSON.stringify(err));
                });
        });
};

export const onGallerySelect = (opts: IPhotoEdit = {}) => {
    return Permission.android.requestPermissions(Permissions.ANDROID.READ_EXTERNAL_STORAGE).then(() => {
        return new Promise((resolve, reject) => {
            const pickFromGalleryOpts = {
                type: Multimedia.Type.IMAGE,
                allowsEditing: !opts.blockAllowsEditing,
                onSuccess: ({ image }) => {
                    return compressImage(image, opts)
                        .then((base64) => resolve(base64))
                        .catch(reject);
                },
                onCancel: () => {
                    // WORKAROUND: SUPDEV - 2198
                    //@ts-ignore
                    Contacts.onActivityResult = contactActivity;
                    // END OF WORKAROUND
                    reject();
                },
                onFailure: reject,
                android: {
                    cropShape:
                        opts.cropShape === 'RECTANGLE' ? Multimedia.Android.CropShape.RECTANGLE : Multimedia.Android.CropShape.OVAL,
                    rotateText: global.lang.rotate,
                    scaleText: global.lang.stretch,
                    cropText: global.lang.crop,
                    headerBarTitle: global.lang.photoEditHeaderTitle,
                    hideBottomControls: false
                },
                page: Router.currentRouter.getState().view
            };
            !opts.freeAspectRatio && (pickFromGalleryOpts['aspectRatio'] = { x: 1, y: 1 });
            !opts.freeMaxResultSize &&
                (pickFromGalleryOpts['android']['maxResultSize'] = {
                    width: PROFILE_IMAGE_DIMENSIONS.WIDTH,
                    height: PROFILE_IMAGE_DIMENSIONS.HEIGHT
                });
            return Multimedia.pickFromGallery(pickFromGalleryOpts);
        });
    });
};


const initPictureDialog = (imageUrl: string) => {
    const flPicture = new FlPicture();
    themeService.addGlobalComponent(flPicture as any /** to be fixed with stylingcontext next version */, 'flPicture');
    flPicture.imageUrl = imageUrl;
    flPicture.dispatch({
        type: 'pushClassNames',
        classNames: `.flPicture`
    });
    return dialog(flPicture, { closeOnTouch: true });
};

export default updateImage;
