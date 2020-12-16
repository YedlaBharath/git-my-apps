import React from 'react'
import {Link} from 'react-router-dom'

const CartTotals = ({value}) => {
    const {cartSubTotal,cartTax,cartTotal,clearCart} = value
    console.log(cartSubTotal)
    return (
        <>
            <div className="container">
                <button className="btn" onClick={()=>clearCart()}>Clear Cart</button>
                <div> SubTotal :{cartSubTotal}</div>
                <div>Tax : {cartTax}</div>
                <div>Total : {cartTotal}</div>
            </div>
        </>
    )
}

export default CartTotals
