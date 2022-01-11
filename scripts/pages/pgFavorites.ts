import PgFavoritesDesign from 'generated/pages/pgFavorites';
import lviFavorites from 'components/LviFavorites';
import store from '../store/index';
import Image from '@smartface/native/ui/image';
import Color from '@smartface/native/ui/color';
import LviFavorites from 'components/LviFavorites';
import ListView from '@smartface/native/ui/listview';
import System from '@smartface/native/device/system';
import Font from '@smartface/native/ui/font';
import View from '@smartface/native/ui/view';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowSwipe, onRowType } from 'lib/listView';

type Processor = ListViewItems.ProcessorTypes.ILviFavorites | ListViewItems.ProcessorTypes.ILviFavorites;

export default class PgFavorites extends PgFavoritesDesign {
    favoriteProducts: any;
    data: Processor[];
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    applyDimension(index: number, item: any): void {
        if (index == 0) {
            item.android.borderTopRightRadius = 5;
            item.android.borderTopLeftRadius = 5;
            item.android.borderBottomLeftRadius = 5;
            item.android.borderBottomRightRadius = 5;
        } else if (index == store.getState().products.length - 1) {
            item.android.borderTopRightRadius = 5;
            item.android.borderTopLeftRadius = 5;
            item.android.borderBottomLeftRadius = 5;
            item.android.borderBottomRightRadius = 5;
        } else {
            item.android.borderTopRightRadius = 5;
            item.android.borderTopLeftRadius = 5;
            item.android.borderBottomLeftRadius = 5;
            item.android.borderBottomRightRadius = 5;
        }
        item.android.paddingLeft = 230;
        item.android.paddingTop = 30;
        item.android.paddingRight = 15;
        item.android.paddingBottom = 20;
    }
    deleteAndRefresh(e: { index: number }): void {
        let length = this.favoriteProducts.length;
        let removedItem = this.favoriteProducts.find((product, index) => index === e.index);
        this.favoriteProducts.splice(e.index, 1);
        store.dispatch({
            type: 'REMOVE_FROM_FAVORITES',
            payload: {
                data: {
                    productId: removedItem.id
                }
            }
        });
        this.refreshListView();
    }

    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.onRowSwipe = onRowSwipe.bind(this);
        this.lvMain.refreshEnabled = false;
        // this.listView1.contentInset = { top: 10, bottom: 0 };
        this.lvMain.onRowCanSwipe = (index: number) => {
            return [ListView.SwipeDirection.RIGHTTOLEFT];
        };
        this.lvMain.onRowSwipe = (e: any): ListView.SwipeItem[] => {
            if (e.direction == ListView.SwipeDirection.RIGHTTOLEFT) {
                e.ios.expansionSettings.buttonIndex = 0;
                e.ios.expansionSettings.threshold = 1.5;
                e.ios.expansionSettings.fillOnTrigger = true;
                let deleteItem = new ListView.SwipeItem();
                deleteItem.text = 'Delete';
                deleteItem.backgroundColor = Color.RED;
                deleteItem.textColor = Color.create('#FFFFFF');
                deleteItem.icon = Image.createFromFile('images://cross.png');
                deleteItem.ios.isAutoHide = false;
                deleteItem.onPress = (e: any) => {
                    this.deleteAndRefresh(e);
                };
                this.applyDimension(e.index, deleteItem);
                return [deleteItem];
            }
        };
    }
    refreshListView() {
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        if (this.data && this.data.length > 0) {
            if (this.data[0].type === 'LVI_EMPTY_ITEM') {
                this.lvMain.swipeEnabled = false;
            } else {
                this.lvMain.swipeEnabled = true;
            }
        }
        this.lvMain.refreshData();
    }
    processor(): Processor[] {
        const processorItems = [];
        this.favoriteProducts = store.getState().favorites;
        if (this.favoriteProducts.length === 0) {
            processorItems.push(
                ListViewItems.getLviEmptyItem({
                    emptyImage: 'images://empty_favorite.png',
                    emptyTitle: global.lang.favoritesIsEmpty
                })
            );
        } else {
            this.favoriteProducts.forEach((favouritedItem) => {
                processorItems.push(
                    ListViewItems.getLviFavorites({
                        itemTitle: favouritedItem.name,
                        itemDesc: favouritedItem.description,
                        itemImage: favouritedItem.image,
                        itemPrice: favouritedItem.price
                    })
                );
            });
        }
        return processorItems;
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
    this.refreshListView();
    this.headerBar.title = global.lang.favouriteHeader;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgFavorites, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.leftItemEnabled = false;
    this.headerBar.title = 'Favorites';
    this.headerBar.backgroundColor = Color.WHITE;
    this.headerBar.android.elevation = 0;
    this.initListView();
    this.refreshListView();
}
