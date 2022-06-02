import PgAddReviewDesign from 'generated/pages/pgAddReview';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { themeService } from 'theme';
import { Product } from 'types';
import { postProductReview } from 'service/commerce';
import { hideWaitDialog, showWaitDialog } from 'lib/waitDialog';
import Button from '@smartface/native/ui/button';
import store from 'store';
import storeActions from 'store/main/actions';
import { i18n } from '@smartface/i18n';

export default class PgAddReview extends withDismissAndBackButton(PgAddReviewDesign) {
    product: Product;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.btnSendReview.on('press', () => {
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
        this.btnSendReview.text = `${i18n.instance.t('addReview')}`;
    }
    initMaterialTextBox() {
        this.flRateProduct.mtbComment.options = {
            hint: `${i18n.instance.t('comment')}`,
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
                title: `${i18n.instance.t('reviewHeader')}`,
                message: `${i18n.instance.t('reviewSent')}`
            });
        } catch (error) {
            alert({
                title: `${i18n.instance.t('warning')}`,
                message: `${i18n.instance.t('alreadySendReview')}`
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
        this.headerBar.title = `${i18n.instance.t('addReviewHeader')}`;
        this.product = this.route.getState().routeData?.product;
        this.initMaterialTextBox();
        this.initButton();
    }
}
