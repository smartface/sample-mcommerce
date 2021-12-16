import { createStore } from "redux";

const initialState = {
    products: [{
        name: 'Sprite Can',
        description: '325ml, Price',
        price: 4.99,
        image: 'sprite.png',
        categoryId: 6,
    },
    {
        name: 'Sprite Can',
        description: '325ml, Price',
        price: 4.99,
        image: 'sprite.png',
        categoryId: 6,
    },
    {
        name: 'Sprite Can',
        description: '325ml, Price',
        price: 4.99,
        image: 'sprite.png',
        categoryId: 6,
    },
    {
        name: 'Sprite Can',
        description: '325ml, Price',
        price: 4.99,
        image: 'sprite.png',
        categoryId: 6,
    },
    {
        name: 'Sprite Can',
        description: '325ml, Price',
        price: 4.99,
        image: 'sprite.png',
        categoryId: 6,
    }],
    categories: [{
        id: 1,
        title: 'Fresh Fruits & Vegetable'
    },
    {
        id: 2,
        title: 'Cooking Oil & Ghee'
    },
    {
        id: 3,
        title: 'Meat & Fish'
    },
    {
        id: 4,
        title: 'Bakery & Snacks'
    },
    {
        id: 5,
        title: 'Dairy & Eggs'
    },
    {
        id: 6,
        title: 'Beverages'
    },
    ],
    basket: [],
    users: [{
        id: 1,
        fullName: 'Eren Kan',
        email: 'eren.kan@smartface.io',
        password: 1234,
    },
    {
        id: 2,
        fullName: 'Fuat Guzel',
        email: 'fuat.guzel@smartface.io',
        password: 12345,
    }]
};

const setBasket = (state = initialState, action) => {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case "SET_BASKET":
            return newState.basket = action.payload
        default:
            return state;
    }
};

export default createStore(setBasket);
