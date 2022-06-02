import PgAddAddressDesign from 'generated/pages/pgAddAddress';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { themeService } from 'theme';
import { i18n } from '@smartface/i18n';

export default class PgAddAddress extends withDismissAndBackButton(PgAddAddressDesign) {
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.flAddAddress.btnAddAddress.text = `${i18n.instance.t('save')}`;
    }
    initMaterialTextBoxes(){
        this.flAddAddress.mtbName.options = {
            hint: `${i18n.instance.t('firstName')}`
        }
        this.flAddAddress.mtbLastName.options = {
            hint: `${i18n.instance.t('lastName')}`
        }
        this.flAddAddress.mtbAddress.options = {
            hint: `${i18n.instance.t('address')}`,
            multiline:true,
        }
        this.flAddAddress.mtbTitle.options = {
            hint: `${i18n.instance.t('addressTitle')}`
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
        this.headerBar.title = `${i18n.instance.t('addAddress')}`;
        this.initMaterialTextBoxes();
        
    }
}
