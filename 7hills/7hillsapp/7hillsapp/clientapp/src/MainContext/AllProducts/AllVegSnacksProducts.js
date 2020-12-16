import React, { Component } from 'react'
import {MainContextConsumer} from '../MainContext'

export default class AllVegSnacksProducts extends Component {
    render() {
        return (
            <MainContextConsumer>
                {
                    value=>{
                        return (
                        value.vegSnacksProducts.map((item,index)=>{
                            // if(tempProducts.nv===non){
                            return (
                                item.section === this.props.id && <div key={index} className="card" style={{height:"17rem", width:"10rem",zIndex:"1"}}>
                                    <img src={item.imageSrc} className="card-img-top" style={{height:"8rem", width:"100%"}}></img>
                                    <div className="card-body" style={{height:"100%", width:"100%"}}>
                                        <h4 style={{fontSize:"1rem"}}>{item.name}</h4>
                                        <h4 style={{fontSize:"0.7rem"}}>{item.price}{` Rs/-`}</h4>
                                        <button className="btn btn-light" 
                                        onClick={()=>{value.addToCart(item.cartId);value.openProductDetail(item.cartId)}
                                        }
                                        disabled={item.inCart ? true : false}>
                                            {item.inCart ?"In Cart": "Add To Cart"}
                                        </button>
                                    </div>
                                </div>
                            )
                            // }
                        }))
                        }
                }
            </MainContextConsumer>
        )
    }
}
