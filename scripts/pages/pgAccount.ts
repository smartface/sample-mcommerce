import PgAccountDesign from 'generated/pages/pgAccount';
import store from '../store/index'
import LviAccount from 'components/LviAccount';
export default class PgAccount extends PgAccountDesign {

	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
	}
    initAccountListView() {
        const accountMenus = store.getState().accountMenus;

        this.listViewAccount.onRowBind = (listViewItem: LviAccount, index: number) => {
            listViewItem.itemTitle = accountMenus[index].menuTitle
            listViewItem.leftIcon = accountMenus[index].menuLeftIcon
            listViewItem.bottomLine = index == accountMenus.length - 1
        };
        this.listViewAccount.onRowHeight = (index) => LviAccount.getHeight();
        this.listViewAccount.itemCount = accountMenus.length;
        this.listViewAccount.refreshData();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(this: PgAccount, superOnShow: () => void) {
	superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(this: PgAccount, superOnLoad: () => void) {
	superOnLoad();
    this.initAccountListView()
}
