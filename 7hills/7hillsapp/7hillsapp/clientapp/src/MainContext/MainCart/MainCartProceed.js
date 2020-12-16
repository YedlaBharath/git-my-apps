import React, { Component } from 'react'
import {MainContextConsumer} from '../MainContext'
import '../../StyleCss/CartStyle.scss'
import {Link} from 'react-router-dom'

export default class MainCartProceed extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name:"",
            email:"",
            address:""
        }
    }
    
    handleInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    createOrder=(e)=>{
        e.preventDefault();
        const order = {
            name:this.state.name,
            emai:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems,
        }
        console.log(this.props.value)
        // this.props.createOrder(order)
        this.props.value.createOrder(order)
        

    }
    render() {
        return (
            <MainContextConsumer>
                {
                    value=>{
                        // console.log(value)
                        return (
                            <>
                            <div className="main-proceed-div">
                                <Link to='./SignupContainer'>
                                <button className="btn" style={{backgroundColor:"orange"}} >Proceed</button>
                                </Link>
                                    {/* <button className="btn" style={{backgroundColor:"orange"}} 
                                    onClick={()=>value.checkOutForm()}>Proceed</button> */}
                            </div>
                            {
                                value.showCheckOut && (
                                    <form onSubmit={this.createOrder}>
                                    <div className="checkout-form-main-div">
                                        <div className="checkout-form-sub-div">
                                            <div className="form-group" style={{top:"2rem"}}>
                                            <label style={{left:"-3rem"}}>Email</label>
                                            <input type="email" name="email" placeholder="Email" className="form-control control-label" style={{left:"2rem"}} onChange={this.handleInput}></input>
                                            </div>
                                            <div className="form-group" style={{top:"3rem"}}>
                                            <label style={{left:"-3rem"}}>User Name</label>
                                            <input type="text" name="name" placeholder="user Name" className="form-control control-label" style={{left:"2rem"}} onChange={this.handleInput}></input>
                                            </div>
                                            <div className="form-group" style={{top:"4rem"}}>
                                            <label style={{left:"-3rem"}}>Address</label>
                                            <textarea col="3" row='3' type="text" name="address" placeholder="Address" className="form-control control-label" style={{left:"2rem"}} onChange={this.handleInput}></textarea>
                                            </div>
                                            <button type="submit" className="btn" style={{position:"relative",top:"7rem",backgroundColor:"orange"}}>Check Out</button>
                                        </div>
                                    </div>
                                    </form>
                                )
                            }
                            </>
                        )
                    }
                }
            </MainContextConsumer>
        )
    }
}
