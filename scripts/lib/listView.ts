import System from '@smartface/native/device/system';
import ListView from '@smartface/native/ui/listview';
import ListViewItem from '@smartface/native/ui/listviewitem';
import { LviTypes, LviClasses, IProcessed } from 'lib/listViewItemTypes';
import { setBordersForSwipeItem, setBordersForListViewItem } from 'lib/border';
// import LviMaterialTextBox from 'components/LviMaterialTextBox';
// import LviDoubleMaterialTextBox from 'components/LviDoubleMaterialTextBox';
import componentContextPatch from '@smartface/contx/lib/smartface/componentContextPatch';
import addChild from '@smartface/contx/lib/smartface/action/addChild';
import pushClassNames from '@smartface/contx/lib/styling/action/pushClassNames';
import Application from '@smartface/native/application';
// import Picker from 'lib/picker';
import KeyboardLayout from '@smartface/component-keyboardlayout';
import { setID } from 'lib/testAutomation';
import genericErrorHandler from 'lib/genericErrorHandler';
// import LviRow1Line from 'components/LviRow1Line';
import Image from '@smartface/native/ui/image';
import Page from '@smartface/native/ui/page';
import isEmulator from '@smartface/extension-utils/lib/isEmulator';

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
    const cancelItem = initSwipeItem({
        contextName: 'cancelItem',
        text: global.lang.cancelIt,
        onPress: properties.onCancel,
        className: '.swipeItem.delete',
        page: this,
        borders,
        dataId
    });
    const editItem = initSwipeItem({
        contextName: 'editItem',
        text: global.lang.edit,
        onPress: properties.onEdit,
        className: '.swipeItem.edit',
        page: this,
        borders,
        dataId
    });
    const updateItem = initSwipeItem({
        contextName: 'updateItem',
        text: global.lang.update,
        onPress: properties.onUpdate,
        className: '.swipeItem.edit',
        page: this,
        borders,
        dataId
    });
    const callItem = initSwipeItem({
        contextName: 'callItem',
        text: global.lang.ara,
        onPress: properties.onCall,
        className: '.swipeItem.call',
        page: this,
        borders,
        dataId
    });
    const copyTextItem = initSwipeItem({
        contextName: 'copyTextItem',
        text: global.lang.copy,
        onPress: properties.onCopyText,
        className: '.swipeItem.copy',
        page: this,
        borders,
        dataId
    });
    const addReminderItem = initSwipeItem({
        contextName: 'addReminderItem',
        text: global.lang.addToReminder,
        onPress: properties.onAddReminder,
        className: '.swipeItem.addReminder',
        page: this,
        borders,
        dataId
    });
    const showFeedbacksItem = initSwipeItem({
        contextName: 'showFeedbacksItem',
        text: global.lang.showFeedback,
        onPress: properties.onShowFeedbacks,
        className: '.swipeItem.showFeedbacks',
        page: this,
        borders,
        dataId
    });
    const approveItem = initSwipeItem({
        contextName: 'approveItem',
        text: global.lang.verify,
        onPress: properties.onApprove,
        className: '.swipeItem.approve',
        page: this,
        borders,
        dataId,
        icon: SwipeImages.APPROVE
    });
    const rejectItem = initSwipeItem({
        contextName: 'rejectItem',
        text: global.lang.reject,
        onPress: properties.onReject,
        className: '.swipeItem.deny',
        page: this,
        borders,
        icon: SwipeImages.REJECT,
        dataId
    });
    const shareItem = initSwipeItem({
        contextName: 'shareItem',
        text: global.lang.share,
        onPress: properties.onShare,
        className: '.swipeItem.share',
        page: this,
        borders,
        icon: SwipeImages.APPROVE,
        dataId
    });
    const otherItem = initSwipeItem({
        contextName: 'otherItem',
        text: global.lang.other,
        onPress: properties.onOther,
        className: '.swipeItem.other',
        page: this,
        borders,
        icon: SwipeImages.OTHER,
        dataId
    });
    const mapOutItem = initSwipeItem({
        contextName: 'mapOutItem',
        text: global.lang.showOnMap,
        onPress: properties.onMapOut,
        className: '.swipeItem.mapOut',
        page: this,
        borders,
        dataId
    });

    event.ios.expansionSettings.buttonIndex = 0;
    const items = [];
    if (event.direction === ListView.SwipeDirection.RIGHTTOLEFT) {
        items.push(deleteItem);
        items.push(cancelItem);
        items.push(mapOutItem);
        items.push(approveItem);
        items.push(addReminderItem);
        items.push(shareItem);
        items.push(callItem);
        if (System.OS === System.OSType.IOS) {
            items.push(editItem);
            items.push(updateItem);
            items.push(copyTextItem);
            items.push(rejectItem);
            items.push(otherItem);
        }
    } else {
        if (System.OS === System.OSType.ANDROID) {
            items.push(rejectItem);
            items.push(editItem);
            items.push(updateItem);
            items.push(copyTextItem);
            items.push(callItem);
        }
        items.push(showFeedbacksItem);
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

function initSwipeItem(itemOptions?: SwipeItemOptions): StyleContextComponentType<ListView.SwipeItem> {
    const swipeItem = new ListView.SwipeItem() as StyleContextComponentType<ListView.SwipeItem>;
    componentContextPatch(swipeItem, itemOptions.contextName);
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
            genericErrorHandler(err, false);
        } finally {
            swipeAndroidWorkaroundMethod(itemOptions.page);
        }
    };
    setBordersForSwipeItem(swipeItem, itemOptions.borders);
    swipeItem.dispatch(pushClassNames(itemOptions.className));
    return itemOptions.onPress ? swipeItem : null;
}

export function onRowCanSwipe(index, fieldName = 'data') {
    const canDelete = this[fieldName][index]?.properties.onDelete;
    const canEdit = this[fieldName][index]?.properties.onEdit;
    let swipeOptions = [];
    canDelete && swipeOptions.push(ListView.SwipeDirection.RIGHTTOLEFT);
    canEdit && System.OS === System.OSType.IOS && (swipeOptions = [ListView.SwipeDirection.RIGHTTOLEFT]);
    canEdit && swipeOptions.push(ListView.SwipeDirection.LEFTTORIGHT);
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
    this.lvMain.dispatch(addChild(`listViewItem${++currentIndex}`, listViewItem));
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

function initMtb({ picker, materialTextBox, onPickerDone = () => {} }) {
    if (isIOS) {
        const keyboardLayout = KeyboardLayout.init(materialTextBox)[0];
        keyboardLayout.onDoneButtonClick = () => Application.hideKeyboard();
        materialTextBox.ios.inputView = undefined;
    }
}

export function updateRowRangeLv(params: {
    listView: ListView;
    oldListLength: number;
    newListLength: number;
    updateLastItemBorders: boolean;
}) {
    const { oldListLength, newListLength, listView, updateLastItemBorders } = params;
    listView.itemCount = newListLength;
    if (oldListLength >= newListLength) {
        isEmulator() &&
            console.error(
                `(insertRowRangeLv) New list length is equals or smaller than old list length! old : ${oldListLength} new : ${newListLength}`
            );
        listView.refreshData();
        return;
    }
    const itemCount = newListLength - oldListLength;
    const rowRangeParams = {
        positionStart: updateLastItemBorders ? (oldListLength - 1 >= 0 ? oldListLength - 1 : 0) : oldListLength >= 0 ? oldListLength : 0,
        itemCount: itemCount,
        ios: {
            animation: ListView.iOS.RowAnimation.AUTOMATIC
        }
    };
    listView.insertRowRange(rowRangeParams);
}
