import FlEmptyItemDesign from 'generated/my-components/FlEmptyItem';

export default class FlEmptyItem extends FlEmptyItemDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
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
