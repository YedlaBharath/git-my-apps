import React, { Component } from 'react'
import { MainContextConsumer } from '../MainContext'
import AddCart from './AddCart'

export default class AddCartList extends Component {
    render() {
        return (
            <MainContextConsumer>
                {
                    value=>{
                        return value.biryaniDummyProducts.map((item,index)=>{
                            return <AddCart key={index} item={item}></AddCart>
                        })
                    }
                }
            </MainContextConsumer>
        )
    }
}

