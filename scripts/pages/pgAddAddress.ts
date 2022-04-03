import PgAddAddressDesign from 'generated/pages/pgAddAddress';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import { themeService } from 'theme';

export default class PgAddAddress extends withDismissAndBackButton(PgAddAddressDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.flAddAddress.btnAddAddress.text = global.lang.save;
    }
    initMaterialTextBoxes(){
        this.flAddAddress.mtbName.options = {
            hint: global.lang.firstName
        }
        this.flAddAddress.mtbLastName.options = {
            hint: global.lang.lastName
        }
        this.flAddAddress.mtbAddress.options = {
            hint: global.lang.address,
            multiline:true,
        }
        this.flAddAddress.mtbTitle.options = {
            hint: global.lang.addressTitle
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
        this.headerBar.title = global.lang.addAddress;
        this.initMaterialTextBoxes();
        
    }
}
