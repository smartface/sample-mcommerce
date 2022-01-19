import Application from '@smartface/native/application';
import System from '@smartface/native/device/system';
import Button from '@smartface/native/ui/button';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';
import PgProductDetailDesign from 'generated/pages/pgProductDetail';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import store from 'store';
import { ThemeService } from 'theme';

type Processor =
    | ListViewItems.ProcessorTypes.ILviPdSlider
    | ListViewItems.ProcessorTypes.ILviPdTitleLikeSection
    | ListViewItems.ProcessorTypes.ILviPdButtonPriceSection
    | ListViewItems.ProcessorTypes.ILviPdInfoSection
    | ListViewItems.ProcessorTypes.ILviPdOverviewSection;

export default class PgProductDetail extends PgProductDetailDesign {
    router: any;
    data: Processor[];
    routeData: any;
    productCounter = 1;
    productFavoriteImg = 'images://favourite.png';
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    addLeftItem() {
        const leftItem = new HeaderBarItem({
            image: Image.createFromFile('images://backbtn.png'),
            color: Color.BLACK
        });
        this.headerBar.setLeftItem(leftItem);
    }
    addRightItem() {
        const rightItem = new HeaderBarItem({
            image: Image.createFromFile('images://share.png'),
            color: Color.BLACK
        });
        this.headerBar.setItems([rightItem]);
    }
    addToBasket() {
        this.btnAddToBasket.on(Button.Events.Touch, () => {
            let product = store.getState().products.find((product) => product.id == this.routeData.productId);
            store.dispatch({
                type: 'ADD_TO_BASKET',
                payload: {
                    data: {
                        product: product,
                        count: this.productCounter
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
    toggleToast(toggle: boolean): void {
        this.flAlert.dispatch({
            type: 'updateUserStyle',
            userStyle: {
                visible: toggle
            }
        });
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
        const processorItems = [
            ListViewItems.getLviPdSlider({
                images: [`images://${this.routeData.productImg}`, `images://${this.routeData.productImg}`]
            })
        ];
        processorItems.push(
            ListViewItems.getLviPdTitleLikeSection({
                productTitle: this.routeData.productName,
                productMeas: this.routeData.productDescription,
                favoriteImg: this.productFavoriteImg,
                onFavoriteClick: () => {
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
                        this.productFavoriteImg = 'images://favourite.png';
                        this.refreshListView();
                    } else {
                        store.dispatch({
                            type: 'ADD_TO_FAVORITES',
                            payload: {
                                data: {
                                    product: store.getState().products.find((product) => product.id == this.routeData.productId)
                                }
                            }
                        });
                        this.productFavoriteImg = 'images://favorited.png';
                        this.refreshListView();
                    }
                }
            })
        );

        processorItems.push(
            ListViewItems.getLviPdButtonPriceSection({
                productPrice: this.routeData.productPrice,
                productCount: this.productCounter.toString(),
                onPlusClick: () => {
                    this.productCounter += 1;
                    this.refreshListView();
                },
                onMinusClick: () => {
                    if (this.productCounter === 1) {
                        return;
                    } else {
                        this.productCounter -= 1;
                        this.refreshListView();
                    }
                }
            })
        );

        processorItems.push(
            ListViewItems.getLviPdInfoSection({
                productTitle: 'Product Detail',
                productInfo: 'Lorem ipsum dolor sit amet'
            })
        );
        processorItems.push(
            ListViewItems.getLviPdOverviewSection({
                overviewTitle: 'Nutritions'
            })
        );
        processorItems.push(
            ListViewItems.getLviPdOverviewSection({
                overviewTitle: 'Reviews'
            })
        );

        return processorItems;
    }

    checkIfFavorited() {
        if (
            store.getState().favorites &&
            store.getState().favorites.length > 0 &&
            store.getState().favorites.some((product) => product.id === this.routeData.productId)
        ) {
            this.productFavoriteImg = 'images://favorited.png';
            this.refreshListView();
        } else {
            this.productFavoriteImg = 'images://favourite.png';
            this.refreshListView();
        }
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
    this.checkIfFavorited();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgProductDetail, superOnLoad: () => void) {
    superOnLoad();
    this.addRightItem();
    // this.addLeftItem();
    this.headerBar.title = global.lang.productDetail;
    this.btnAddToBasket.text = global.lang.addToBasket;
    this.addToBasket();
    this.initListView();
    this.refreshListView();
}
