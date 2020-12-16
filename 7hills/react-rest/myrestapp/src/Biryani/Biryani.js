import React, { Component } from 'react'
import { MainContextConsumer } from '../MainContext/MainContext'
import '../StyleCss/MainSectionStyle.scss'
import MainProductDetails from '../MainContext/MainProductDetails'

export default class Biryani extends Component {
    render() {
        const {imageSrc,name,price,id,inCart,section,cartId} = this.props.item
        return (
            <MainContextConsumer>
                {
                    value=>(
                        <>
                        <div className="filter-main-div">
                            {/* <select value={price} onChange={(e)=>value.filterPoductPrice(e)}>
                                <option value="">ALL</option>
                                <option value="highest">highest</option>
                                <option value="medium">medium</option>
                                <option value="lowest">Lowest</option>
                            </select> */}
                        </div>
                        <div className="main-section-item-main-addcard">
                            <img src={imageSrc} className="main-section-item-main-card-img"></img>
                            <div className="main-section-item-main-card-body">
                                <h2>{name}</h2>
                                <h4>{price}{` Rs/-`}</h4>
                                <h4>{section}</h4>
                                <button className="main-section-item-main-card-btn btn" 
                                onClick={()=>{value.addToCart(cartId);value.openProductDetail(cartId)}
                                }
                                disabled={inCart ? true : false}>
                                    {inCart ?"In Cart": "Add To Cart"}
                                </button>
                            </div>
                        </div>
                        </>
                    )
                }
            </MainContextConsumer>
        )
    }
}
