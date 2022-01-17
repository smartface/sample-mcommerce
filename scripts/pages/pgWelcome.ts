import PgWelcomeDesign from 'generated/pages/pgWelcome';
import View from '@smartface/native/ui/view';
import { NativeStackRouter } from '@smartface/router';

export default class PgWelcome extends PgWelcomeDesign {
    router: NativeStackRouter;
    constructor() {
        super();
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnStart.on(View.Events.Touch, () => {
            this.router.push('pgNumber');
        });
        this.lblWelcome.text = global.lang.welcomeText;
        this.lblSubtext.text = global.lang.welcomeSubText;
        this.btnStart.text = global.lang.getStarted;
    }
}

function onShow(this: PgWelcome, superOnShow: () => void) {
    superOnShow();
}

function onLoad(this: PgWelcome, superOnLoad: () => void) {
    superOnLoad();
}
