import React from 'react'
import './NewCollections.css'
import new_collection from '../Assets/new_collections.js'
import {Item} from '../item/Item.jsx'
import plcholder from '../Assets/placeholder.png'

export const NewCollections = () => {
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
        {new_collection.map((item, i) => {
          return (
            <Item 
              key={i} 
              id={item.id}
              name={item.name}
              image={plcholder}
              new_price={item.newPrice}
              old_price={item.oldPrice}
            />
          )
        })}
      </div>
    </div>
  )
}
