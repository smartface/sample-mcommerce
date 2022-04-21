import PgNutritionsDesign from 'generated/pages/pgNutritions';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { themeService } from 'theme';
import * as ListViewItems from 'lib/listViewItemTypes';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import { Nutritions } from 'types';

type Processor = ListViewItems.ProcessorTypes.ILviEmptyItem | ListViewItems.ProcessorTypes.ILviNutritions;
export default class PgNutritions extends withDismissAndBackButton(PgNutritionsDesign) {
    data: Processor[];
    nutritions: Nutritions;
    constructor(private router?: Router, private route?: Route) {
        super({});
    }
    public onShow() {
        super.onShow?.();
        this.refreshListView();
        this.initBackButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
    }
    public onLoad() {
        super.onLoad?.();
        this.getNutritions();
        this.initListView();
        this.headerBar.title = global.lang.nutritions;
    }
    getNutritions() {
        this.nutritions = this.route.getState().routeData.product?.nutritions;
    }
    initListView() {
        this.lvMain.refreshEnabled = false;
        this.lvMain.scrollEnabled = false;
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
    }
    refreshListView() {
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
    processor() {
        const processorItems = [];
        if (this.nutritions == null || Object.keys(this.nutritions).length === 0) {
            processorItems.push(
                ListViewItems.getLviEmptyItem({
                    emptyImage: 'images://empty_nutritions_list.png',
                    emptyTitle: global.lang.emptyNutritions
                })
            );
        } else {
            Object.keys(this.nutritions).forEach((key, index, arr) => {
                if (this.nutritions.hasOwnProperty(key)) {
                    processorItems.push(
                        ListViewItems.getLviNutritions({
                            nutritionKey: key,
                            nutritionValue: this.nutritions[key] !== '' ? this.nutritions[key] : '-',
                            showSeparator: arr.length - 1 !== index
                        })
                    );
                }
            });
        }
        return processorItems;
    }
}
