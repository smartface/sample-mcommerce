import PgAddReviewDesign from 'generated/pages/pgAddReview';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import { themeService } from 'theme';
import { Product } from 'types';
import { getProductImageUrl, postProductReview } from 'service/commerce';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
import { NO_RATE } from 'constants';
import Button from '@smartface/native/ui/button';

export default class PgAddReview extends withDismissAndBackButton(PgAddReviewDesign) {
    product: Product;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.btnSendReview.text = global.lang.addReview;
        this.btnSendReview.on(Button.Events.Press, () => {
            this.postReview(this.product._id, this.flReviewAndRateProduct.rate, this.flReviewAndRateProduct.comment);
        });
    }

    initReviewProduct() {
        this.flReviewAndRateProduct.productName = this.product.name;
        this.flReviewAndRateProduct.productImage = getProductImageUrl(this.product.images[0]);
        this.flReviewAndRateProduct.imageStar = 'images://small_star_96.png';
        this.flReviewAndRateProduct.productRate = !!this.product?.rating ? this.product?.rating?.toString() : NO_RATE.toString();
    }

    initRateProduct() {
        console.info('this.flReviewAndRateProduct.rate', this.flReviewAndRateProduct.rate);
    }

    initReviewAndRateProduct() {
        this.initReviewProduct();
        this.initRateProduct();
    }

    async postReview(productId, star, comment) {
        try {
            showWaitDialog();
            const response = await postProductReview(productId, star, comment);
            this.router.goBack();
        } catch (error) {
            alert({
                title: global.lang.warning,
                message: global.lang.alreadySendReview
            });
        } finally {
            hideWaitDialog();
        }
    }

    public onShow() {
        super.onShow?.();
        this.initBackButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
    }

    public onLoad() {
        super.onLoad?.();
        this.headerBar.title = global.lang.addReviewHeader;
        this.product = this.route.getState().routeData?.product;
        this.initReviewAndRateProduct();
    }
}
