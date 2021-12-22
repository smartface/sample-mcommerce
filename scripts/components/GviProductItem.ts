import Image from '@smartface/native/ui/image';
import GviProductItemDesign from 'generated/my-components/GviProductItem';

export default class GviProductItem extends GviProductItemDesign {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}

    get itemTitle(): string {
        return this.gviLblProductItemTitle.text;
    }
    set itemTitle(value: string) {
        this.gviLblProductItemTitle.text = value
    }
    get itemPrice(): any {
        return this.gviProductItemPrice.text;
    }
    set itemPrice(value: any) {
        this.gviProductItemPrice.text = value
    }
    get itemImage(): string | Image {
        return this.gviProductItemImg.image;
    }
    set itemImage(value: string | Image) {
        this.gviProductItemImg.image = Image.createFromFile(`images://${value}`)
    }
    get itemDesc(): string {
        return this.gviProductItemDesc.text;
    }
    set itemDesc(value: string) {
        this.gviProductItemDesc.text = value
    }
}
