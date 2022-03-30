import LviAccount from '../components/LviAccount';
import LviHomeProducts from '../components/LviHomeProducts';
import LviCartItem from '../components/LviCartItem';
import LviFavorites from '../components/LviFavorites';
import LviProfile from '../components/LviProfile';
import LviRow2LineButton from '../components/LviRow2LineButton';
import LviSpacer from '../components/LviSpacer';
import LviEmptyItem from '../components/LviEmptyItem';
import LviShowcaseHeader from '../components/LviShowcaseHeader';
import LviHomeCategories from '../components/LviHomeCategories';
import LviPdInfoSection from '../components/LviPdInfoSection';
import LviPdTitleLikeSection from '../components/LviPdTitleLikeSection';
import LviGenericSlider from '../components/LviGenericSlider';
import LviPdOverviewSection from '../components/LviPdOverviewSection';
import LviPdButtonPriceSection from '../components/LviPdButtonPriceSection';
import LviReview from '../components/LviReview';
import LviReviewProduct from '../components/LviReviewProduct';
import LviNutritions from '../components/LviNutritions';
import LviDescription from '../components/LviDescription';

import LviRow1LineLarge from '../components/LviRow1LineLarge';

export enum LviTypes {
    LVI_ACCOUNT,
    LVI_HOME_PRODUCTS,
    LVI_CART_PRODUCTS,
    LVI_FAVOURITES,
    LVI_PROFILE,
    LVI_ROW2_LINE_BUTTON,
    LVI_SPACER,
    LVI_ROW_2_PRODUCT_ITEM,
    LVI_EMPTY_ITEM,
    LVI_SHOWCASE_HEADER,
    LVI_HOME_CATEGORIES,
    LVI_PD_TITLE_LIKE_SECTION,
    LVI_PD_BUTTON_PRICE_SECTION,
    LVI_PD_INFO_SECTION,
    LVI_PD_OVERVIEW_SECTION,
    LVI_ROW1_LINE_LARGE,
    LVI_GENERIC_SLIDER,
    LVI_REVIEW,
    LVI_REVIEW_PRODUCT,
    LVI_NUTRITIONS,
    LVI_DESCRIPTION
}

export const LviClasses = {
    [LviTypes.LVI_ACCOUNT]: LviAccount,
    [LviTypes.LVI_HOME_PRODUCTS]: LviHomeProducts,
    [LviTypes.LVI_CART_PRODUCTS]: LviCartItem,
    [LviTypes.LVI_FAVOURITES]: LviFavorites,
    [LviTypes.LVI_PROFILE]: LviProfile,
    [LviTypes.LVI_ROW2_LINE_BUTTON]: LviRow2LineButton,
    [LviTypes.LVI_SPACER]: LviSpacer,
    [LviTypes.LVI_EMPTY_ITEM]: LviEmptyItem,
    [LviTypes.LVI_SHOWCASE_HEADER]: LviShowcaseHeader,
    [LviTypes.LVI_HOME_CATEGORIES]: LviHomeCategories,
    [LviTypes.LVI_PD_TITLE_LIKE_SECTION]: LviPdTitleLikeSection,
    [LviTypes.LVI_PD_BUTTON_PRICE_SECTION]: LviPdButtonPriceSection,
    [LviTypes.LVI_PD_INFO_SECTION]: LviPdInfoSection,
    [LviTypes.LVI_PD_OVERVIEW_SECTION]: LviPdOverviewSection,
    [LviTypes.LVI_ROW1_LINE_LARGE]: LviRow1LineLarge,
    [LviTypes.LVI_GENERIC_SLIDER]: LviGenericSlider,
    [LviTypes.LVI_REVIEW]: LviReview,
    [LviTypes.LVI_REVIEW_PRODUCT]: LviReviewProduct,
    [LviTypes.LVI_NUTRITIONS]: LviNutritions,
    [LviTypes.LVI_DESCRIPTION]: LviDescription
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
    export interface ILviCartItem extends IProcessed<LviCartItem> {}
    export interface ILviFavorites extends IProcessed<LviFavorites> {}
    export interface ILviProfile extends IProcessed<LviProfile> {}
    export interface ILviRow2LineButton extends IProcessed<LviRow2LineButton> {}
    export interface ILviSpacer extends IProcessed<LviSpacer> {}
    export interface ILviEmptyItem extends IProcessed<LviEmptyItem> {}
    export interface ILviShowcaseHeader extends IProcessed<LviShowcaseHeader> {}
    export interface ILviHomeCategories extends IProcessed<LviHomeCategories> {}
    export interface ILviPdTitleLikeSection extends IProcessed<LviPdTitleLikeSection> {}
    export interface ILviPdButtonPriceSection extends IProcessed<LviPdButtonPriceSection> {}
    export interface ILviPdInfoSection extends IProcessed<LviPdInfoSection> {}
    export interface ILviPdOverviewSection extends IProcessed<LviPdOverviewSection> {}
    export interface ILviRow1LineLarge extends IProcessed<LviRow1LineLarge> {}
    export interface ILviGenericSlider extends IProcessed<LviGenericSlider> {}
    export interface ILviReview extends IProcessed<LviReview> {}
    export interface ILviReviewProduct extends IProcessed<LviReviewProduct> {}
    export interface ILviNutritions extends IProcessed<LviNutritions> {}
    export interface ILviDescription extends IProcessed<LviDescription> {}
}

