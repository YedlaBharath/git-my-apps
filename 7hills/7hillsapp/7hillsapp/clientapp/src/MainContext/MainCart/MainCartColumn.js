import React, { Component } from 'react'
import '../../StyleCss/CartStyle.scss'
import {MainContextConsumer} from '../MainContext'
import{Link} from 'react-router-dom'

export default class MainCartColumn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            count:0,
        }
    }
        handleMenu=()=>{
            if(this.state.count%2===0)
            {
                document.getElementById("btn-id").style.left="0rem"
            }
            else{
                document.getElementById("btn-id").style.left="-15rem"
            }
            this.setState(()=>{
                    this.state.count= this.state.count+1
                })
            // console.log(this.state.count)
            
        }
    render() {
        return (
            <MainContextConsumer>
                {
                    value=>{
                        return(
                            <>
                            
                            <div className="cart-column-main-div">
                                <div className="cart-column-menu-div">
                                    {/* <button className="btn btn-menu">Menu</button> */}
                                </div>
                                <Link to="./clientapp">
                                <button className="btn" style={{position:"fixed",left:"6rem",backgroundColor:"orange",width:"9rem",top:"0.4rem"}}>Home</button>
                            </Link>
                                <h2>Your Cart Items</h2>
                            </div>
                            {/* <div className="cart-colum-menu" id="btn-id"></div> */}
                            <div className="cart-column-name">
                                {
                                    // console.log(value.menuNames)
                                    value.menuNames.map((item,index)=>(
                                        <div key={index}>
                                        <Link to={`./MainSection${item}`}>
                                            <label className="cart-column-name-label">{item}</label>
                                        </Link>
                                        </div>
                                    ))
                                }
                            </div>
                            </>
                        )
                    }
                }
            
                {/* <div className="cart-item-main-div">
                    <div className="cart-img-div">
                        <label>Image</label>
                    </div>
                    <div className="cart-name-div">
                        <label>Name</label>
                    </div>
                    <div className="cart-price-div">
                        <label>Price</label>
                    </div>
                    <div className="cart-quantity-div">
                        <label>Quantity</label>
                    </div>
                    <div className="cart-tot-div">
                        <label>Total</label>
                    </div>
                </div> */}
            </MainContextConsumer>
        )
    }
}
