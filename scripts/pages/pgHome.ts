import PgHomeDesign from 'generated/pages/pgHome';
import favoritesListViewItem from 'generated/my-components/FavoritesListViewItem'
import Image from '@smartface/native/ui/image';
import View from '@smartface/native/ui/view';

export default class PgHome extends PgHomeDesign {
    router:any
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.label2.on(View.Events.Touch, () => {
            this.router.push('/btb')
        })
    }


    initListView() {
        this.listView1.onRowBind = (listViewItem: favoritesListViewItem, index: number) => {
            listViewItem.lblFavListItemTitle.text = dataSet[index].title; // Recommended way
            listViewItem.lblFavListItemDesc.text = dataSet[index].description;
            listViewItem.lblFavListItemPrice.text = dataSet[index].price;
            listViewItem.imgFavListItem.image = Image.createFromFile(`images://${dataSet[index].image}`)
        };
        this.refreshListView();

        // this.listView1.onPullRefresh = async () => {
        //     try {
        //         // await apiCall();
        //         this.refreshListView();
        //     }
        //     finally {
        //         this.listView1.stopRefresh();
        //     }
        // }
    }
    refreshListView() {
        console.log('dataset', dataSet)
        this.listView1.rowHeight = 80
        this.listView1.itemCount = dataSet.length;
        this.listView1.refreshData(); // This is important
    }
}


/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgHome, superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgHome, superOnLoad: () => void) {
    superOnLoad();
    this.initListView();

}

const dataSet = [{
    title: "Sprite Can",
    description: "325ml, Piece",
    image: "sprite.png",
    price: "$4.99",
}, {
    title: "Sprite Can",
    description: "325ml, Piece",
    image: "sprite.png",
    price: "$4.99"
}];