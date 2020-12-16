import React, { Component } from 'react'
import {MainContextConsumer} from '../../MainContext/MainContext'
import MainCartItems from './MainCartItems'

export default class MainCartList extends Component {
    render() {
        return (
            <MainContextConsumer>
                {
                    value=>{
                        return value.cart.map((item,index)=>{
                            return <MainCartItems key={index} item={item} value={value}></MainCartItems>
                        })
                    }
                }
            </MainContextConsumer>
        )
    }
}
