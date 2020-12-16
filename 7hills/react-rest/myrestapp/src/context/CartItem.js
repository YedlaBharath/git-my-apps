import React from 'react'

const CartItem = ({item,value}) => {
    const {id,image,price,total,count} = item
    const {increment,decrement,removeItem} = value
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>{image}</td>
                    <td>{price}</td>
                    <td>
                        <button className="btn" onClick={()=>{decrement(id)}}>-</button>
                        <h3>{count}</h3>
                        <button className="btn" onClick={()=>{increment(id)}}>+</button>
                    </td>
                    <td><i className="fa fa-trash" onClick={()=>{removeItem(id)}}></i></td>
                    <td>{total}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CartItem
