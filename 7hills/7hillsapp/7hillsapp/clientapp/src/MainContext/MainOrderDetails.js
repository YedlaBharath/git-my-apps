import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {MainContextConsumer} from './MainContext'
import '../StyleCss/HomeStyle.scss'
import OrderDetails from './OrderDetails'

export default class MainOrderDetails extends Component {
    render() {
        return (
            <MainContextConsumer>
                {value=>{
                    // console.log(value)
                    return value.orderDetails.map((item,index)=>{
                        return <OrderDetails key={index} item={item}></OrderDetails>
                    })
                    }}
            </MainContextConsumer>
        )
    }
}
