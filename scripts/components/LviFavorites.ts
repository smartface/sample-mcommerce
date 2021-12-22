import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import Image from '@smartface/native/ui/image';
import LviFavoritesDesign from 'generated/my-components/LviFavorites';
const originalHeight = getCombinedStyle('.lviFavorites').height;

export default class LviFavorites extends LviFavoritesDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    static getHeight(): number {
        return originalHeight;
    }
    get itemTitle(): string {
        return this.lblFavoriteItemTitle.text;
    }
    set itemTitle(value: string) {
        this.lblFavoriteItemTitle.text = value
    }
    get itemPrice(): any {
        return this.lblFavoriteItemPrice.text;
    }
    set itemPrice(value: any) {
        this.lblFavoriteItemPrice.text = value
    }
    get itemImage(): any {
        return this.imgFavoriteItem.image;
    }
    set itemImage(value: any) {
        this.imgFavoriteItem.image = Image.createFromFile(`images://${value}`)
    }
    get itemDesc(): string {
        return this.lblFavroiteItemDesc.text;
    }
    set itemDesc(value: string) {
        this.lblFavroiteItemDesc.text = value
    }
}
