import PgWelcomeDesign from 'generated/pages/pgWelcome';
import View from '@smartface/native/ui/view';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgWelcome extends withDismissAndBackButton(PgWelcomeDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});
        //@ts-ignore FIX THIS AFTER EVENT FIX TODO
        this.btnStart.on(View.Events.Touch, () => {
            this.router.push('pgNumber');
        });
        this.lblWelcome.text = global.lang.welcomeText;
        this.lblSubtext.text = global.lang.welcomeSubText;
        this.btnStart.text = global.lang.getStarted;
    }
    onShow() {
        super.onShow();
        this.initDismissButton(this.router);
        this.initBackButton(this.router);
    }
    onLoad() {
        super.onLoad();
    }
}
