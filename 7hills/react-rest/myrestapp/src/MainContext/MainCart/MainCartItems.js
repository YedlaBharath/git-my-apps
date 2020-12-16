import React, { Component } from 'react'
import '../../StyleCss/CartStyle.scss'

export default class MainCartItems extends Component {
    render() {
        const {imageSrc,name,price,count,total,id,cartId} = this.props.item
        const {increment,decrement,removeItem} = this.props.value
        return (
            <>
            <div className="main-section-item-main-card">
                            <img src={imageSrc} className="main-section-item-main-card-img"></img>
                            <div className="main-section-item-main-card-body">
                                <h2 className="cart-name">{name}</h2>
                                <h4 className="cart-price">Price: {price}{` Rs/-`}</h4>
                                <h2 className="cart-tot">Total: {total}</h2>
                            </div>
                                <button className="btn btn-dec" onClick={()=>decrement(cartId)}><i className="fa fa-minus"></i></button>
                                <h2 className="cart-quantity">{count}</h2>
                                <button className="btn btn-inc" onClick={()=>increment(cartId)}><i className="fa fa-plus"></i></button>
                                <button className="main-section-item-main-btn btn" onClick={()=>removeItem(cartId)}>
                                    Remove
                                </button>
                            
                        </div>
            </>
        )
    }
}
