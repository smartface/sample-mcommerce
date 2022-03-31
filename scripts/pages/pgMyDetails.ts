import PgMyDetailsDesign from 'generated/pages/pgMyDetails';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import { themeService } from 'theme';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { getLviAccount } from 'lib/listViewItemTypes';
import LviAccount from 'components/LviAccount';


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
            if (item.itemTitle === global.lang.addressInformation) {
                this.router.push('addressInformation');
            }
                
            
        }
    }

    refreshListView() {
        const addressItem = getLviAccount({
            itemTitle: 'addressInformation',
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
        this.headerBar.title = global.lang.myDetails;
        this.initListView();
    }
}
