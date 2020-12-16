import React, { Component } from 'react'
import ChickenCurriesCartItem from './ChickenCurriesCartItem'
import {ChickenCurriesContextConsumer} from '../ChickenCurriesContext'

export default class ChickenCurriesCartList extends Component {
    render() {
        return (
            <ChickenCurriesContextConsumer>
                {
                    value=>{
                        return value.cart.map((item,index)=>{
                            return <ChickenCurriesCartItem key={index} item={item} value={value}></ChickenCurriesCartItem>
                        })
                    }
                }
            </ChickenCurriesContextConsumer>
        )
    }
}
