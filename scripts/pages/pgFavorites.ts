import Application from '@smartface/native/application';
import PgFavoritesDesign from 'generated/pages/pgFavorites';
import favoritesList from 'components/FavoritesListViewItem'
import lviFavorites from 'components/LviFavorites'
import store from '../store/index'
import Image from '@smartface/native/ui/image';

export default class PgFavorites extends PgFavoritesDesign {
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
	}
    initFavoriteList(){
        const products = store.getState().products;
        this.listView1.itemCount = products.length;        
        this.listView1.onRowBind = (listViewItem:lviFavorites, index: number) => {
            listViewItem.lblFavoriteItemPrice.text = `$${products[index].price}`;
            listViewItem.lblFavoriteItemTitle.text = products[index].name;
            listViewItem.lblFavroiteItemDesc.text = products[index].description
            listViewItem.imgFavoriteItem.image = Image.createFromFile(`images://${products[index].image}`)
        };
        this.listView1.refreshData();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgFavorites, superOnShow: () => void) {
	superOnShow();
    this.headerBar.title = 'Favorites'
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgFavorites, superOnLoad: () => void) {
	superOnLoad();
    this.initFavoriteList();
}
