import { SessionState, Constants, ActionTypes } from '.';

const initialState: SessionState = {
    showcaseProducts: [],
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
            menuTitle: 'paymentMethods',
            menuLeftIcon: ''
        },
        {
            menuId: 5,
            menuTitle: 'promo',
            menuLeftIcon: ''
        },
        {
            menuId: 6,
            menuTitle: 'notifications',
            menuLeftIcon: ''
        },
        {
            menuId: 7,
            menuTitle: 'help',
            menuLeftIcon: ''
        },
        {
            menuId: 8,
            menuTitle: 'about',
            menuLeftIcon: ''
        }
    ],
    currentUser: null,
    favorites: [],
    isUserLoggedIn: false
};

export default function (state = initialState, action: ActionTypes): SessionState {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case Constants.LOGOUT: {
            newState.currentUser = null;
            break;
        }
        case Constants.SET_NEW_USER: {
            newState.users.push(action.payload);
            break;
        }
        case Constants.SET_CURRENT_USER: {
            newState.currentUser = action.payload;
            break;
        }
        case Constants.ADD_TO_BASKET: {
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
        default: {
            break;
        }
    }
    return newState;
}
