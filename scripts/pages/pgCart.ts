import PgCartDesign from 'generated/pages/pgCart';
import store from 'store';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import AlertView from '@smartface/native/ui/alertview';
import { Basket, Product } from 'types';

type Processor = ListViewItems.ProcessorTypes.ILviCartItem | ListViewItems.ProcessorTypes.ILviCartItem;

enum CartOperationEnum {
    Add = 1,
    Remove = -1,
    Clear = 0
}
export default class PgCart extends PgCartDesign {
    cartProducts: Basket;
    data: Processor[];
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.refreshEnabled = false;
    }
    refreshListView() {
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
    processor(): Processor[] {
        const processorItems = [];
        this.cartProducts = store.getState().basket;
        if (this.cartProducts.length === 0) {
            processorItems.push(
                ListViewItems.getLviEmptyItem({
                    emptyImage: 'images://empty_cart.png',
                    emptyTitle: global.lang.shoppingCartIsEmpty
                })
            );
        } else {
            this.cartProducts.forEach((cart) => {
                processorItems.push(
                    ListViewItems.getLviCartProducts({
                        productName: cart.name,
                        productInfo: cart.description,
                        productImage: cart.image,
                        productPrice: cart.price,
                        productCount: cart.count,
                        onActionPlus: () => {
                            this.cartOperation(cart, CartOperationEnum.Add);
                            this.refreshListView();
                        },
                        onActionMinus: () => {
                            this.cartOperation(cart, CartOperationEnum.Remove);
                            this.refreshListView();
                        },
                        onRemoveAction: () => {
                            alert({
                                title: global.lang.delete,
                                message: global.lang.sureToDelete,
                                buttons: [
                                    {
                                        text: global.lang.delete,
                                        type: AlertView.Android.ButtonType.POSITIVE,
                                        onClick: () => {
                                            this.cartOperation(cart, CartOperationEnum.Clear);
                                            this.refreshListView();
                                        }
                                    },
                                    {
                                        text: global.lang.cancel,
                                        type: AlertView.Android.ButtonType.NEGATIVE
                                    }
                                ]
                            });
                        }
                    })
                );
            });
        }

        return processorItems;
    }
    cartOperation(cart: Product, type: number) {
        switch (type) {
            case 1:
                return store.dispatch({
                    type: 'ADD_TO_BASKET',
                    payload: {
                        data: {
                            product: cart,
                            count: 1
                        }
                    }
                });
                break;
            case -1:
                return store.dispatch({
                    type: 'ADD_TO_BASKET',
                    payload: {
                        data: {
                            product: cart,
                            count: -1
                        }
                    }
                });
                break;
            case 0:
                return store.dispatch({
                    type: 'REMOVE_FROM_BASKET',
                    payload: {
                        data: {
                            productId: cart.id
                        }
                    }
                });

            default:
                break;
        }
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgCart, superOnShow: () => void) {
    superOnShow();
    this.headerBar.title = global.lang.mycartHeader;
    this.refreshListView();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgCart, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.leftItemEnabled = false;
    this.initListView();
}
