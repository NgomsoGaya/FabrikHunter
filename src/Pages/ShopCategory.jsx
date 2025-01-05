import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/down.png'
// Fix the path to Item.jsx based on your project structure
import { Item } from '../Components/item/Item.jsx'
// Add placeholder image import
import placeholder from '../Components/Assets/placeholder.png' // Adjust path as needed

export const ShopCategory = (props) => {
    const context = useContext(ShopContext)

    if (!context || !context.all_product) {
        return <div>Loading...</div>
    }

    const { all_product } = context

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {all_product.map((item, i) => {
                    if (props.category === item.category) {
                        return (
                            <Item
                                key={i}
                                id={item.id}
                                name={item.name}
                                image={placeholder} // Now using the imported placeholder
                                new_price={item.new_price}
                                old_price={item.old_price}
                            />
                        )
                    } else {
                        return null
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
              Explore More
            </div>
        </div>
    )
}