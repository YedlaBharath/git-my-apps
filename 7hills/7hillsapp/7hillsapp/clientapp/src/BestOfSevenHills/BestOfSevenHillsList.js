import React, { Component } from 'react'
import {MainContextConsumer} from '../MainContext/MainContext'
import {Link} from 'react-router-dom'
import BestOfSevenHills from './BestOfSevenHills'

export default class BestOfSevenHillsList extends Component {
    render() {
        return (
            <>
            <h2 style={{position:"relative",textTransform:"uppercase"}}>Best Of 7 Hills</h2>
            <Link to="./">
            <button className="btn" style={{position:"fixed",left:"6rem",backgroundColor:"orange",width:"9rem",top:"0.4rem"}}>Home</button>
            </Link>
            <Link to="./Cart">
            <button className="btn" style={{position:"fixed",left:"65rem",backgroundColor:"orange",width:"9rem",top:"0.4rem"}}>Go to Cart</button>
            </Link>
            <MainContextConsumer>
                {
                    value =>{
                        // const {search} = value
                        // const filteredBiryaniProducts = value.biryaniProducts.filter(item=>{
                        //     return item.name.toLowerCase().indexOf(search.toLowerCase()) === -1
                        // })
                        // console.log(value)
                        return value.bestOfSevenHillsProducts.map((item,index)=>{
                            return <BestOfSevenHills key={index} item={item}></BestOfSevenHills>
                        })
                    }
                }
            </MainContextConsumer>
            </>
        )
    }
}


