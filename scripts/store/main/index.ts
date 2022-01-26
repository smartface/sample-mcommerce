import * as Types from 'types';
import { Type } from 'typescript';

export interface SessionState {
    products: Types.Product[];
    basket: Types.Basket;
    categories: Types.Categories[];
    users: Types.User[];
    showcases: Types.HomeShowcases[];
    accountMenus: Types.AccountMenus[];
    favorites: Types.Favorites;
    currentUser: Types.User;
    isUserLoggedIn: boolean;
}

export namespace Constants {
    export const LOGOUT = 'LOGOUT';
    export const SET_NEW_USER = 'SET_NEW_USER';
    export const SET_CURRENT_USER = 'SET_CURRENT_USER';
    export const ADD_TO_BASKET = 'ADD_TO_BASKET';
    export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET';
    export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
    export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
    export const SET_CATEGORIES = 'SET_CATEGORIES';
    export const SET_SHOWCASES = 'SET_SHOWCASES';
}

declare namespace Actions {
    export interface Logout {
        type: typeof Constants.LOGOUT;
    }
    export interface SetNewUser {
        type: typeof Constants.SET_NEW_USER;
        payload: Types.User;
    }
    export interface SetCurrentUser {
        type: typeof Constants.SET_CURRENT_USER;
        payload: Types.User;
    }
    export interface AddToBasket {
        type: typeof Constants.ADD_TO_BASKET;
        payload: {
            product: Types.Product;
            count: number;
        };
    }
    export interface RemoveFromBasket {
        type: typeof Constants.REMOVE_FROM_BASKET;
        payload: {
            productId: string;
        };
    }
    export interface AddToFavorites {
        type: typeof Constants.ADD_TO_FAVORITES;
        payload: {
            product: Types.Product;
        };
    }
    export interface RemoveFromFavorites {
        type: typeof Constants.REMOVE_FROM_FAVORITES;
        payload: {
            productId: string;
        };
    }
    export interface SetCategories {
        type: typeof Constants.SET_CATEGORIES;
        payload: Types.Categories[];
    }
    export interface SetShowcases {
        type: typeof Constants.SET_SHOWCASES;
        payload: Types.HomeShowcases[];
    }
}

export type ActionTypes =
    | Actions.Logout
    | Actions.SetNewUser
    | Actions.SetCurrentUser
    | Actions.AddToBasket
    | Actions.RemoveFromBasket
    | Actions.AddToFavorites
    | Actions.RemoveFromFavorites
    | Actions.SetCategories
    | Actions.SetShowcases;
