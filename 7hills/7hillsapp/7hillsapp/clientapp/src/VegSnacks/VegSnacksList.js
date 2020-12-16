import React, { Component } from 'react'
import {MainContextConsumer} from '../MainContext/MainContext'
import VegSnacks from './VegSnacks'
import {Link} from 'react-router-dom'

export default class VegSnacksList extends Component {
    render() {
        return (
            <>
            <h2 style={{textTransform:"uppercase"}}>7 Hills Veg Snacks Section</h2>
            <Link to="./clientapp">
            <button className="btn" style={{position:"fixed",left:"6rem",backgroundColor:"orange",width:"9rem",top:"0.4rem"}}>Home</button>
            </Link>
            <Link to="./Cart">
            <button className="btn" style={{position:"fixed",left:"65rem",backgroundColor:"orange",width:"9rem",top:"0.4rem"}}>Go to Cart</button>
            </Link>
            <MainContextConsumer>
                {
                    value=>{
                        // console.log(value)
                        return value.vegSnacksProducts.map((item,index)=>{
                            return <VegSnacks key={index} item={item}></VegSnacks>
                        })
                    }
                }
            </MainContextConsumer>
            </>
        )
    }
}
