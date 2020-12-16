import React, { Component } from 'react'
import {MainContextConsumer} from './MainContext'
import {Link} from 'react-router-dom'
import '../StyleCss/HomeStyle.scss'

export default class MainProductDetails extends Component {
    render() {
        return (
            <MainContextConsumer>
                {value=>{
                        const {openProduct,closeProductsDetail} = value
                        const {imageSrc,name,} = value.productsDetail
                        if(!openProduct)
                        {
                            return null;
                        }
                        else{
                            return(
                            <div className="modal-main-div">
                                <div className="modal-sub-div">
                                    <h5>Item Added To Cart</h5>
                                <i className="fa fa-times" onClick={()=>closeProductsDetail()} style={{position:"relative",   fontSize:"1.3rem",left: "-5rem",top: "-7rem", cursor: "pointer"}}></i>
                                    <img src={imageSrc} className="modal-img-div"></img>
                                    <h2 style={{fontSize: "1.4rem",fontWeight:"400",letterSpacing:"0.1rem"}}>Name : {name}</h2>
                                    <Link to='/'>
                                    <button onClick={()=>closeProductsDetail()} className="btn" style={{color:"blue",backgroundColor:"orange",margin:"1rem"}}>Continue to Shop</button>
                                    </Link>
                                    <Link to='/Cart'>
                                    <button onClick={()=>closeProductsDetail()} className="btn" style={{color:"orange",backgroundColor:"green"}}>Go To Cart</button>
                                    </Link>
                                </div>
                                
                            </div>
                            )
                        }
                    }}
            </MainContextConsumer>
        )
    }
}
