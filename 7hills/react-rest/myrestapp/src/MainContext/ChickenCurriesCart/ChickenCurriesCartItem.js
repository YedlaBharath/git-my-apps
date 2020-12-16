import React, { Component } from 'react'

export default class ChickenCurriesCartItem extends Component {
    render() {
        const {imageSrc,name,price,count,total,id} = this.props.item
        const {increment,decrement,removeItem} = this.props.value
        return (
            <>
                <h2>Your Cart</h2>
                <div className="cart-item-main-div">
                    <div className="cart-img-div">
                        <label>Image</label>
                        <img src={imageSrc} className="cart-img"></img>
                    </div>
                    <div className="cart-name-div">
                        <label>Name</label>
                        <h2 className="cart-name">{name}</h2>
                    </div>
                    <div className="cart-price-div">
                        <label>Price</label>
                        <h2 className="cart-price">{price}</h2>
                    </div>
                    <div className="cart-quantity-div">
                        <label>Quantity</label>
                        <button className="btn btn-dec" onClick={()=>decrement(id)}><i className="fa fa-minus"></i></button>
                        <h2 className="cart-quantity">{count}</h2>
                        <button className="btn btn-inc" onClick={()=>increment(id)}><i className="fa fa-plus"></i></button>
                    </div>
                    <div className="cart-tot-div">
                        <label>Total</label>
                        <h2 className="cart-tot">{total}</h2>
                    </div>
                    <i className="fa fa-trash" onClick={()=>removeItem(id)}>Remove</i>
                </div>
            </>
        )
    }
}
