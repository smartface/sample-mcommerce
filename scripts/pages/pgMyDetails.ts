import PgMyDetailsDesign from 'generated/pages/pgMyDetails';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { themeService } from 'theme';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { getLviAccount } from 'lib/listViewItemTypes';
import LviAccount from 'components/LviAccount';
import { i18n } from '@smartface/i18n';


export default class PgMyDetails extends withDismissAndBackButton(PgMyDetailsDesign) {
    private data: ReturnType<typeof getLviAccount>[];
    constructor(private router?: Router, private route?: Route) {
        super({});
    }

    initListView() {
        this.lvMain.refreshEnabled = false;
        this.lvMain.scrollEnabled = false;
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.onRowSelected = (item:LviAccount) => {
            if (item.itemTitle === `${i18n.instance.t('addressBook')}`) {
                this.router.push('addressInformation');
            }
                
            
        }
    }

    refreshListView() {
        const addressItem = getLviAccount({
            itemTitle: 'addressBook',
            leftIcon: 'map-marker-alt',
            bottomLine: true
        });
        this.data = [addressItem];
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }

    public onShow() {
        super.onShow?.();
        this.initBackButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
        this.refreshListView();
    }


    public onLoad() {
        super.onLoad?.();
        this.headerBar.title = `${i18n.instance.t('myDetails')}`;
        this.initListView();
    }
}
