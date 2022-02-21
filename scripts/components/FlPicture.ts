import Image from '@smartface/native/ui/image';
import { getProfileImagePlaceholder } from 'constants/style';
import FlPictureDesign from 'generated/my-components/FlPicture';
import { getAccessToken } from 'service/token';
import { isCurrentThemeLight } from 'theme';

export default class FlPicture extends FlPictureDesign {
    pageName?: string | undefined;
    private __image: string;
    private __imageUrl: string;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get image(): string {
        return this.__image;
    }
    set image(value: string) {
        this.imgPicture.image = Image.createFromFile(`${(this.__image = value)}`);
    }
    get imageUrl(): string {
        return this.__imageUrl;
    }
    set imageUrl(url: string) {
        this.__imageUrl = url;
        this.imgPicture.image = undefined;
        this.imgPicture.loadFromUrl({
            url,
            headers: { Authorization: `Bearer ${getAccessToken()}` },
            useHTTPCacheControl: true,
            android: {
                useMemoryCache: false
            },
            placeholder: getProfileImagePlaceholder(isCurrentThemeLight())
        });
    }
}
