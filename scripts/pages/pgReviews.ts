import PgReviewsDesign from 'generated/pages/pgReviews';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import LviReview from 'components/LviReview';
import LviAddReviewSection from 'components/LviAddReviewSection';
import { Product, Review } from 'types';
import { themeService } from 'theme';
import { getReviewsByProduct } from 'service/commerce';
import { NO_RATE } from 'constants';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import store from 'store';

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
    addRightItem() {
        this.rightItem = new HeaderBarItem({
            //Native › NTVE-435
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor,
            image: Image.createFromFile('images://share.png'),
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
                    review: this.route.getState().routeData?.product?.rating?.toString() || NO_RATE.toString()
                })
            );
            this.reviews.forEach((review) =>
                processorItems.push(
                    ListViewItems.getLviReview({
                        name: review.name,
                        star: `${review.star}`,
                        comment: review.comment,
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
        this.addRightItem();
        this.handleRightItem();
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
