import React, { Component } from 'react'
import { ChickenCurriesContextConsumer } from '../ChickenCurriesContext'

export default class ChickenCurriesCartTotal extends Component {
    render() {
        const {cartSubTotal,cartTax, cartTotal, clearCart} = this.props.value
        return (
            <ChickenCurriesContextConsumer>
                {
                    value=>{
                        return (
                            <>
                                {/* <button className="btn" style={{backgroundColor:"red",margin:"1rem"}} onClick={()=>{clearCart()}}>Clear Cart</button> */}
                                <h2>Sub Total :{cartSubTotal}</h2>
                                <h2>Tax :{cartTax}</h2>
                                <h2>Total :{cartTotal}</h2>
                            </>
                        )}
                }
            </ChickenCurriesContextConsumer>
        )
    }
}
