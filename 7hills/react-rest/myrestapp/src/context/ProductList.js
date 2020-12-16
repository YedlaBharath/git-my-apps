import React, { Component } from 'react'
import{ProductConsumer} from './MockContext'
import Product from './Product'

export default class ProductList extends Component {
    render() {
        
        return (
                <ProductConsumer>
                    {(value)=>{
                        return value.products.map((product,index)=>{
                            return <Product key={index} product={product}></Product>
                        })
                    }}
                </ProductConsumer>
        )
    }
}
