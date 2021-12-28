import { createStore } from "redux";

const initialState = {
    products: [{
        id: 1,
        name: 'Sprite Can',
        description: '325ml, Price',
        price: 4.99,
        image: 'sprite.png',
        categoryId: 6,
    },
    {
        id: 2,
        name: 'Diet Coke',
        description: '325ml, Price',
        price: 1.99,
        image: 'dietcoke.png',
        categoryId: 6,
    },
    {
        id: 3,
        name: 'Orange Juice',
        description: '325ml, Price',
        price: 4.99,
        image: 'juice.png',
        categoryId: 6,
    },
    {
        id: 4,
        name: 'Organic Bananas',
        description: '12kg, Price',
        price: 4.99,
        image: 'banana.png',
        categoryId: 6,
    },
    {
        id: 5,
        name: 'Ginger',
        description: '250g, Price',
        price: 4.99,
        image: 'ginger.png',
        categoryId: 6,
    },
    {
        id: 6,
        name: 'Egg Chicken Red',
        description: '4pcs, Price',
        price: 1.99,
        image: 'eggs.png',
        categoryId: 6,
    },
    {
        id: 7,
        name: 'Beef',
        description: '1kg, Price',
        price: 4.99,
        image: 'beef.png',
        categoryId: 6,
    },
    {
        id: 8,
        name: 'Chicken',
        description: '1kg, Price',
        price: 4.99,
        image: 'chicken.png',
        categoryId: 6,
    }],
    categories: [{
        id: 1,
        title: 'Fresh Fruits & Vegetable',
        menuColor: "#1053B175",
        menuBorderColor: "#7053B175",
        categoryImg: 'catfruits.png'
    },
    {
        id: 2,
        title: 'Cooking Oil & Ghee',
        menuColor: "#10F8A44C",
        menuBorderColor: "#70F8A44C",
        categoryImg: 'catoil.png'

    },
    {
        id: 3,
        title: 'Meat & Fish',
        menuColor: "#10F7A593",
        menuBorderColor: "#70F7A593",
        categoryImg: 'catfish.png'

    },
    {
        id: 4,
        title: 'Bakery & Snacks',
        menuColor: "#10D3B0E0",
        menuBorderColor: "#70D3B0E0",
        categoryImg: 'catbread.png'

    },
    {
        id: 5,
        title: 'Dairy & Eggs',
        menuColor: "#10FDE598",
        menuBorderColor: "#70FDE598",
        categoryImg: 'categg.png'

    },
    {
        id: 6,
        title: 'Beverages',
        menuColor: "#10B7DFF5",
        menuBorderColor: "#70B7DFF5",
        categoryImg: 'catbeverages.png'

    },
    ],
    basket: [{
        id: 8,
        name: 'Chicken',
        description: '1kg, Price',
        price: 4.99,
        image: 'chicken.png',
        count: 1,
        categoryId: 6,
    }],
    users: [{
        id: 1,
        fullName: 'Eren Kan',
        username: 'erenkan',
        email: 'eren.kan@smartface.io',
        password: '1234',
        profileImage: 'userprofilephoto.png'
    },
    {
        id: 2,
        fullName: 'Fuat Guzel',
        username: 'fuatguzel',
        email: 'fuat.guzel@smartface.io',
        password: '12345',
        profileImage: 'userprofilephoto.png'
    },
    {
        id: 3,
        fullName: 'Smartface',
        username: 'smartface',
        email: 'smartface',
        password: '1234',
        profileImage: 'userprofilephoto.png'
    }],
    accountMenus: [{
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
    }],
    currentUser: []
};

const initAction = (state = initialState, action) => {
    switch (action.type) {
        case "RESET":
            state.currentUser = [];
            console.log('new', state)
            return state;
        case "SET_NEW_USER":
            state.users.push(action.payload.data)
            return state
        case "SET_CURRENT_USER":
            state.currentUser.push(action.payload.data)
            return state
        case "ADD_TO_BASKET":
            let currentBasket = state.basket
            if (currentBasket.some(pId => pId.id === action.payload.data.product.id)) {
             currentBasket.map(product => {
                 if (product.id === action.payload.data.product.id) { 
                    console.log('PAYLOAD: ',action.payload.data)
                    if(product.count >= 1) {
                        return product.count += action.payload.data.count
                    } else {
                        delete product.count
                    }
                }
            })
             state.basket = currentBasket;
            } else {
                action.payload.data.product.count = action.payload.data.count;
                state.basket.push(action.payload.data.product)
            }
            return state
        default:
            return state;
    }
};
export default createStore(initAction);
