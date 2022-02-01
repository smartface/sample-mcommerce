import PgReviewsDesign from 'generated/pages/pgReviews';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import LviReview from 'components/LviReview';
import LviAddReviewSection from 'components/LviAddReviewSection';
import { Review } from 'types';
import { themeService } from 'theme';
import { getReviewsByProduct } from 'service/commerce';

type Processor =
    | ListViewItems.ProcessorTypes.ILviReview[]
    | ListViewItems.ProcessorTypes.ILviEmptyItem
    | ListViewItems.ProcessorTypes.ILviAddReviewSection;

export default class PgReviews extends withDismissAndBackButton(PgReviewsDesign) {
    data: Processor;
    reviews: Review[];
    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.onRowSelected = (item: LviAddReviewSection | LviReview, index) => {};
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
                ListViewItems.getLviAddReviewSection({
                    //review: get average review
                    review: '4.8',
                    image: 'images://small_star.png',
                    addReviewText: global.lang.addReview,
                    mainOnClick: () => {
                        this.router.push('addReview');
                    }
                })
            );
            this.reviews.forEach((review) =>
                processorItems.push(
                    ListViewItems.getLviReview({
                        name: review.name,
                        star: `${review.star}`,
                        comment: review.comment,
                        image: 'images://small_star.png',
                        showSeparator: true
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
            }
            return reviewsResponse;
        } catch (error) {
            //TODO
            throw new Error(global.lang.productServiceError);
        } finally {
            this.refreshListView();
        }
    }

    public onShow() {
        super.onShow?.();
        this.fetchProductReviews();
        this.initDismissButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
    }

    public onLoad() {
        super.onLoad?.();
        this.headerBar.title = global.lang.reviewHeader;
        this.initListView();
    }
}
