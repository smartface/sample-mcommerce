import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import Screen from '@smartface/native/device/screen';
import Image from '@smartface/native/ui/image';
import LviEmptyItemDesign from 'generated/my-components/LviEmptyItem';

export default class LviEmptyItem extends LviEmptyItemDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }

    static getHeight(): number {
        return getCombinedStyle(`.lviEmptyItem`).height || 0;
    }
    static getScreenHeightDivide2(): number {
        return Screen.height / 1.5;
    }
    get emptyTitle(): string {
        return this.flEmptyItem.lblEmptyTitle.text;
    }
    set emptyTitle(value: string) {
        this.flEmptyItem.lblEmptyTitle.text = value;
    }
    get emptyImage(): string | Image {
        return this.flEmptyItem.imgEmpty.image;
    }
    set emptyImage(value: string | Image) {
        this.flEmptyItem.imgEmpty.image = value;
    }
}
