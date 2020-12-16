import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import{ProductConsumer} from './MockContext'

export default class Product extends Component {
    render() {
        const {id,image,price,inCart} = this.props.product
        return (
            <div className="container">
                <ProductConsumer>
                    {
                        value=>(
                        <div className="image-container" onClick={()=>{value.handleDetail(id)}}>
                            <Link to='./Details'>
                                <img src={image}></img>
                            </Link>
                            <h2>{price}</h2>
                            <button className="cart-btn btn" disabled={inCart ? true:false}
                            onClick={()=>{value.addToCart(id);value.openModal(id)}}>
                                {inCart?<h2 disabled>In Cart</h2>:<i className="fa fa-cart-plus"></i>}
                            </button>
                            
                        </div>
                        )
                    }
                </ProductConsumer>
            </div>
        )
    }
}
