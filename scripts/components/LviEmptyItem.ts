import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import Screen from '@smartface/native/device/screen';
import LviEmptyItemDesign from 'generated/my-components/LviEmptyItem';

export default class LviEmptyItem extends LviEmptyItemDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }

    static getHeight(): number {
        return getCombinedStyle(`.lviEmptyItem`).height || 0;
    }
    static getScreenHeightDivide2(): number {
        return Screen.height / 1.5;
    }
    get emptyTitle(): any {
        return this.flEmptyItem.lblEmptyTitle.text;
    }
    set emptyTitle(value: any) {
        this.flEmptyItem.lblEmptyTitle.text = value;
    }
    get emptyImage(): any {
        return this.flEmptyItem.imgEmpty.image;
    }
    set emptyImage(value: any) {
        this.flEmptyItem.imgEmpty.image = value;
    }
}
