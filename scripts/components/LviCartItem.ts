import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import Image from '@smartface/native/ui/image';
import LviCartItemDesign from 'generated/my-components/LviCartItem';
const originalHeight = getCombinedStyle('.lviCartItem').height;

export default class LviCartItem extends LviCartItemDesign {
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
        this.lblProductPrice.text = `$${value}`
    }
    set productCount(value: string) {
        this.lblProductCount.text = value
    }
    get productCount(): string {
        return this.lblProductCount.text;
    }
    get bottomLine(): boolean {
        return this.flCartItemBottomLine.visible;
    }
    set bottomLine(value: boolean) {
        this.flCartItemBottomLine.visible = value
    }
}
