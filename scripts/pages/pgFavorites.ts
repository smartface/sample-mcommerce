import PgFavoritesDesign from 'generated/pages/pgFavorites';
import store from '../store/index';
import storeActions from 'store/main/actions';
import Image from '@smartface/native/ui/image';
import Color from '@smartface/native/ui/color';
import ListView from '@smartface/native/ui/listview';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowSwipe, onRowType } from 'lib/listView';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { getProductImageUrl } from 'service/commerce';
import FlHeaderIcon from 'components/FlHeaderIcon';
import setHeaderIcon from 'lib/setHeaderIcon';

type Processor = ListViewItems.ProcessorTypes.ILviFavorites;

export default class PgFavorites extends withDismissAndBackButton(PgFavoritesDesign) {
    favoriteProducts: any[];
    data: Processor[];
    flHeaderIcon: FlHeaderIcon;
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    addAppIconToHeader() {
        this.headerBar.title = '';
        this.headerBar.titleLayout = setHeaderIcon(this.flHeaderIcon);
    }
    deleteAndRefresh(e: { index: number }): void {
        let length = this.favoriteProducts.length;
        let removedItem = this.favoriteProducts.find((product, index) => index === e.index);
        this.favoriteProducts.splice(e.index, 1);
        store.dispatch(storeActions.RemoveFromBasket({ productId: removedItem.id }));
        this.refreshListView();
    }

    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.onRowSwipe = onRowSwipe.bind(this);
        this.lvMain.refreshEnabled = false;
        this.lvMain.onRowCanSwipe = (index: number) => {
            return [ListView.SwipeDirection.RIGHTTOLEFT];
        };
        this.lvMain.onRowSwipe = onRowSwipe.bind(this);
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
        this.favoriteProducts = store.getState().main.favorites;
        if (this.favoriteProducts.length === 0) {
            processorItems.push(
                ListViewItems.getLviEmptyItem({
                    emptyImage: 'images://empty_favorite.png',
                    emptyTitle: global.lang.favoritesIsEmpty
                })
            );
        } else {
            this.favoriteProducts.forEach((favouritedItem, index) => {
                processorItems.push(
                    ListViewItems.getLviFavorites(
                        {
                            itemTitle: favouritedItem.name,
                            itemDesc: favouritedItem.shortDescription,
                            itemImage: favouritedItem.images ? getProductImageUrl(favouritedItem.images[0]) : null,
                            itemPrice:
                                favouritedItem.discountPrice != undefined
                                    ? `$${favouritedItem?.discountPrice?.toFixed(2)}`
                                    : `$${favouritedItem.price.toFixed(2)}`
                        },
                        {
                            onDelete: () => {
                                return new Promise((resolve) => {
                                    this.deleteAndRefresh({ index });
                                    resolve();
                                });
                            }
                        }
                    )
                );
            });
        }
        return processorItems;
    }
    onShow() {
        super.onShow();
        this.addAppIconToHeader();
        this.refreshListView();
    }
    onLoad() {
        super.onLoad();
        this.initListView();
        this.refreshListView();
        this.headerBar.leftItemEnabled = false;
    }
}
