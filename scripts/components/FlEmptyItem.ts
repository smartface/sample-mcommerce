import Image from '@smartface/native/ui/image';
import FlEmptyItemDesign from 'generated/my-components/FlEmptyItem';

export default class FlEmptyItem extends FlEmptyItemDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get emptyTitle(): string {
        return this.lblEmptyTitle.text;
    }
    set emptyTitle(value: string) {
        this.lblEmptyTitle.text = value;
    }
    get emptyImage(): string | Image {
        return this.imgEmpty.image;
    }
    set emptyImage(value: string | Image) {
        this.imgEmpty.image = value;
    }
}
