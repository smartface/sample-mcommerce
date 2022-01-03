import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
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
    get emptyTitle(): any {
        return this.lblEmptyTitle.text;
    }
    set emptyTitle(value: any) {
        this.lblEmptyTitle.text = value;
    }
    get emptyImage(): any {
        return this.imgEmpty.image;
    }
    set emptyImage(value: any) {
        this.imgEmpty.image = value;
    }
}
