import View from '@smartface/native/ui/view';
import { themeService } from 'theme';
import System from '@smartface/native/device/system';
import Color from '@smartface/native/ui/color';
let { backgroundColor, paddingLeft, paddingRight } = themeService.getNativeStyle('.lviRowNLine-flMain');

const isIOS = System.OS === System.OSType.IOS;

themeService.onChange(() => {
    backgroundColor = themeService.getStyle('.lviRowNLine-flMain').backgroundColor;
});

function setBordersForGridViewItem(item: any, borders?: Array<string>) {
    let borderRadius = 15;
    let firstChild = item.getChildList()[0];
    let maskedBorders = [];
    if (!borders) {
        borders = ['top', 'bottom'];
        borderRadius = 0;
    }
    borders.includes('top') && (maskedBorders = maskedBorders.concat([View.Border.TOP_LEFT, View.Border.TOP_RIGHT]));
    borders.includes('bottom') && (maskedBorders = maskedBorders.concat([View.Border.BOTTOM_LEFT, View.Border.BOTTOM_RIGHT]));
    firstChild.maskedBorders = maskedBorders;
    firstChild.borderRadius = borderRadius;
}

function setBordersForView(item: any, borders?: Array<string>, borderRadius = 15) {
    let maskedBorders = [];
    if (!borders) {
        borders = ['top', 'bottom', 'left', 'right'];
        borderRadius = 0;
    }
    borders.includes('top') && (maskedBorders = maskedBorders.concat([View.Border.TOP_LEFT, View.Border.TOP_RIGHT]));
    borders.includes('bottom') && (maskedBorders = maskedBorders.concat([View.Border.BOTTOM_LEFT, View.Border.BOTTOM_RIGHT]));
    borders.includes('left') && (maskedBorders = maskedBorders.concat([View.Border.BOTTOM_LEFT, View.Border.TOP_LEFT]));
    borders.includes('right') && (maskedBorders = maskedBorders.concat([View.Border.TOP_RIGHT, View.Border.BOTTOM_RIGHT]));
    item.maskedBorders = maskedBorders;
    item.borderRadius = borderRadius;
}

function setBordersForListViewItem({
    item,
    borders,
    shouldModifyNativeCell
}: {
    item: any;
    borders?: Array<string>;
    shouldModifyNativeCell?: boolean;
}) {
    let borderRadius = 15;
    shouldModifyNativeCell = shouldModifyNativeCell === false ? false : true;
    if (borders && !borders.length) {
        return;
    }
    if (!borders) {
        borders = ['top', 'bottom'];
        borderRadius = 0;
    }
    if (isIOS) {
        if (shouldModifyNativeCell) {
            item.paddingLeft = 0;
            item.paddingRight = 0;
            item.__nativeCell.clipsToBounds = true;
            item.__nativeCell.backgroundColor = backgroundColor.nativeObject;
            item.__nativeCell.marginLeft = paddingLeft;
            item.__nativeCell.marginRight = paddingRight;
        } else {
            item.paddingLeft = paddingLeft;
            item.paddingRight = paddingRight;
            item.__nativeCell.clipsToBounds = false;
            item.__nativeCell.backgroundColor = Color.TRANSPARENT.nativeObject;
            item.__nativeCell.marginLeft = 0;
            item.__nativeCell.marginRight = 0;
        }
        item.applyLayout();
        let maskedBorders = 0;
        borders.includes('top') && (maskedBorders = maskedBorders | View.Border.TOP_LEFT | View.Border.TOP_RIGHT);
        borders.includes('bottom') && (maskedBorders = maskedBorders | View.Border.BOTTOM_LEFT | View.Border.BOTTOM_RIGHT);
        if (maskedBorders) {
            item.__nativeCell.layer.cornerRadius = borderRadius;
            item.__nativeCell.layer.maskedCorners = maskedBorders;
        }
    } else {
        let firstChild = item.getChildList()[0];
        let maskedBorders = [];
        borders.includes('top') && (maskedBorders = maskedBorders.concat([View.Border.TOP_LEFT, View.Border.TOP_RIGHT]));
        borders.includes('bottom') && (maskedBorders = maskedBorders.concat([View.Border.BOTTOM_LEFT, View.Border.BOTTOM_RIGHT]));
        firstChild.maskedBorders = maskedBorders;
        firstChild.borderRadius = borderRadius;
    }
}

function setBordersForSwipeItem(item, borders) {
    let borderRadius = 15;
    if (!isIOS) {
        if (!borders) {
            borders = ['top', 'bottom'];
            borderRadius = 0;
        }
        if (borders.includes('top')) {
            item.android.borderTopLeftRadius = borderRadius;
            item.android.borderTopRightRadius = borderRadius;
        }
        if (borders.includes('bottom')) {
            item.android.borderBottomLeftRadius = borderRadius;
            item.android.borderBottomRightRadius = borderRadius;
        }
    }
}

export function bordersCalculator(isFirstItem: boolean, isLastItem: boolean, arrayLength: number) {
    if (isFirstItem) {
        if (arrayLength === 1) {
            return ['top', 'bottom'];
        } else {
            return ['top'];
        }
    } else if (isLastItem) {
        return ['bottom'];
    } else {
        return undefined;
    }
}
export { setBordersForGridViewItem, setBordersForListViewItem, setBordersForSwipeItem, setBordersForView };
