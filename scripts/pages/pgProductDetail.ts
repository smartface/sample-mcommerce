import Button from '@smartface/native/ui/button';
import Color from '@smartface/native/ui/color';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import PgProductDetailDesign from 'generated/pages/pgProductDetail';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import store from 'store/index';
import storeActions from 'store/main/actions';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import { themeService } from 'theme';
type Processor =
    | ListViewItems.ProcessorTypes.ILviGenericSlider
    | ListViewItems.ProcessorTypes.ILviPdTitleLikeSection
    | ListViewItems.ProcessorTypes.ILviPdButtonPriceSection
    | ListViewItems.ProcessorTypes.ILviPdInfoSection
    | ListViewItems.ProcessorTypes.ILviPdOverviewSection;

export default class PgProductDetail extends withDismissAndBackButton(PgProductDetailDesign) {
    data: Processor[];
    productCounter = 1;
    productFavoriteImg = 'images://favourite.png';
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    addRightItem() {
        const rightItem = new HeaderBarItem({
            image: Image.createFromFile('images://share.png')
        });
        this.headerBar.setItems([rightItem]);
    }
    addToBasket() {
        //@ts-ignore FIX THIS AFTER EVENT FIX TODO
        this.btnAddToBasket.on(Button.Events.Press, () => {
            let product = store.getState().main.products.find((product) => product.id == this.route.getState().routeData.productId);
            store.dispatch(storeActions.AddToBasket({ product: product, count: this.productCounter }));
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
            ListViewItems.getLviGenericSlider({
                images: [`images://${this.route.getState().routeData.productImg}`, `images://${this.route.getState().routeData.productImg}`]
            })
        ];
        processorItems.push(
            ListViewItems.getLviPdTitleLikeSection({
                productTitle: this.route.getState().routeData.productName,
                productMeas: this.route.getState().routeData.productDescription,
                favoriteImg: this.productFavoriteImg,
                onFavoriteClick: () => {
                    if (
                        store.getState().main.favorites &&
                        store.getState().main.favorites.length > 0 &&
                        store.getState().main.favorites.some((product) => product.id === this.route.getState().routeData.productId)
                    ) {
                        store.dispatch(storeActions.RemoveFromFavorites({ productId: this.route.getState().routeData.productId }));
                        this.productFavoriteImg = 'images://favourite.png';
                        this.refreshListView();
                    } else {
                        store.dispatch(
                            storeActions.AddToFavorites({
                                product: store
                                    .getState()
                                    .main.products.find((product) => product.id == this.route.getState().routeData.productId)
                            })
                        );
                        this.productFavoriteImg = 'images://favorited.png';
                        this.refreshListView();
                    }
                }
            })
        );

        processorItems.push(
            ListViewItems.getLviPdButtonPriceSection({
                productPrice: this.route.getState().routeData.productPrice,
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
                productInfo: 'Lorem ipsum dolor sit amets'
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
            store.getState().main.favorites &&
            store.getState().main.favorites.length > 0 &&
            store.getState().main.favorites.some((product) => product.id === this.route.getState().routeData.productId)
        ) {
            this.productFavoriteImg = 'images://favorited.png';
            this.refreshListView();
        } else {
            this.productFavoriteImg = 'images://favourite.png';
            this.refreshListView();
        }
    }

    onShow() {
        super.onShow();
        this.checkIfFavorited();
        this.addRightItem();
        this.refreshListView();
        this.initDismissButton(this.router);
    }

    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.productDetail;
        this.btnAddToBasket.text = global.lang.addToBasket;
        this.addToBasket();
        this.initListView();
    }
}
