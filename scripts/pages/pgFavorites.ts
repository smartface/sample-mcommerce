import PgFavoritesDesign from 'generated/pages/pgFavorites';
import store from '../store/index';
import storeActions from 'store/main/actions';
import ListView from '@smartface/native/ui/listview';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowSwipe, onRowType } from 'lib/listView';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { getProductImageUrl } from 'service/commerce';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { themeService } from 'theme';
import setVisibility from 'lib/setVisibility';
import { Product } from 'types';

type Processor = ListViewItems.ProcessorTypes.ILviFavorites;
enum HeaderEnum {
    Select = 1,
    Cancel = -1,
    NoHeader = 0
}
export default class PgFavorites extends withDismissAndBackButton(PgFavoritesDesign) {
    private selectedProducts: Product[] = [];
    private selectable: boolean = false;
    favoriteProducts: Product[];
    data: Processor[];
    rightItemCancel: HeaderBarItem;
    rightItemSelect: HeaderBarItem;
    changeHeaderText: boolean = false;
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    initAddToCartButton() {
        this.flCartCheckout.checkoutTitle = global.lang.addToBasket;
        setVisibility(this.flCartCheckout.lblCartCheckoutPrice, false);
    }
    addToCartSelectedProducts() {
        this.flCartCheckout.btnCartCheckout.onPress = () => {
            this.selectedProducts.forEach((product, index) => {
                store.dispatch(storeActions.AddToBasket({ product, count: 1 }));
                store.dispatch(storeActions.RemoveFromFavorites({ productId: product._id }));
                this.selectedProducts.splice(index, 1);
            });
            this.refreshListView();
        };
    }
    handleChange() {
        if (this.favoriteProducts.length !== 0) {
            if (this.changeHeaderText) {
                this.addCancelToHeaderBar();
                setVisibility(this.flCartCheckout, true);
            } else {
                this.addSelectToHeaderBar();
                setVisibility(this.flCartCheckout, false);
            }
            this.layout.applyLayout();
        } else {
            setVisibility(this.flCartCheckout, false);
            this.headerBar.setItems([]);
            this.layout.applyLayout();
        }
    }
    addCancelToHeaderBar() {
        this.rightItemCancel = new HeaderBarItem({
            title: global.lang.cancel,
            color: themeService.getNativeStyle('.sf-headerBar.cancel').itemColor,
            onPress: () => {
                this.changeHeaderText = false;
                this.refreshListView();
            }
        });
        this.headerBar.setItems([this.rightItemCancel]);
    }
    addSelectToHeaderBar() {
        this.rightItemSelect = new HeaderBarItem({
            //Native › NTVE-435
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor,
            title: global.lang.select,
            onPress: () => {
                this.changeHeaderText = true;
                this.refreshListView();
            }
        });
        this.headerBar.setItems([this.rightItemSelect]);
    }
    deleteAndRefresh(e: { index: number }): void {
        let length = this.favoriteProducts.length;
        let removedItem = this.favoriteProducts.find((product, index) => index === e.index);
        this.favoriteProducts.splice(e.index, 1);
        store.dispatch(storeActions.RemoveFromFavorites({ productId: removedItem._id }));
        this.refreshListView();
    }

    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.onRowSwipe = onRowSwipe.bind(this);
        this.lvMain.refreshEnabled = false;
        this.lvMain.onRowSelected = (item, index: number) => {
            if (!this.changeHeaderText) {
                this.router.push('productDetail', {
                    productId: this.favoriteProducts[index]._id
                });
            } else {
                if (!this.selectedProducts.includes(this.favoriteProducts[index])) {
                    this.selectedProducts.push(this.favoriteProducts[index]);
                } else {
                    this.selectedProducts.splice(index, 1);
                }
                this.refreshListView();
            }
        };
        this.lvMain.onRowCanSwipe = (index: number) => {
            if (!this.changeHeaderText) {
                this.selectedProducts.splice(index, 1);
                return [ListView.SwipeDirection.RIGHTTOLEFT];
            } else {
                return [];
            }
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
        this.handleChange();
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
                let selected = this.selectedProducts.some((sp) => favouritedItem._id === sp._id);
                processorItems.push(
                    ListViewItems.getLviFavorites(
                        {
                            itemTitle: favouritedItem.name,
                            itemDesc: favouritedItem.shortDescription,
                            itemImage: favouritedItem.images ? getProductImageUrl(favouritedItem.images[0]) : null,
                            itemPrice:
                                favouritedItem.discountPrice != undefined
                                    ? `$${favouritedItem?.discountPrice?.toFixed(2)}`
                                    : `$${favouritedItem.price.toFixed(2)}`,
                            showCheck: this.changeHeaderText,
                            showArrow: !this.changeHeaderText,
                            toggle: selected
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
        this.handleChange();
        this.addToCartSelectedProducts();
        this.refreshListView();
    }
    onLoad() {
        super.onLoad();
        this.initAddToCartButton();
        this.initListView();
        this.refreshListView();
        this.headerBar.leftItemEnabled = false;
        this.headerBar.title = global.lang.favouriteHeader;
    }
}
