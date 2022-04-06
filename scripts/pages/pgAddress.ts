import PgAddressDesign from 'generated/pages/pgAddress';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Route, BaseRouter as Router } from '@smartface/router';
import { themeService } from 'theme';
import { onRowBind, onRowCreate, onRowHeight, onRowSwipe, onRowType } from 'lib/listView';
import * as ListViewItems from 'lib/listViewItemTypes';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';

type Processor = | ListViewItems.ProcessorTypes.ILviNoAddress |
    ListViewItems.ProcessorTypes.ILviAddressList;

const addresses = [
    { title: 'Ev', address: 'Kurtuluş Mah. 4 eylül Cad. No:2', name: "Ahmet", lastName: "Yalçın" },
    { title: 'Ev', address: 'Kurtuluş Mah. 4 eylül Cad. No:2', name: "Emre", lastName: "Güven" },
    { title: 'Ev', address: 'Kurtuluş Mah. 4 eylül Cad. No:2', name: "Ahmet", lastName: "Yalçın" },

]
export default class PgAddress extends withDismissAndBackButton(PgAddressDesign) {
    data: Processor[];
    hasAddress: boolean;
    rightItemAdd: HeaderBarItem;
    constructor(private router?: Router, private route?: Route) {
        super({});
        this.hasAddress = true;
    }
    initListView() {
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.onRowSwipe = onRowSwipe.bind(this);
        this.lvMain.refreshEnabled = false;
    }
    refreshListView() {
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }
    processor(): Processor[] {
        const processorItems = [];
        if (!this.hasAddress) {
            processorItems.push(ListViewItems.getLviNoAddress({
                image: 'images://location.png',
                title: global.lang.noAddressTitle,
                buttonText: global.lang.addAddress

            }));
        } else {
            addresses.forEach((adress) => {
                processorItems.push(ListViewItems.getLviAddressList({
                    fullName:`${adress.name} ${adress.lastName}`,
                    title: adress.title,
                    address: adress.address,
                }))
            })
        }
        return processorItems;
    }

    addHeaderRightItem() {
        if (this.hasAddress) {
            this.rightItemAdd = new HeaderBarItem({
                title: global.lang.addAddress,
                color: themeService.getNativeStyle('.sf-headerBar.main').itemColor,
                onPress: () => {
                    this.router.push('addAddress')
                }
            });
            this.headerBar.setItems([this.rightItemAdd]);
        }
    }

    public onShow() {
        super.onShow?.();
        this.initBackButton(this.router, {
            color: themeService.getNativeStyle('.sf-headerBar.main').itemColor
        });
        this.addHeaderRightItem();
        this.refreshListView();
    }


    public onLoad() {
        super.onLoad?.();
        this.headerBar.title = global.lang.addressBook;
        this.initListView();

    }
}
