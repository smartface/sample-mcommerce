import { themeService } from 'theme';
import Screen from '@smartface/native/device/screen';
import LviEmptyItemDesign from 'generated/my-components/LviEmptyItem';
import { IImage } from '@smartface/native/ui/image/image';

export default class LviEmptyItem extends LviEmptyItemDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        super(props);
        this.pageName = pageName;
    }

    static getHeight(): number {
        return themeService.getStyle(`.lviEmptyItem`).height || 0;
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
    get emptyImage(): string | IImage {
        return this.flEmptyItem.imgEmpty.image;
    }
    set emptyImage(value: string | IImage) {
        this.flEmptyItem.imgEmpty.image = value;
    }
    get mainOnClick(): () => void {
        return this.flEmptyItem.mainOnClick;
    }
    set mainOnClick(value: () => void) {
        this.flEmptyItem.mainOnClick = value;
    }
}
