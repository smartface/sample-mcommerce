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
        name: 'Diet Coke',
        description: '325ml, Price',
        price: 1.99,
        image: 'dietcoke.png',
        categoryId: 6,
    },
    {
        name: 'Orange Juice',
        description: '325ml, Price',
        price: 4.99,
        image: 'juice.png',
        categoryId: 6,
    },
    {
        name: 'Organic Bananas',
        description: '12kg, Price',
        price: 4.99,
        image: 'banana.png',
        categoryId: 6,
    },
    {
        name: 'Ginger',
        description: '250g, Price',
        price: 4.99,
        image: 'ginger.png',
        categoryId: 6,
    },
    {
        name: 'Egg Chicken Red',
        description: '4pcs, Price',
        price: 1.99,
        image: 'eggs.png',
        categoryId: 6,
    },
    {
        name: 'Beef',
        description: '1kg, Price',
        price: 4.99,
        image: 'beef.png',
        categoryId: 6,
    },
    {
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
    basket: [],
    users: [{
        id: 1,
        fullName: 'Eren Kan',
        email: 'eren.kan@smartface.io',
        password: '1234',
        profileImage: 'userprofilephoto.png'
    },
    {
        id: 2,
        fullName: 'Fuat Guzel',
        email: 'fuat.guzel@smartface.io',
        password: '12345',
        profileImage: 'userprofilephoto.png'
    },
    {
        id: 3,
        fullName: 'Smartface',
        email: 'smartface',
        password: '1234',
        profileImage: 'userprofilephoto.png'
    }],
    accountMenus:[{
        menuId: 1,
        menuTitle: 'Orders',
        menuLeftIcon: ''
    },
    {
        menuId: 2,
        menuTitle: 'Settings',
        menuLeftIcon: ''
    },
    {
        menuId: 3,
        menuTitle: 'My Details',
        menuLeftIcon:''
    },
    {
        menuId: 4,
        menuTitle: 'Payment Methods',
        menuLeftIcon: ''
    },
    {
        menuId: 5,
        menuTitle: 'Promo Card',
        menuLeftIcon: ''
    },
    {
        menuId: 6,
        menuTitle: 'Notifications',
        menuLeftIcon: ''
    },
    {
        menuId: 7,
        menuTitle: 'Help',
        menuLeftIcon: ''
    },
    {
        menuId: 8,
        menuTitle: 'About',
        menuLeftIcon: ''
    }],
    currentUser:[]
};

const initAction = (state = initialState, action) => {
    switch (action.type) {
        case "SET_NEW_USER":
            state.users.push(action.payload.data)
            return state
        case "SET_CURRENT_USER":
            state.currentUser.push(action.payload.data)
            return state
        default:
            return state;
    }
};
export default createStore(initAction);
