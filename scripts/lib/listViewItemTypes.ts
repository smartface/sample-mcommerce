import LviAccount from '../components/LviAccount';
import LviHomeProducts from '../components/LviHomeProducts';

export enum LviTypes {
    LVI_ACCOUNT,
    LVI_HOME_PRODUCTS
}

export const LviClasses = {
    [LviTypes.LVI_ACCOUNT]: LviAccount,
    [LviTypes.LVI_HOME_PRODUCTS]: LviHomeProducts
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
