import { IImage } from '@smartface/native/ui/image/image';
import ImageView from '@smartface/native/ui/imageview';
import FlEmptyItemDesign from 'generated/my-components/FlEmptyItem';

export default class FlEmptyItem extends FlEmptyItemDesign {
    pageName?: string | undefined;
    __mainOnClick: (...args) => void;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
        this.imgEmpty.on('touchEnded', () => {
            this.__mainOnClick && this.__mainOnClick();
        });
    }
    get emptyTitle(): string {
        return this.lblEmptyTitle.text;
    }
    set emptyTitle(value: string) {
        this.lblEmptyTitle.text = value;
    }
    get emptyImage(): string | IImage {
        return this.imgEmpty.image;
    }
    set emptyImage(value: string | IImage) {
        this.imgEmpty.image = value;
    }
    get mainOnClick(): (...args) => void {
        return this.__mainOnClick;
    }
    set mainOnClick(value: (...args) => void) {
        this.__mainOnClick = value;
    }
}
