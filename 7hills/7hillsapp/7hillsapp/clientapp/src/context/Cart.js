import React, { Component } from 'react'
import CartColumn from './CartColumn'
import EmptyCart from './EmptyCart'
import {ProductConsumer} from './MockContext'
import CartList from './CartList'
import CartTotals from './CartTotals'

export default class Cart extends Component {
    render() {
        return (
            <div>
                <ProductConsumer>
                    {value=>{
                        const {cart} = value
                        if(cart.length>0){
                            return (
                                <>
                                <CartColumn></CartColumn>
                                <CartList value={value}></CartList>
                                <CartTotals value={value}></CartTotals>
                                </>
                            )
                        }
                        else{
                            return (
                                <EmptyCart></EmptyCart>
                            )
                        }
                        
                    }}
                </ProductConsumer>
            </div>
        )
    }
}
