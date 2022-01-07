import LviAccount from '../components/LviAccount';
import LviHomeProducts from '../components/LviHomeProducts';
import LviHomeSlider from '../components/LviHomeSlider';
import LviCartItem from '../components/LviCartItem';
import LviFavorites from '../components/LviFavorites';
import LviProfile from '../components/LviProfile';
import LviRow2LineButton from '../components/LviRow2LineButton';
import LviSpacer from '../components/LviSpacer';
import LviProductItem from '../components/LviProductItem';
import LviRow2ProductItem from '../components/LviRow2ProductItem';
import LviEmptyItem from '../components/LviEmptyItem';
import LviShowcaseHeader from '../components/LviShowcaseHeader';
import LviHomeCategories from '../components/LviHomeCategories';

import LviPdInfoSection from '../components/LviPdInfoSection';
import LviPdTitleLikeSection from '../components/LviPdTitleLikeSection';
import LviPdSlider from '../components/LviPdSlider';
import LviPdOverviewSection from '../components/LviPdOverviewSection';
import LviPdButtonPriceSection from '../components/LviPdButtonPriceSection';

export enum LviTypes {
    LVI_ACCOUNT,
    LVI_HOME_PRODUCTS,
    LVI_HOME_SLIDER,
    LVI_CART_PRODUCTS,
    LVI_FAVOURITES,
    LVI_PROFILE,
    LVI_ROW2_LINE_BUTTON,
    LVI_SPACER,
    LVI_PRODUCT_ITEM,
    LVI_ROW_2_PRODUCT_ITEM,
    LVI_EMPTY_ITEM,
    LVI_SHOWCASE_HEADER,
    LVI_HOME_CATEGORIES,
    LVI_PD_SLIDER,
    LVI_PD_TITLE_LIKE_SECTION,
    LVI_PD_BUTTON_PRICE_SECTION,
    LVI_PD_INFO_SECTION,
    LVI_PD_OVERVIEW_SECTION
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
    [LviTypes.LVI_PRODUCT_ITEM]: LviProductItem,
    [LviTypes.LVI_ROW_2_PRODUCT_ITEM]: LviRow2ProductItem,
    [LviTypes.LVI_EMPTY_ITEM]: LviEmptyItem,
    [LviTypes.LVI_SHOWCASE_HEADER]: LviShowcaseHeader,
    [LviTypes.LVI_HOME_CATEGORIES]: LviHomeCategories,
    [LviTypes.LVI_PD_SLIDER]: LviPdSlider,
    [LviTypes.LVI_PD_TITLE_LIKE_SECTION]: LviPdTitleLikeSection,
    [LviTypes.LVI_PD_BUTTON_PRICE_SECTION]: LviPdButtonPriceSection,
    [LviTypes.LVI_PD_INFO_SECTION]: LviPdInfoSection,
    [LviTypes.LVI_PD_OVERVIEW_SECTION]: LviPdOverviewSection
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
    export interface ILviProductItem extends IProcessed<LviProductItem> {}
    export interface ILviRow2ProductItem extends IProcessed<LviRow2ProductItem> {}
    export interface ILviEmptyItem extends IProcessed<LviEmptyItem> {}
    export interface ILviShowcaseHeader extends IProcessed<LviShowcaseHeader> {}
    export interface ILviHomeCategories extends IProcessed<LviHomeCategories> {}
    export interface ILviPdSlider extends IProcessed<LviPdSlider> {}
    export interface ILviPdTitleLikeSection extends IProcessed<LviPdTitleLikeSection> {}
    export interface ILviPdButtonPriceSection extends IProcessed<LviPdButtonPriceSection> {}
    export interface ILviPdInfoSection extends IProcessed<LviPdInfoSection> {}
    export interface ILviPdOverviewSection extends IProcessed<LviPdOverviewSection> {}
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
        properties: { ...item, borders: [] },
        height: LviSpacer.getHeight(item.className)
    };
}

export function getLviProductItem(item: Partial<LviProductItem>): ProcessorTypes.ILviProductItem {
    return {
        type: 'LVI_PRODUCT_ITEM',
        properties: { ...item },
        height: LviProductItem.getHeight()
    };
}

export function getLviRow2ProductItem(item: Partial<LviRow2ProductItem>): ProcessorTypes.ILviRow2ProductItem {
    return {
        type: 'LVI_ROW_2_PRODUCT_ITEM',
        properties: { ...item },
        height: LviRow2ProductItem.getHeight()
    };
}

export function getLviEmptyItem(item: Partial<LviEmptyItem>): ProcessorTypes.ILviEmptyItem {
    return {
        type: 'LVI_EMPTY_ITEM',
        properties: { ...item },
        height: LviEmptyItem.getScreenHeightDivide2()
    };
}

export function getLviShowcaseHeader(item: Partial<LviShowcaseHeader>): ProcessorTypes.ILviShowcaseHeader {
    return {
        type: 'LVI_SHOWCASE_HEADER',
        properties: { ...item },
        height: LviShowcaseHeader.getHeight()
    };
}

export function getLviHomeCategories(item: Partial<LviHomeCategories>): ProcessorTypes.ILviHomeCategories {
    return {
        type: 'LVI_HOME_CATEGORIES',
        properties: { ...item },
        height: LviHomeCategories.getHeight()
    };
}

export function getLviPdSlider(item: Partial<LviPdSlider>): ProcessorTypes.ILviPdSlider {
    return {
        type: 'LVI_PD_SLIDER',
        properties: {
            ...item,
            borders: []
        },
        height: LviPdSlider.getHeight()
    };
}

export function getLviPdTitleLikeSection(item: Partial<LviPdTitleLikeSection>): ProcessorTypes.ILviPdTitleLikeSection {
    return {
        type: 'LVI_PD_TITLE_LIKE_SECTION',
        properties: {
            ...item,
            borders: []
        },
        height: LviPdTitleLikeSection.getHeight()
    };
}
export function getLviPdButtonPriceSection(item: Partial<LviPdButtonPriceSection>): ProcessorTypes.ILviPdButtonPriceSection {
    return {
        type: 'LVI_PD_BUTTON_PRICE_SECTION',
        properties: {
            ...item,
            borders: []
        },
        height: LviPdButtonPriceSection.getHeight()
    };
}
export function getLviPdInfoSection(item: Partial<LviPdInfoSection>): ProcessorTypes.ILviPdInfoSection {
    return {
        type: 'LVI_PD_INFO_SECTION',
        properties: {
            ...item,
            borders: []
        },
        height: LviPdInfoSection.getHeight()
    };
}
export function getLviPdOverviewSection(item: Partial<LviPdOverviewSection>): ProcessorTypes.ILviPdOverviewSection {
    return {
        type: 'LVI_PD_OVERVIEW_SECTION',
        properties: {
            ...item,
            borders: []
        },
        height: LviPdOverviewSection.getHeight()
    };
}
