import React from 'react'
import '../StyleCss/ItemContainer.scss'

const Data = ({props,i}) => {
    const {a:{itemId,imageSrc,itemName, price},} = {a:props}
    const {index} = {index:i}
    // console.log(index)
    return (
        <div id={`card-${index}`} className="Card">
            <img src={imageSrc} className="img-container" id={`Name: ${itemName}`} autoFocus={true}></img>
        </div>
    )
}
export default Data

