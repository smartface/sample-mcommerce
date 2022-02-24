import PgFavoritesDesign from 'generated/pages/pgFavorites';
import store from '../store/index';
import storeActions from 'store/main/actions';
import ListView from '@smartface/native/ui/listview';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowSwipe, onRowType } from 'lib/listView';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { getProductImageUrl } from 'service/commerce';
import FlHeaderIcon from 'components/FlHeaderIcon';
import setHeaderIcon from 'lib/setHeaderIcon';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { themeService } from 'theme';
import setVisibility from 'lib/setVisibility';
import { Product } from 'types';

type Processor = ListViewItems.ProcessorTypes.ILviFavorites;

export default class PgFavorites extends withDismissAndBackButton(PgFavoritesDesign) {
    private selectedProducts: Product[] = [];
    private selectable: boolean = false;
    favoriteProducts: Product[];
    data: Processor[];
    rightItemCancel: HeaderBarItem;
    rightItemSelect: HeaderBarItem;
    flHeaderIcon: FlHeaderIcon;
    changeHeaderText: boolean = false;
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    initAddToCartButton() {
        this.flAddToCart.title = global.lang.addToBasket;
    }
    addToCartSelectedProducts() {
        if (this.selectedProducts.length) {
            this.flAddToCart.btnAddToCart.onPress = () => {
                this.selectedProducts.forEach((product, index) => {
                    store.dispatch(storeActions.AddToBasket({ product, count: 1 }));
                    store.dispatch(storeActions.RemoveFromFavorites({ productId: product._id }));
                });
            };
            this.selectedProducts = [];
        }
    }
    setRightItem() {
        this.rightItemSelect.title = this.changeHeaderText ? 'iptal' : 'sec';
        this.rightItemSelect.onPress = () => {
            this.changeHeaderText = true;
            this.refreshListView();
            this.selectable = !this.selectable;
            if (!this.selectable) {
                this.selectedProducts = [];
            }
            this.headerBar.setItems(this.changeHeaderText ? [this.rightItemSelect] : [this.rightItemSelect]);
            this.rightItemCancel.title = this.changeHeaderText ? 'nane' : 'limon';
        };
        this.rightItemCancel.onPress = () => {
            this.changeHeaderText = false;
            this.refreshListView();
        };
        this.headerBar.setItems(!this.changeHeaderText ? [this.rightItemSelect] : [this.rightItemCancel]);
    }
    handleChange() {
        if (this.favoriteProducts.length !== 0) {
            if (this.changeHeaderText) {
                this.addCancelToHeaderBar();
                setVisibility(this.flAddToCart, true);
            } else {
                this.addSelectToHeaderBar();
                setVisibility(this.flAddToCart, false);
            }
            this.layout.applyLayout();
        } else {
            setVisibility(this.flAddToCart, false);
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
    addAppIconToHeader() {
        this.headerBar.title = '';
        this.headerBar.titleLayout = setHeaderIcon(this.flHeaderIcon);
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
        this.lvMain.onRowCanSwipe = (index: number) => {
            if (!this.changeHeaderText) {
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
                            toggle: selected,
                            onToggleChange: () => {
                                this.selectable = !this.selectable;
                                if (this.selectable && !this.selectedProducts.includes(favouritedItem)) {
                                    this.addItemToSelectedProducts(selected);
                                } else if (selected == false && this.selectedProducts.includes(favouritedItem)) {
                                }
                            }
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
    addItemToSelectedProducts(product) {
        this.selectedProducts.push(product);
    }
    onShow() {
        super.onShow();
        this.handleChange();
        this.addToCartSelectedProducts();
        this.addAppIconToHeader();
        this.refreshListView();
    }
    onLoad() {
        super.onLoad();
        this.initAddToCartButton();
        this.initListView();
        this.refreshListView();
        this.headerBar.leftItemEnabled = false;
    }
}
