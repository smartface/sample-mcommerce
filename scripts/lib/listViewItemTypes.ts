import LviAccount from '../components/LviAccount';
import LviHomeProducts from '../components/LviHomeProducts';
import LviHomeSlider from '../components/LviHomeSlider';
import LviCartItem from '../components/LviCartItem';
import LviFavorites from '../components/LviFavorites';
import LviProfile from '../components/LviProfile';
import LviRow2LineButton from '../components/LviRow2LineButton';
import LviSpacer from '../components/LviSpacer';
import LviEmptyItem from '../components/LviEmptyItem';

export enum LviTypes {
    LVI_ACCOUNT,
    LVI_HOME_PRODUCTS,
    LVI_HOME_SLIDER,
    LVI_CART_PRODUCTS,
    LVI_FAVOURITES,
    LVI_PROFILE,
    LVI_ROW2_LINE_BUTTON,
    LVI_SPACER,
    LVI_EMPTY_ITEM
}

export const LviClasses = {
    [LviTypes.LVI_ACCOUNT]: LviAccount,
    [LviTypes.LVI_HOME_PRODUCTS]: LviHomeProducts,
    [LviTypes.LVI_HOME_SLIDER]: LviHomeSlider,
    [LviTypes.LVI_CART_PRODUCTS]: LviCartItem,
    [LviTypes.LVI_FAVOURITES]: LviFavorites,
    [LviTypes.LVI_PROFILE]: LviProfile,
    [LviTypes.LVI_ROW2_LINE_BUTTON]: LviRow2LineButton,
    [LviTypes.LVI_SPACER]: LviSpacer,
    [LviTypes.LVI_EMPTY_ITEM]: LviEmptyItem
};

type SwipeAction = (...args: any[]) => Promise<void>;

type SwipeActions = {
    onEdit?: SwipeAction;
    onUpdate?: SwipeAction;
    onDelete?: SwipeAction;
    onOther?: SwipeAction;
    onShare?: SwipeAction;
    onApprove?: SwipeAction;
    onReject?: SwipeAction;
    onCancel?: SwipeAction;
    onCall?: SwipeAction;
    onMapOut?: SwipeAction;
    onCopyText?: SwipeAction;
    onAddReminder?: SwipeAction;
    onShowFeedbacks?: SwipeAction;
};

type GenericProperties = {
    borders?: string[];
    swipeable?: boolean;
    className?: string;
    maxWidthMargin?: number;
    height?: number;
};

type OptionParams = GenericProperties & {
    swipeActions?: SwipeActions;
};

export interface IProcessed<T> {
    type: string;
    height?: number;
    properties: Partial<T> & GenericProperties & SwipeActions;
    [key: string]: any;
}

export namespace ProcessorTypes {
    export interface ILviAccount extends IProcessed<LviAccount> {}
    export interface ILviHomeProducts extends IProcessed<LviHomeProducts> {}
    export interface ILviHomeSlider extends IProcessed<LviHomeSlider> {}
    export interface ILviCartItem extends IProcessed<LviCartItem> {}
    export interface ILviFavorites extends IProcessed<LviFavorites> {}
    export interface ILviProfile extends IProcessed<LviProfile> {}
    export interface ILviRow2LineButton extends IProcessed<LviRow2LineButton> {}
    export interface ILviSpacer extends IProcessed<LviSpacer> {}
    export interface ILviEmptyItem extends IProcessed<LviEmptyItem> {}
}

export function getLviAccount(item: Partial<LviAccount>): ProcessorTypes.ILviAccount {
    return {
        type: 'LVI_ACCOUNT',
        properties: {
            ...item,
            borders: []
        },
        height: LviAccount.getHeight()
    };
}

export function getLviHomeProducts(item: Partial<LviHomeProducts>): ProcessorTypes.ILviHomeProducts {
    return {
        type: 'LVI_HOME_PRODUCTS',
        properties: {
            ...item,
            borders: []
        },
        height: LviHomeProducts.getHeight()
    };
}

export function getLviHomeSlider(item: Partial<LviHomeSlider>): ProcessorTypes.ILviHomeSlider {
    return {
        type: 'LVI_HOME_SLIDER',
        properties: {
            ...item,
            borders: []
        },
        height: LviHomeSlider.getHeight()
    };
}

export function getLviCartProducts(item: Partial<LviCartItem>): ProcessorTypes.ILviAccount {
    return {
        type: 'LVI_CART_PRODUCTS',
        properties: {
            ...item,
            borders: []
        },
        height: LviCartItem.getHeight()
    };
}
export function getLviFavorites(item: Partial<LviFavorites>): ProcessorTypes.ILviFavorites {
    return {
        type: 'LVI_FAVOURITES',
        properties: {
            ...item,
            borders: []
        },
        height: LviFavorites.getHeight()
    };
}

export function getLviProfile(item: Partial<LviProfile>): ProcessorTypes.ILviProfile {
    return {
        type: 'LVI_PROFILE',
        properties: {
            ...item,
            borders: []
        },
        height: LviProfile.getHeight()
    };
}

export function getLviRow2LineButton(item: Partial<LviRow2LineButton>): ProcessorTypes.ILviRow2LineButton {
    return {
        type: 'LVI_ROW2_LINE_BUTTON',
        properties: {
            ...item,
            borders: []
        },
        height: LviRow2LineButton.getHeight()
    };
}

export function getLviSpacerItem(item: Partial<LviSpacer>): ProcessorTypes.ILviSpacer {
    return {
        type: 'LVI_SPACER',
        properties: { ...item },
        height: LviSpacer.getHeight(item.className)
    };
}
export function getLviEmptyItem(item: Partial<LviEmptyItem>): ProcessorTypes.ILviEmptyItem {
    return {
        type: 'LVI_EMPTY_ITEM',
        properties: { ...item },
        height: LviEmptyItem.getHeight()
    };
}
