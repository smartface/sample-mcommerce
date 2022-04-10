import FlCheckoutDialogDesign from 'generated/my-components/FlCheckoutDialog';
import { CheckoutListItem } from 'types';
import { onRowBind, onRowCreate, onRowHeight, onRowType } from 'lib/listView';
import * as ListViewItems from 'lib/listViewItemTypes';

type Processor =
    | ListViewItems.ProcessorTypes.ILviHomeProducts
    | ListViewItems.ProcessorTypes.ILviShowcaseHeader
    | ListViewItems.ProcessorTypes.ILviGenericSlider;

export default class FlCheckoutDialog extends FlCheckoutDialogDesign {
    pageName?: string | undefined;
    private __items: CheckoutListItem[] = []
    private data: Processor[]
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }

    get items():CheckoutListItem[]{
        return this.__items;
    }

    set items(value: CheckoutListItem[]){
        this.__items = value;
        this.initListView();
        this.refreshListView();

    }

    private initListView(){
        this.lvMain.onRowType = onRowType.bind(this);
        this.lvMain.onRowHeight = onRowHeight.bind(this);
        this.lvMain.onRowCreate = onRowCreate.bind(this);
        this.lvMain.onRowBind = onRowBind.bind(this);
        this.lvMain.refreshEnabled = false;
    }
    
    private refreshListView(){
        this.data = this.processor();
        this.lvMain.itemCount = this.data.length;
        this.lvMain.refreshData();
    }

    private processor():Processor[]{
        const processorItems = [];
        this.__items.forEach((item)=>{
           processorItems.push(
               ListViewItems.getLviCheckout({
                   title: item.title,
                   description: item.description
               })
           )
        })
        return processorItems;
    }
}
