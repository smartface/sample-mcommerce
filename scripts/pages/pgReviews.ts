import PgReviewsDesign from 'generated/pages/pgReviews';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { Review } from 'types';
import { themeService } from 'theme';
import { getProductImageUrl, getReviewsByProduct } from 'service/commerce';
import { NO_RATE } from 'constants';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import store from 'store';

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
    countOfFiveStar: number = 0;
    countOfFourStar: number = 0;
    countOfThreeStar: number = 0;
    countOfTwoStar: number = 0;
    countOfOneStar: number = 0;
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
                    emptyTitle: global.lang.emptyReviewList
                })
            );
        } else {
            processorItems.push(
                ListViewItems.getLviReviewProduct({
                    productName: this.route.getState().routeData?.product?.name,
                    productImage: getProductImageUrl(this.route.getState().routeData?.product.images[0]),
                    productRate: this.rating?.toFixed(1).toString() || NO_RATE.toString(),
                    fiveStarCount: `(${this.countOfFiveStar})`,
                    fourStarCount: `(${this.countOfFourStar})`,
                    threeStarCount: `(${this.countOfThreeStar})`,
                    twoStarCount: `(${this.countOfTwoStar})`,
                    oneStarCount: `(${this.countOfOneStar})`
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
        const month = date.getMonth();
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
            const reviewsResponse = await getReviewsByProduct(this.route.getState().routeData.productId);
            if (reviewsResponse) {
                this.reviews = reviewsResponse;
                this.calculateRateCount();
                this.rating = this.reviews.reduce((prev, curr) => prev + curr.star, 0) / this.reviews.length;
            }
            return reviewsResponse;
        } catch (error) {
            throw new Error(global.lang.reviewsServiceError);
        } finally {
            this.initialized = true;
            this.refreshListView();
        }
    }
    calculateRateCount() {
        this.reviews.forEach((review) => {
            if (review.star == 5) {
                this.countOfFiveStar += 1;
            } else if (4 <= review.star && review.star < 5) {
                this.countOfFourStar += 1;
            } else if (3 <= review.star && review.star < 4) {
                this.countOfThreeStar += 1;
            } else if (2 <= review.star && review.star < 3) {
                this.countOfTwoStar += 1;
            } else if (1 <= review.star && review.star < 2) {
                this.countOfOneStar += 1;
            }
        });
    }
    public onShow() {
        super.onShow?.();
        this.checkNewRateAdded();
        if (!this.initialized) {
            this.fetchProductReviews();
        }
        this.addRightItem();
        this.handleRightItem();
        this.initBackButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
    }

    public onLoad() {
        super.onLoad?.();
        this.headerBar.title = global.lang.reviews;
        this.initListView();
    }
}
