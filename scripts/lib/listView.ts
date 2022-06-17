import System from '@smartface/native/device/system';
import ListView from '@smartface/native/ui/listview';
import ListViewItem from '@smartface/native/ui/listviewitem';
import { LviTypes, LviClasses, IProcessed } from 'lib/listViewItemTypes';
import { setBordersForSwipeItem, setBordersForListViewItem } from 'lib/border';
import createPageContext from '@smartface/styling-context/lib/pageContext';
import { setID } from 'lib/testAutomation';
import genericErrorHandler from 'lib/genericErrorHandler';
import Image from '@smartface/native/ui/image';
import Page from '@smartface/native/ui/page';
import { themeService } from 'theme';
import SwipeItem, { SwipeDirection } from '@smartface/native/ui/swipeitem';

const isIOS = System.OS === System.OSType.IOS;
const SwipeImages = {
    OTHER: Image.createFromFile('images://swipe_other.png'),
    SHARE: Image.createFromFile('images://swipe_share.png'),
    APPROVE: Image.createFromFile('images://swipe_approve.png'),
    REJECT: Image.createFromFile('images://swipe_cancel.png')
};
let currentIndex = -1;

type SwipeItemOptions = {
    contextName: string;
    text: string;
    icon?: Image;
    onPress: (...args: any[]) => Promise<void>;
    borders: string[];
    page: Page;
    className: string;
    dataId?: string | number;
};

/**
 * @param fieldName name of data variable on page
 * @example
 * import { onRowSwipe } from "lib/listView";
 * // ***
 * const dataList = ['data1', 'data2', 'data3'];
 * // ***
 * this.lvMain.onRowSwipe = event => onRowSwipe.call(this, event, 'dataList');
 */
export function onRowSwipe(event, fieldName = 'data') {
    const page = this;
    const properties: IProcessed<ListView>['properties'] = page[fieldName][event.index].properties;
    const borders = properties.borders;
    const dataId = page[fieldName][event.index].id;
    const deleteItem = initSwipeItem({
        contextName: 'deleteItem',
        text: global.lang.delete,
        onPress: properties.onDelete,
        className: '.swipeItem.delete',
        page: this,
        borders,
        dataId
    });

    event.ios.expansionSettings.buttonIndex = 0;
    const items = [];
    if (event.direction === SwipeDirection.RIGHTTOLEFT) {
        items.push(deleteItem);
    }
    return items.filter((item) => !!item);
}

/**
 * Android swipe menu doesnt close if refreshData not called
 */
const swipeAndroidWorkaroundMethod = (page: Page) => {
    if (System.OS === System.OSType.ANDROID) {
        //@ts-ignore
        page.lvMain?.refreshData();
    }
};

function initSwipeItem(itemOptions?: SwipeItemOptions): StyleContextComponentWithDispatch<SwipeItem> {
    const swipeItem = new SwipeItem() as StyleContextComponentWithDispatch<SwipeItem>;
    themeService.addGlobalComponent(swipeItem as any, itemOptions.contextName)
    swipeItem.text = itemOptions.text || '';
    if (itemOptions.icon) {
        swipeItem.icon = itemOptions.icon;
    }
    swipeItem.onPress = async () => {
        try {
            if (typeof itemOptions.onPress === 'function') {
                itemOptions.onPress(itemOptions.dataId);
            }
        } catch (err) {
            genericErrorHandler(err);
        } finally {
            swipeAndroidWorkaroundMethod(itemOptions.page);
        }
    };
    setBordersForSwipeItem(swipeItem, itemOptions.borders);
    swipeItem.dispatch({
        type: 'pushClassNames',
        classNames: itemOptions.className
    });
    return itemOptions.onPress ? swipeItem : null;
}

export function onRowCanSwipe(index, fieldName = 'data') {
    const canDelete = this[fieldName][index]?.properties.onDelete;
    const canEdit = this[fieldName][index]?.properties.onEdit;
    let swipeOptions = [];
    canDelete && swipeOptions.push(SwipeDirection.RIGHTTOLEFT);
    canEdit && System.OS === System.OSType.IOS && (swipeOptions = [SwipeDirection.RIGHTTOLEFT]);
    canEdit && swipeOptions.push(SwipeDirection.LEFTTORIGHT);
    swipeOptions.length === 0 && (swipeOptions = [0]);
    return swipeOptions;
}

export function onRowSwipeWrapper(_super, event, fieldName = 'data') {
    const { parentActionTitle } = this[fieldName][event.index].properties;
    const swipeItems = _super(event);
    return swipeItems.map((item, index) => {
        const title = parentActionTitle + '/' + item.valueForKey('titleLabel').valueForKey('text');
        setID(
            {
                nativeObject: item
            },
            title
        );
        return item;
    });
}

/**
 * @param fieldName name of data variable on page
 * @example
 * import { onRowBind } from "lib/listView";
 * // ***
 * const dataList = ['data1', 'data2', 'data3'];
 * // ***
 * this.lvMain.onRowBind = (item, index) => onRowBind.call(this, item, index, 'dataList');
 */
export function onRowBind(item, index, fieldName = 'data') {
    const page = this;
    Object.assign(item, page[fieldName][index].properties);
    const { borders, swipeable } = page[fieldName][index].properties;
    setBordersForListViewItem({ item, borders, shouldModifyNativeCell: borders || swipeable || false });
}

export function onRowCreate(type: any): ListViewItem {
    const LviClass = LviClasses[type];
    const listViewItem = new LviClass();
    this.lvMain.dispatch({
      type: 'addChild',
      component: listViewItem,
      name: `listViewItem${++currentIndex}`
    });
    return listViewItem;
}

/**
 * @param fieldName name of data variable on page
 * @example
 * import { onRowType } from "lib/listView";
 * // ***
 * const dataList = ['data1', 'data2', 'data3'];
 * // ***
 * this.lvMain.onRowType = index => onRowType.call(this, index, 'dataList');
 */
export function onRowType(index, fieldName = 'data') {
    const page = this;
    return LviTypes[page[fieldName][index].type];
}

/**
 * @param fieldName name of data variable on page
 * @example
 * import { onRowHeight } from "lib/listView";
 * // ***
 * const dataList = ['data1', 'data2', 'data3'];
 * // ***
 * this.lvMain.onRowHeight = index => onRowHeight.call(this, index, 'dataList');
 */
export function onRowHeight(index, fieldName = 'data') {
    const page = this;
    const type = page[fieldName][index].type;
    const LviClass = LviClasses[LviTypes[type]];
    const height = page[fieldName][index].height;
    //@ts-ignore
    return isNaN(height) ? LviClass.getHeight() : height;
    //Show default height if no height parameter is given.
}
