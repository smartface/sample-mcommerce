## :page_facing_up: Home 

  In home page, you can see the showcases and products. You can also add products to your cart.


### :information_source: Info
    
- In home page, we have 4 API calls in Promise. All of them are asynchronous. 

    - Showcase API call, which returns a list of showcases.

    - Product API call, which returns a list of products.

    - Banner API call, which returns a list of banners.
    
    - Categories API call, which returns a list of categories.
   

### :bulb: Tips
 
 - We recommend you to call the API calls in **`onShow`** event. **`onLoad`** is best for the set up of the UI and lists. You can face some UI issues if you call the API calls in **`onLoad`** event.

 - We create a **`initialized`** variable to check if the API calls are done and prevent the call of the API calls again.

 - We use **`Processors`** for the create dynamic [ListView](https://docs.smartface.io/smartface-native-framework/ui-elements/listview) UI elements.

 - For Banners, we set dynamic height based on the screen width.


## :page_facing_up:  Product Detail
 
 In product detail page, you can see the product details. You can also add the product to your cart and favorite the product.

### :information_source: Info
 
- In product detail page, we have product API call based on the product id.

- In reviews page, If user logged in, user can be review the product.

- In nutrition page, User can be see the nutrition information.

- We use [**SwipeView**](https://docs.smartface.io/smartface-native-framework/ui-elements/swipeview) for the product images. **`FlSwipeView`** is a wrapper of **`SwipeView`** and it is used to create a swipe view.

- We use the share button to share the product. When someone click the share button, we will open the share dialog. 

- If someone click the shared link, we will open the product detail page. We do it by using [**Deeplink**](https://docs.smartface.io/smartface-native-framework/miscellaneous-native-features/universal-links/).

- You can look at the **`deeplink.ts`** for specific deeplink implementation.


----------


## :page_facing_up: Categories (Explorer) 

In categories (explorer) page, you can see the categories


### :information_source: Info

- In categories (explorer) page, we have API call for the get categories.

    - We use [GridView](https://docs.smartface.io/smartface-native-framework/ui-elements/gridview) to list the categories.

    - We use **`waitDialog`** to show the loading while the API call is running.


### :warning: Caution
 
 - We have workaround on this page to due to the Theme issue.
   
    - ```typescript

              if (System.OS === System.OSType.ANDROID) {
            //Android item widths fails after theme change this fixes it
            themeService.onChange(() => {
                this.categoriesGrid.itemCount = this.categories.length;
                this.categoriesGrid.refreshData();
            });
        }


 :point_right:  [**Dialog**](https://docs.smartface.io/smartface-native-framework/ui-elements/dialog)

 

## :page_facing_up:  Category Detail
 
In category detail page, you can see the products in the category. You can also add products to your cart and search products with the search bar on the top right corner.


### :information_source: Info

- In category detail page, we have API call for the get products in the category.
    
    - We use [**ListView**](https://docs.smartface.io/smartface-native-framework/ui-elements/listview) to list the products.
    
    - We use **`waitDialog`** to show the loading while the API call is running.

    - This page also serves `Showcases` products along with the products in the category.

 - If category or showcases are empty, we show a **`Empty Item`** in the list.   


### :bulb: Tips

 - `this.route.getState().routeData.isShowcase` is used to check if the products are **`Showcase`** products.

   - If it is **`Showcase`** products, we show the showcase products in the category detail page.

   - If it is **`Category`** products, we show the products in the category detail page.


----------


## :page_facing_up: Cart 

 In cart page, you can see the products in your cart. You can also remove products from your cart and set the quantity of the products.


### :information_source: Info

 - We use **`Processors`** for the create dynamic [**ListView**](https://docs.smartface.io/smartface-native-framework/ui-elements/listview) for the list of products in the cart.
  
 - We use **`state`** to store the products in the cart. On every change of the state, we update the UI and checkout price of the products.



### :bulb: Tips

  - In **`onShow`** event, we use `store.subscribe` event:
     
      - To get state changes from the store, and change the UI accordingly.


----------


## :page_facing_up: Favorites 

 In favorites page, you can see the products in your favorites. You can also remove products from your favorites.


### :information_source: Info
 
  - We use **`Processors`** for the create dynamic [**ListView**](https://docs.smartface.io/smartface-native-framework/ui-elements/listview) for the list of products in the favorites.

  - We use **`state`** to set and get the products in the favorites.

  - We use [**ListView Swipe**](https://docs.smartface.io/smartface-native-framework/ui-elements/listview#right-and-left-swipe-list-items) to remove products from the favorites.

  - If favorites are empty, we show a **`Empty Item`** in the list.   
  


----------


## :page_facing_up: Account 

 In account page, you can see the account information. You can also change the account information and Login/Logout.


### :information_source: Info

 - We use **`Processors`** for the create dynamic [**ListView**](https://docs.smartface.io/smartface-native-framework/ui-elements/listview) for the list of account menu.

 - We use **`state`** to get is the user logged in or not. Based on the state, we show the login/logout button.

 #### Settings

 In settings page, you can change the theme.


### :information_source: Info
 
 - This page is singleton to avoid the create theme instance every time.

  
:point_right:  [**Dialog**](https://docs.smartface.io/smartface-native-framework/ui-elements/dialog)

----------


## Routes 

 We seperate the routes into two parts:
   
   - **``Auth.ts``**
   - **`Tabbar.ts`**

 They are used to handle the authentication and tabbar and merge them into one file named **`index.ts`** in the **`/scripts/routes`** folder.  


 #### Tabbar

  - We use [**Tabbar**](https://docs.smartface.io/smartface-native-framework/ui-elements/bottomtabbar) to create the tabbar.

  - Someof pages are modal and stack on top of the other. 

     - **`pgProductDetail`** is modal.
     - **`pgCategoryDetail`** is modal.

  - In **`Tabbar.ts`**, we watch the `basketCounter` state to update the `Cart` tabbar badge.

 :point_right:  [**Tabbar**](https://docs.smartface.io/smartface-native-framework/ui-elements/bottomtabbar)

 :point_right:  [**Pages**](https://docs.smartface.io/smartface-native-framework/ui-elements/page#pop-up-pages-modal)

----------

### Auth
  In  **``Auth.ts``**, route is used `Login` and `Signup` pages.

----------


## :closed_lock_with_key: Login and Signup

### Login

  - **`pgLogin`** is used to login. There is a `Login` button on the page. When the user click the button, we call the `login` method in the **`Auth.ts`** service. 

     - There is simple validate for the password and email.

    - There is a regex to validate the email.


### Signup
  
- **`pgSignup`** is used to signup. There is a `Signup` button on the page. When the user click the button, we call the `signup` method in the **`commerce.ts`** service. 

  - There is simple validate for the password and email.

  - There is a regex to validate the email.

  - We use `AttributedString` to create signup terms and conditions text.


 :point_right:  [**TextView**](https://docs.smartface.io/smartface-native-framework/ui-elements/textview#attributedtext)

### Basics of the App


### :information_source: Info

 - We use **`textStyleCatalog`** to set the text style for the text in the app. 

 - We defined types in the **`types.ts`** file.

 - We use **`Redux`** to store the state of the app and actions. For more information, please refer to the [**`Redux`**](https://redux.js.org/) documentation.

 - We use **`listViewItemTypes.ts`** to define the type of the listview items and use them in the **`Processors`** for the create dynamic [**ListView**](https://docs.smartface.io/smartface-native-framework/ui-elements/listview).

 - We use **`Processors`** for the create dynamic [**ListView**](https://docs.smartface.io/smartface-native-framework/ui-elements/listview).

 - **setTextDimentions.ts** is used to set the text dimentions dynamically.

 - **waitDialog.ts** is used to show the loading while the API call is running.

 - **`scripts/service`** Folder is used to store the services:

   - **`commerce.ts`** is used to call the API's.

   - **`auth.ts`** is used to handle the authentication.

   - **`index.ts`** is used to create http service call object.

   - **`token.ts`** is used to store the token and user information. 
