import React, { Component } from 'react'
import {ProductConsumer} from './MockContext'
import {Link} from 'react-router-dom'

export default class Modal extends Component {
    render() {
        return (
            <div>
                <ProductConsumer>
                    {value=>{
                        const {modalOpen,closeModal} = value
                        const {image,price,id,} = value.modalProduct
                        if(!modalOpen)
                        {
                            return null;
                        }
                        else{
                            return(
                            <div className="container">
                                <h5>Item Add To Cart</h5>
                                <img src={image}></img>
                                <h2>{id}</h2>
                                <h2>{price}</h2>
                                <Link to='/'>
                                <button onClick={()=>closeModal()}>Store</button>
                                </Link>
                                <Link to='/Cart'>
                                <button onClick={()=>closeModal()}>Go To Cart</button>
                                </Link>
                            </div>
                            )
                        }
                    }}
                </ProductConsumer>
            </div>
        )
    }
}
