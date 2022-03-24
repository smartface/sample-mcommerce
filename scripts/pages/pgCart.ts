import PgCartDesign from 'generated/pages/pgCart';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import AlertView from '@smartface/native/ui/alertview';
import { Basket, Product } from 'types';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import store from 'store/index';
import storeActions from 'store/main/actions';
import { getProductImageUrl } from 'service/commerce';
import setVisibility from 'lib/setVisibility';
import { moneyFormatter } from 'lib/moneyFormatter';

type Processor = ListViewItems.ProcessorTypes.ILviCartItem | ListViewItems.ProcessorTypes.ILviCartItem;

enum CartOperationEnum {
    Add = 1,
    Remove = -1,
    Clear = 0
}
export default class PgCart extends withDismissAndBackButton(PgCartDesign) {
    cartProducts: Basket;
    data: Processor[];
    unsubscribe = null;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.flCartCheckout.onCheckoutClick = () => {
            alert('todo');
        };
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
        if (this.data && this.data.length > 0) {
            if (this.data[0].type === 'LVI_EMPTY_ITEM') {
                this.lvMain.onRowSelected = (item, index: number) => {
                    return;
                };
            } else if (this.data[0].type === 'LVI_CART_PRODUCTS') {
                this.lvMain.onRowSelected = (item, index: number) => {
                    this.router.push('productDetail', {
                        productId: this.cartProducts[index]._id
                    });
                };
            }
        }
        this.lvMain.refreshData();
    }
    processor(): Processor[] {
        const processorItems = [];
        this.cartProducts = store.getState().main.basket;
        if (this.cartProducts.length === 0) {
            this.flCartCheckout.visible = false;
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
                        productInfo: cart.shortDescription,
                        productImage: cart.images ? getProductImageUrl(cart.images[0]) : null,
                        productDiscount: cart.discountPrice != undefined ? moneyFormatter(cart?.discountPrice) : '',
                        productPrice: moneyFormatter(cart.price),
                        productCount: cart.count,
                        minusButtonIcon: cart.count === 1 ? '' : '',
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
                                        type: AlertView.Android.ButtonType.NEGATIVE,
                                        onClick: () => {}
                                    }
                                ]
                            });
                        }
                    })
                );
            });
            this.calculateCheckoutPrice();
        }

        return processorItems;
    }
    calculateCheckoutPrice() {
        if (store.getState().main.basket.length > 0) {
            this.flCartCheckout.checkoutTitle = global.lang.goToCheckout;
            this.flCartCheckout.checkoutPrice = store
                .getState()
                .main.basket.reduce((total, product) => {
                    if (product.discountPrice != undefined) {
                        return total + product.discountPrice * product.count;
                    }
                    return total + product.price * product.count;
                }, 0)
                .toFixed(2);
            setVisibility(this.flCartCheckout, true);
        } else {
            setVisibility(this.flCartCheckout, false);
            this.unsubscribe();
        }
    }
    cartOperation(cart: Product, type: CartOperationEnum) {
        switch (type) {
            case CartOperationEnum.Add:
                return store.dispatch(storeActions.AddToBasket({ product: cart, count: 1 }));
            case CartOperationEnum.Remove:
                return store.dispatch(storeActions.AddToBasket({ product: cart, count: -1 }));
            case CartOperationEnum.Clear:
                return store.dispatch(storeActions.RemoveFromBasket({ productId: cart._id }));
        }
    }
    onShow() {
        super.onShow();
        this.refreshListView();
        this.unsubscribe = store.subscribe(() => this.calculateCheckoutPrice());
    }

    onLoad() {
        super.onLoad();
        this.headerBar.leftItemEnabled = false;
        this.headerBar.title = global.lang.mycartHeader;
        this.initListView();
    }
}
