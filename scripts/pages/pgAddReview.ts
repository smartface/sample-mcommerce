import PgAddReviewDesign from 'generated/pages/pgAddReview';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import { themeService } from 'theme';

export default class PgAddReview extends withDismissAndBackButton(PgAddReviewDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});
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
    }
}
