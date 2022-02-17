import Button from '@smartface/native/ui/button';
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
import { getProduct, getProductImageUrl } from 'service/commerce';
import { Product } from 'types';
import LviPdOverviewSection from 'components/LviPdOverviewSection';
import Share from '@smartface/native/global/share';
import { generateProductDeeplinkUrl } from 'lib/deeplink';

type Processor =
    | ListViewItems.ProcessorTypes.ILviGenericSlider
    | ListViewItems.ProcessorTypes.ILviPdTitleLikeSection
    | ListViewItems.ProcessorTypes.ILviPdButtonPriceSection
    | ListViewItems.ProcessorTypes.ILviPdInfoSection
    | ListViewItems.ProcessorTypes.ILviPdOverviewSection;

export default class PgProductDetail extends withDismissAndBackButton(PgProductDetailDesign) {
    data: Processor[];
    product: Product;
    productCounter = 1;
    productFavoriteImg = 'images://favourite.png';
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    addRightItem() {
        const rightItem = new HeaderBarItem({
            image: Image.createFromFile('images://share.png'),
            onPress: () => Share.shareText(generateProductDeeplinkUrl(this.product._id), this, []),
            //Native › NTVE-435
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
        this.headerBar.setItems([rightItem]);
    }
    addToBasket() {
        this.btnAddToBasket.on(Button.Events.Press, () => {
            store.dispatch(storeActions.AddToBasket({ product: this.product, count: this.productCounter }));
            this.toggleToast(true);
            this.flAlert.title = global.lang.addToCart;
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
        this.lvMain.onRowSelected = (item: LviPdOverviewSection, index) => {
            if (item instanceof LviPdOverviewSection) {
                if (item.overviewTitle === global.lang.reviews) {
                    this.router.push('reviews', { productId: this.product._id, product: this.product });
                } else if (item.overviewTitle === global.lang.nutritions) {
                    this.router.push('nutritions', { productId: this.product._id, product: this.product });
                }
            }
        };
    }
    refreshListView() {
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
    processor(): Processor[] {
        const isThisProductFavourited = store
            .getState()
            .main?.favorites?.some((product) => product._id === this.route.getState().routeData?.productId);
        this.productFavoriteImg = isThisProductFavourited ? 'images://favorited.png' : 'images://favourite.png';
        const processorItems = [
            ListViewItems.getLviGenericSlider({
                images: this.product.images.map((image) => {
                    return getProductImageUrl(image);
                })
            })
        ];
        processorItems.push(
            ListViewItems.getLviPdTitleLikeSection({
                productTitle: this.product.name,
                productMeas: this.product.shortDescription,
                favoriteImg: this.productFavoriteImg,
                onFavoriteClick: () => {
                    if (
                        store.getState().main.favorites &&
                        store.getState().main.favorites.length > 0 &&
                        store.getState().main.favorites.some((product) => product._id === this.route.getState().routeData.productId)
                    ) {
                        store.dispatch(storeActions.RemoveFromFavorites({ productId: this.route.getState().routeData.productId }));
                        this.productFavoriteImg = 'images://favourite.png';
                        this.refreshListView();
                    } else {
                        store.dispatch(
                            storeActions.AddToFavorites({
                                product: this.product
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
                productDiscount: !!this.product.discountPrice ? `$${this.product.discountPrice.toFixed(2)}` : '',
                productPrice: `$${this.product.price.toFixed(2)}`,
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
                productTitle: global.lang.productDetail,
                productInfo: this.product.description
            })
        );
        processorItems.push(
            ListViewItems.getLviPdOverviewSection({
                overviewTitle: global.lang.nutritions,
                showRating: false
            })
        );
        processorItems.push(
            ListViewItems.getLviPdOverviewSection({
                overviewTitle: global.lang.reviews,
                rating: this.product?.rating?.toString(),
                countOfReviews: `(${this.product?.reviews?.length})`,
                showRating: true
            })
        );

        return processorItems;
    }

    async fetchProduct() {
        try {
            const productResponse = await getProduct(this.route.getState().routeData.productId);
            if (productResponse) {
                this.product = productResponse;
            }
            return productResponse;
        } catch (error) {
            throw new Error(global.lang.productServiceError);
        } finally {
            this.refreshListView();
        }
    }

    onShow() {
        super.onShow();
        this.fetchProduct();
        this.addRightItem();
        this.initDismissButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
    }

    onLoad() {
        super.onLoad();
        this.headerBar.title = global.lang.productDetail;
        this.btnAddToBasket.text = global.lang.addToBasket;
        this.addToBasket();
        this.initListView();
    }
}
