import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {ProductConsumer} from './MockContext'

export default class Details extends Component {
    render() {
        return (
            <div>
                <ProductConsumer>
                {value=>{
                    console.log(value)
                    const { id,image,price,inCart} = value.detailProduct
                    return (
                        <div className="container">
                            <img src={image}></img>
                            <h2>{price}</h2>
                            <Link to='/'>
                            <button>Back to produts</button>
                            </Link>
                            <button disabled={inCart?true:false} onClick={()=>{value.addToCart(id);value.openModal(id)}}>
                                {inCart?<p disabled>In Cart</p>:<p>Add to Cart</p>}
                            </button>
                        </div>
                    )
                }}
                </ProductConsumer>
            </div>
        )
    }
}
