import React, { Component } from 'react'
import {MainContextConsumer} from '../MainContext'
import '../../StyleCss/CartStyle.scss'

class MainCartTotal extends Component {
    render() {
        const {cartSubTotal,cartTax,cartTotal,clearCart} = this.props.value
        return (
                <>
                    <div className="main-cart-total-main-div">
                    <h2>Your Invoice</h2>
                    <h3>No of Items in Cart: {this.props.value.cart.length}</h3>
                    <div className="main-cart-total-sub-div">
                    <h2>Sub Total :{cartSubTotal}</h2>
                    <h2>Tax :{cartTax}</h2>
                    {cartTotal>1000 ? <p style={{color:"green"}}>Free Delivery</p>:<p style={{color:"red"}}>Delivery Charges Applicable</p>}
                    <h2>Total :{cartTotal}</h2>
                    </div>
                    <button className="btn" style={{position:"relative",backgroundColor:"red",margin:"1rem",left:"-4rem"}} onClick={()=>{clearCart()}}>Clear Cart</button>
                    </div>
                </>                    
        )
    }
}
export default MainCartTotal
