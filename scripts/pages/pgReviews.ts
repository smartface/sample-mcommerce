import PgReviewsDesign from 'generated/pages/pgReviews';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { Review } from 'types';
import { themeService } from 'theme';
import { getProductImageUrl, getReviewsByProduct } from 'service/commerce';
import { NO_RATE, ON_SHOW_TIMEOUT } from 'constants';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import store from 'store';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
import { i18n } from '@smartface/i18n';

type Processor =
    | ListViewItems.ProcessorTypes.ILviReviewProduct[]
    | ListViewItems.ProcessorTypes.ILviReview[]
    | ListViewItems.ProcessorTypes.ILviEmptyItem;

export default class PgReviews extends withDismissAndBackButton(PgReviewsDesign) {
    data: Processor;
    reviews: Review[];
    rightItem: HeaderBarItem;
    rating: number;
    initialized: boolean = false;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.rating = this.route.getState().routeData?.product?.rating;
    }
    addRightItem() {
        this.rightItem = new HeaderBarItem({
            //Native › NTVE-435
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor,
            image: Image.createFromFile('images://rate_with_comment.png'),
            onPress: () => {
                this.router.push('addReview', {
                    product: this.route.getState().routeData?.product
                });
            }
        });
        this.headerBar.setItems([this.rightItem]);
    }

    handleRightItem() {
        if (store.getState().main.isUserLoggedIn) {
            this.addRightItem();
        } else {
            this.headerBar.setItems([]);
            this.layout.applyLayout();
        }
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
    processor() {
        const processorItems = [];
        if (this.reviews.length === 0) {
            processorItems.push(
                ListViewItems.getLviEmptyItem({
                    emptyImage: 'images://empty_star.png',
                    emptyTitle: `${i18n.instance.t('emptyReviewList')}`
                })
            );
        } else {
            const rates = this.calculateRateCounts();
            processorItems.push(
                ListViewItems.getLviReviewProduct({
                    productName: this.route.getState().routeData?.product?.name,
                    productImage: getProductImageUrl(this.route.getState().routeData?.product.images[0]),
                    productRate: this.rating?.toFixed(1).toString() || NO_RATE.toString(),
                    fiveStarCount: `(${rates[5] || 0})`,
                    fourStarCount: `(${rates[4] || 0})`,
                    threeStarCount: `(${rates[3] || 0})`,
                    twoStarCount: `(${rates[2] || 0})`,
                    oneStarCount: `(${rates[1] || 0})`
                })
            );
            this.reviews.forEach((review, index, arr) =>
                processorItems.push(
                    ListViewItems.getLviReview({
                        name: review.name,
                        star: `${review.star}`,
                        date: this.formatDate(review),
                        comment: review.comment,
                        showSeparator: arr.length - 1 !== index
                    })
                )
            );
        }
        return processorItems;
    }
    formatDate(review: Review) {
        const date = new Date(review?.createdAt);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }
    checkNewRateAdded() {
        if (store.getState().main.isRateAdded) {
            this.initialized = false;
        }
    }
    async fetchProductReviews() {
        try {
            showWaitDialog();
            const reviewsResponse = await getReviewsByProduct(this.route.getState().routeData.productId);
            if (reviewsResponse) {
                this.reviews = reviewsResponse;
                this.rating = this.reviews.reduce((prev, curr) => prev + curr.star, 0) / this.reviews.length;
            }
            return reviewsResponse;
        } catch (error) {
            throw new Error(`${i18n.instance.t('reviewsServiceError')}`);
        } finally {
            this.initialized = true;
            this.refreshListView();
            hideWaitDialog();
        }
    }
    calculateRateCounts(): Record<string, number> {
        const rates = {};
        this.reviews.forEach((review) => {
            if (rates[review.star]) {
                rates[review.star] += 1;
            } else {
                rates[review.star] = 1;
            }
        });
        return rates;
    }
    public onShow() {
        super.onShow?.();
        this.checkNewRateAdded();
        if (!this.initialized) {
            setTimeout(() => this.fetchProductReviews(), ON_SHOW_TIMEOUT);
        }
        this.addRightItem();
        this.handleRightItem();
        this.initBackButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
    }

    public onLoad() {
        super.onLoad?.();
        this.headerBar.title = `${i18n.instance.t('reviews')}`;
        this.initListView();
    }
}
