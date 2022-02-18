import PgAddReviewDesign from 'generated/pages/pgAddReview';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import { themeService } from 'theme';
import { Product } from 'types';
import { postProductReview } from 'service/commerce';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
import Button from '@smartface/native/ui/button';
import store from 'store';
import storeActions from 'store/main/actions';

export default class PgAddReview extends withDismissAndBackButton(PgAddReviewDesign) {
    product: Product;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.btnSendReview.on(Button.Events.Press, () => {
            if (this.flRateProduct.rate !== 0) {
                this.postReview(this.product._id, this.flRateProduct.rate, this.flRateProduct.comment)
                    .then(() => {
                        store.dispatch(storeActions.AddNewRate({ isRateAdded: true }));
                    })
                    .catch((e) => {
                        alert(e);
                    });
            }
        });
    }
    initButton() {
        this.btnSendReview.text = global.lang.addReview;
    }
    initMaterialTextBox() {
        this.flRateProduct.mtbComment.options = {
            hint: global.lang.mtbComment,
            multiline: true
        };
        this.flRateProduct.mtbComment.materialTextBox.onTextChanged = () => {
            this.flRateProduct.mtbComment.materialTextBox.dirty();
        };
    }
    async postReview(productId, star, comment) {
        try {
            showWaitDialog();
            const response = await postProductReview(productId, star, comment);
            this.router.goBack();
            alert({
                title: global.lang.reviewHeader,
                message: global.lang.reviewSent
            });
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
        this.initMaterialTextBox();
        this.initButton();
    }
}
