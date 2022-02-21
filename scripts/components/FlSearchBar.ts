import FlSearchBarDesign from 'generated/my-components/FlSearchBar';

export default class FlSearchBar extends FlSearchBarDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
}
