import PgNoConnectionDesign from 'generated/pages/pgNoConnection';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, Router } from '@smartface/router';
import Button from '@smartface/native/ui/button';
import Network from '@smartface/native/device/network';
import { noConnectionToast } from 'lib/toast';

export default class PgNoConnection extends withDismissAndBackButton(PgNoConnectionDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.flNoConnection.btnTryAgain.on('press', () => {
            const noConnection = Network.connectionType === Network.ConnectionType.NONE;
            if (!noConnection) {
                router.push('/btb');
            } else {
                noConnectionToast();
            }
        });
        this.flNoConnection.imgNoConnection.image = 'images://try_again.png';
        this.flNoConnection.lblTitle.text = global.lang.noConnection;
        this.flNoConnection.lblDescription.text = global.lang.checkConnection;
        this.flNoConnection.btnTryAgain.text = global.lang.tryAgain;
    }

    /**
     * @event onShow
     * This event is called when the page appears on the screen (everytime).
     */
    onShow() {
        super.onShow();
        this.initBackButton(this.router); //Addes a back button to the page headerbar.
    }

    /**
     * @event onLoad
     * This event is called once when the page is created.
     */
    onLoad() {
        super.onLoad();
    }
}
