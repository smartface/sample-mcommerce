import PgWelcomeDesign from 'generated/pages/pgWelcome';
import { Route, BaseRouter as Router } from '@smartface/router';
import { withDismissAndBackButton } from '@smartface/mixins';
import Button from '@smartface/native/ui/button';
import { themeService } from 'theme';

export default class PgWelcome extends withDismissAndBackButton(PgWelcomeDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.btnStart.on(Button.Events.Press, () => {
            this.router.push('pgLogin');
        });
        this.lblWelcome.text = global.lang.welcomeText;
        this.lblSubtext.text = global.lang.welcomeSubText;
        this.btnStart.text = global.lang.getStarted;
    }
    onShow() {
        super.onShow();
        this.initDismissButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
    }
    onLoad() {
        super.onLoad();
    }
}
