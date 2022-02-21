import FavoritesListViewItemDesign from 'generated/my-components/FavoritesListViewItem';

export default class FavoritesListViewItem extends FavoritesListViewItemDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
}
