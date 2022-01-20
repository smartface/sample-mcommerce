import { Constants, ActionTypes, SessionState } from '.';
import * as Types from 'types';

export default class Actions {
    static logout(): ActionTypes {
        return {
            type: Constants.LOGOUT
        };
    }
    static SetNewUser(user: Types.User): ActionTypes {
        return {
            type: Constants.SET_NEW_USER,
            payload: user
        };
    }
    static SetCurrentUser(user: Types.User): ActionTypes {
        return {
            type: Constants.SET_CURRENT_USER,
            payload: user
        };
    }
    static AddToBasket(basketItem: { product: Types.Product; count: number }): ActionTypes {
        return {
            type: Constants.ADD_TO_BASKET,
            payload: basketItem
        };
    }
    static RemoveFromBasket(productId: { productId: number }): ActionTypes {
        return {
            type: Constants.REMOVE_FROM_BASKET,
            payload: productId
        };
    }
    static AddToFavorites(product: { product: Types.Product }): ActionTypes {
        return {
            type: Constants.ADD_TO_FAVORITES,
            payload: product
        };
    }
    static RemoveFromFavorites(productId: { productId: number }): ActionTypes {
        return {
            type: Constants.REMOVE_FROM_FAVORITES,
            payload: productId
        };
    }
}
