import Color from '@smartface/native/ui/color';
import Font from '@smartface/native/ui/font';
import Dialog from '@smartface/native/ui/dialog';
import LviCartItem from 'components/LviCartItem';
import PgCartDesign from 'generated/pages/pgCart';
import store from 'store';
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import AlertView from '@smartface/native/ui/alertview';

type Processor = ListViewItems.ProcessorTypes.ILviCartItem | ListViewItems.ProcessorTypes.ILviCartItem;

export default class PgCart extends PgCartDesign {
    unsubscribe: any;
    basketItems: any;
    rightItem: HeaderBarItem;
    cartProducts: any;
    data: Processor[];
    myDialog = new Dialog();
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        // this.rightItem.onPress = () => {
        //   this.myDialog.show();
        // };
        //this.btnGoToCheckOut.text = global.lang.goToCheckout;
    }
    addRightItem() {
        this.rightItem = new HeaderBarItem();
        this.rightItem.title = 'Select';
        this.rightItem.font = Font.create('Nunito', 16);
        this.rightItem.color = Color.BLACK;
        this.headerBar.setItems([this.rightItem]);
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
                            this.cartOperation(cart, 1);
                            this.refreshListView();
                        },
                        onActionMinus: () => {
                            this.cartOperation(cart, -1);
                            this.refreshListView();
                        },
                        onRemoveAction: () => {
                            // this.toggleDialog(true, cart);
                            alert({
                                title: global.lang.delete,
                                message: global.lang.sureToDelete,
                                buttons: [
                                    {
                                        text: global.lang.delete,
                                        type: AlertView.Android.ButtonType.POSITIVE,
                                        onClick: () => {
                                            this.cartOperation(cart, 'all');
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
    cartOperation(cart, type) {
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
            case 'all':
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
    this.basketItems = store.getState().basket;
    this.refreshListView();
    // this.unsubscribe = store.subscribe(this.getBasketItems)
    // this.unsubscribe();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgCart, superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.leftItemEnabled = false;
    this.headerBar.backgroundColor = Color.WHITE;
    this.headerBar.android.elevation = 0;
    this.initListView();
    this.refreshListView();
    // this.addRightItem();
}
