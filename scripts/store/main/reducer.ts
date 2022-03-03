import { TOAST_OPEN_HIDE_DURATION, VIBRATION_ADD_TIME, VIBRATION_REMOVE_TIME } from 'constants';
import { callVibrate } from 'lib/callVibration';
import { addToBasketToast, removeFromBasketToast } from 'lib/toast';
import { clearTokens } from 'service/token';
import { SessionState, Constants, ActionTypes } from '.';

const initialState: SessionState = {
    showcases: [],
    products: [],
    categories: [],
    basket: [],
    users: [],
    accountMenus: [
        {
            menuId: 1,
            menuTitle: 'orders',
            menuLeftIcon: ''
        },
        {
            menuId: 2,
            menuTitle: 'settings',
            menuLeftIcon: ''
        },
        {
            menuId: 3,
            menuTitle: 'myDetails',
            menuLeftIcon: ''
        },
        {
            menuId: 4,
            menuTitle: 'notifications',
            menuLeftIcon: ''
        }
    ],
    currentUser: null,
    favorites: [],
    isUserLoggedIn: false,
    isRateAdded: false
};

export default function (state = initialState, action: ActionTypes): SessionState {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case Constants.LOGOUT: {
            clearTokens();
            newState.currentUser = null;
            newState.isUserLoggedIn = false;
            break;
        }
        case Constants.SET_NEW_USER: {
            newState.users.push(action.payload);
            break;
        }
        case Constants.SET_CURRENT_USER: {
            newState.currentUser = action.payload;
            newState.isUserLoggedIn = true;
            break;
        }
        case Constants.ADD_TO_BASKET: {
            if (action.payload.count == -1) {
                removeFromBasketToast();
                callVibrate(VIBRATION_REMOVE_TIME);
            } else {
                addToBasketToast();
                callVibrate(VIBRATION_ADD_TIME);
            }
            if (newState.basket.some((pId) => pId._id === action.payload.product._id)) {
                let updatedData = newState.basket.map((basketItem) =>
                    basketItem._id === action.payload.product._id
                        ? { ...basketItem, count: (basketItem.count += action.payload.count) }
                        : basketItem
                );
                newState.basket = updatedData.filter((a) => a.count > 0);
            } else {
                action.payload.product.count = action.payload.count;
                newState.basket.push(action.payload.product);
            }
            //setTimeout(() => hideToastDialog(), TOAST_OPEN_HIDE_DURATION);
            break;
        }
        case Constants.REMOVE_FROM_BASKET: {
            newState.basket = newState.basket.filter((product) => product._id !== action.payload.productId);
            break;
        }
        case Constants.ADD_TO_FAVORITES: {
            newState.favorites.push(action.payload.product);
            break;
        }
        case Constants.REMOVE_FROM_FAVORITES: {
            newState.favorites = state.favorites.filter((product) => product._id !== action.payload.productId);
            break;
        }
        case Constants.SET_CATEGORIES: {
            newState.categories = [...action.payload];
            break;
        }
        case Constants.SET_SHOWCASES: {
            newState.showcases = [...action.payload];
            break;
        }
        case Constants.ADD_NEW_RATE: {
            newState.isRateAdded = action.payload.isRateAdded;
            break;
        }
        default: {
            break;
        }
    }
    return newState;
}
