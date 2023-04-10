import React from 'react'
import "./cards.css"
const Cards = ({product}) => {
    const {title,thumbnail,price,rating} = product
  return (
    <div className='cards' >
        <img src={thumbnail} alt= "random"></img>
        <h3>{title}</h3>
        <div className='cards-info'>
        <p>price - ${price}</p>
        <p>rating- {rating}</p>
        </div>
        
    </div>
  )
}

export default Cards