export function getLviGenericSlider(
    item: Partial<LviGenericSlider>,
    opts?: { className?: string; height?: number }
): ProcessorTypes.ILviGenericSlider {
    return {
        type: 'LVI_GENERIC_SLIDER',
        properties: {
            ...item,
            borders: []
        },
        height: LviGenericSlider.getHeight(opts)
    };
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
export function getLviFavorites(
    item: Partial<LviFavorites>,
    opts?: { onDelete?: (...args: any[]) => Promise<void> }
): ProcessorTypes.ILviFavorites {
    return {
        type: 'LVI_FAVOURITES',
        properties: {
            ...item,
            borders: [],
            onDelete: opts?.onDelete
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

export function getLviEmptyItem(item: Partial<LviEmptyItem>): ProcessorTypes.ILviEmptyItem {
    return {
        type: 'LVI_EMPTY_ITEM',
        properties: { ...item, borders: [] },
        height: LviEmptyItem.getScreenHeightDivide2()
    };
}

export function getLviShowcaseHeader(item: Partial<LviShowcaseHeader>): ProcessorTypes.ILviShowcaseHeader {
    return {
        type: 'LVI_SHOWCASE_HEADER',
        properties: { ...item, borders: [] },
        height: LviShowcaseHeader.getHeight()
    };
}

export function getLviHomeCategories(item: Partial<LviHomeCategories>): ProcessorTypes.ILviHomeCategories {
    return {
        type: 'LVI_HOME_CATEGORIES',
        properties: { ...item, borders: [] },
        height: LviHomeCategories.getHeight()
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
export function getLviRow1LineLarge(item: Partial<LviRow1LineLarge>): ProcessorTypes.ILviRow1LineLarge {
    return {
        type: 'LVI_ROW1_LINE_LARGE',
        properties: {
            ...item,
            borders: []
        },
        height: LviRow1LineLarge.getHeight()
    };
}

export function getLviReview(item: Partial<LviReview>): ProcessorTypes.ILviReview {
    return {
        type: 'LVI_REVIEW',
        properties: {
            ...item,
            borders: []
        },
        height: LviReview.getHeight(item.comment)
    };
}

export function getLviReviewProduct(item: Partial<LviReviewProduct>): ProcessorTypes.ILviReviewProduct {
    return {
        type: 'LVI_REVIEW_PRODUCT',
        properties: {
            ...item,
            borders: []
        },
        height: LviReviewProduct.getHeight()
    };
}

export function getLviNutritions(item: Partial<LviNutritions>): ProcessorTypes.ILviNutritions {
    return {
        type: 'LVI_NUTRITIONS',
        properties: {
            ...item,
            borders: []
        },
        height: LviReview.getHeight(item.nutritionValue)
    };
}

export function getLviDescription(item: Partial<LviDescription>): ProcessorTypes.ILviDescription {
    return {
        type: 'LVI_DESCRIPTION',
        properties: {
            ...item,
            borders: []
        },
        height: LviDescription.getHeight({ text: item.description })
    };
}
