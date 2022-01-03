import Application from '@smartface/native/application';
import System from '@smartface/native/device/system';
import Button from '@smartface/native/ui/button';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import PgProductDetailDesign from 'generated/pages/pgProductDetail';
import store from 'store';

export default class PgProductDetail extends PgProductDetailDesign {
    router: any;
    leftItem: HeaderBarItem;
    rightItem: HeaderBarItem;
    routeData: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.headerBar.title = '';
        this.btnAddToBasket.text = global.lang.addToBasket;
    }
    addLeftItem() {
        this.leftItem = new HeaderBarItem();
        this.leftItem.image = 'images://backbtn.png';
        this.leftItem.color = Color.BLACK;
        this.headerBar.setLeftItem(this.leftItem);
    }
    addRightItem() {
        this.rightItem = new HeaderBarItem();
        this.rightItem.image = 'images://share.png';
        this.rightItem.color = Color.BLACK;
        this.headerBar.setItems([this.rightItem]);
    }
    addToBasket() {
        this.btnAddToBasket.on(Button.Events.Touch, () => {
            console.log('Store', store.getState().products);
            let product = store.getState().products.find((product) => product.id == this.routeData.productId);
            console.log('Product:', product);
            store.dispatch({
                type: 'ADD_TO_BASKET',
                payload: {
                    data: {
                        product: product,
                        count: 1
                    }
                }
            });
            this.toggleToast(true);
            this.flAlert.title = 'Sepete Eklendi';
            setTimeout(() => {
                this.toggleToast(false);
            }, 2000);
        });
    }
    addToFavorite() {
        this.imgFavorite.on(View.Events.TouchEnded, () => {
            if (
                store.getState().favorites &&
                store.getState().favorites.length > 0 &&
                store.getState().favorites.some((product) => product.id === this.routeData.productId)
            ) {
                store.dispatch({
                    type: 'REMOVE_FROM_FAVORITES',
                    payload: {
                        data: {
                            productId: this.routeData.productId
                        }
                    }
                });
                this.imgFavorite.image = Image.createFromFile('images://favourite.png');
            } else {
                store.dispatch({
                    type: 'ADD_TO_FAVORITES',
                    payload: {
                        data: {
                            product: store.getState().products.find((product) => product.id == this.routeData.productId)
                        }
                    }
                });
                this.imgFavorite.image = Image.createFromFile('images://favorited.png');
            }
        });
    }
    toggleToast(toggle: boolean): void {
        this.flAlert.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                visible: toggle
            }
        });
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgProductDetail, superOnShow: () => void) {
    superOnShow();

    if (System.OS !== 'iOS') {
        Application.statusBar.visible = true;
        Application.statusBar.backgroundColor = Color.create('#F2F3F2');
    }

    console.log('Router Data ', this.routeData);
    this.productDetailPrice.text = `$${this.routeData.productPrice}`;
    this.productDetailDesc.text = this.routeData.productDescription;
    this.imgProductDetail.image = Image.createFromFile(`images://${this.routeData.productImg}`);
    this.productDetailName.text = this.routeData.productName;
    this.addToBasket();
    this.addToFavorite();
    if (
        store.getState().favorites &&
        store.getState().favorites.length > 0 &&
        store.getState().favorites.some((product) => product.id === this.routeData.productId)
    ) {
        this.imgFavorite.image = Image.createFromFile('images://favorited.png');
    } else {
        this.imgFavorite.image = Image.createFromFile('images://favourite.png');
    }
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgProductDetail, superOnLoad: () => void) {
    superOnLoad();
    this.addLeftItem();
    this.addRightItem();
    this.scrollView2.autoSizeEnabled = true;
    this.scrollView2.layout.applyLayout;
}
