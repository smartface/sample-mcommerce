import Image from '@smartface/native/ui/image';
import FlPictureDesign from 'generated/my-components/FlPicture';

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
        this.imgPicture.loadFromUrl({
            url,
            //headers: defaultHeaders(),
            useHTTPCacheControl: true,
            fade: !this.imgPicture.image,
            onFailure: () => {
                //TODO Placeholder?
            }
        });
    }
}
