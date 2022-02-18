import PgProductDescriptionDesign from 'generated/pages/pgProductDescription';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import { themeService } from 'theme';

export default class PgProductDescription extends withDismissAndBackButton(PgProductDescriptionDesign) {
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
        this.initTextView();
        this.headerBar.title = global.lang.productDetail;
    }
    initTextView() {
        this.tvDescription.maxLines = 0;
        this.tvDescription.text = this.route.getState().routeData?.productDescription || global.lang.noDescription;
    }
}
