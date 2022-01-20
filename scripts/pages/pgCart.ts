import PgCartDesign from 'generated/pages/pgCart';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import AlertView from '@smartface/native/ui/alertview';
import { Basket, Product } from 'types';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import store from 'store/index';
import storeActions from 'store/main/actions';

type Processor = ListViewItems.ProcessorTypes.ILviCartItem | ListViewItems.ProcessorTypes.ILviCartItem;

enum CartOperationEnum {
    Add = 1,
    Remove = -1,
    Clear = 0
}
export default class PgCart extends withDismissAndBackButton(PgCartDesign) {
    cartProducts: Basket;
    data: Processor[];
    constructor(private router?: Router, private route?: Route) {
        super({});
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
        this.cartProducts = store.getState().main.basket;
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
    cartOperation(cart: Product, type: CartOperationEnum) {
        switch (type) {
            case CartOperationEnum.Add:
                return store.dispatch(storeActions.AddToBasket({ product: cart, count: 1 }));
                break;
            case CartOperationEnum.Remove:
                return store.dispatch(storeActions.AddToBasket({ product: cart, count: 1 }));
                break;
            case CartOperationEnum.Clear:
                return store.dispatch(storeActions.RemoveFromBasket({ productId: cart.id }));
            default:
                break;
        }
    }
    onShow() {
        super.onShow();
        this.headerBar.title = global.lang.mycartHeader;
        this.refreshListView();
    }

    onLoad() {
        super.onLoad();
        this.headerBar.leftItemEnabled = false;
        this.initListView();
    }
}
