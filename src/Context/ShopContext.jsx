import React, {createContext} from "react";
import all_product from '../Components/Assets/all_products.js'

export const ShopContext = createContext({
    all_product: all_product
});

const ShopContextProvider = (props) => {
    const contextValue = {all_product}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
 
export default ShopContextProvider