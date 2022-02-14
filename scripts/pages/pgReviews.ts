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
                this.router.push('addReview', { product: this.route.getState().routeData?.product });
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
                    productRate: this.rating?.toString() || NO_RATE.toString()
                })
            );
            this.reviews.forEach((review, index, arr) =>
                processorItems.push(
                    ListViewItems.getLviReview({
                        name: review.name,
                        star: `${review.star}`,
                        comment: review.comment,
                        showSeparator: arr.length - 1 !== index
                    })
                )
            );
        }
        return processorItems;
    }
    async fetchProductReviews() {
        try {
            const reviewsResponse = await getReviewsByProduct(this.route.getState().routeData.productId);
            if (reviewsResponse) {
                this.reviews = reviewsResponse;
                this.rating = this.reviews.reduce((prev, curr) => prev + curr.star, 0) / this.reviews.length;
            }
            return reviewsResponse;
        } catch (error) {
            throw new Error(global.lang.reviewsServiceError);
        } finally {
            this.refreshListView();
        }
    }

    public onShow() {
        super.onShow?.();
        this.addRightItem();
        this.handleRightItem();
        this.fetchProductReviews();
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
