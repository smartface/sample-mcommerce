import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import Image from '@smartface/native/ui/image';
import FlCartItemDesign from 'generated/my-components/FlCartItem';
const originalHeight = getCombinedStyle('.lviFavorites').height;

export default class FlCartItem extends FlCartItemDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
    static getHeight(): number {
        return originalHeight;
    }
    get productName(): string {
        return this.lblProductName.text;
    }
    set productName(value: string) {
        this.lblProductName.text = value
    }
    get productInfo(): any {
        return this.lblProductInfo.text;
    }
    set productInfo(value: any) {
        this.lblProductInfo.text = value
    }
    get productImage(): any {
        return this.imgProduct.image;
    }
    set productImage(value: any) {
        this.imgProduct.image = Image.createFromFile(`images://${value}`)
    }
    get productPrice(): string {
        return this.lblProductPrice.text;
    }
    set productPrice(value: string) {
        this.lblProductPrice.text = value
    }
}
