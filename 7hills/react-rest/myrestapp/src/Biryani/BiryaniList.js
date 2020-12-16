import React, { Component } from 'react'
import {MainContextConsumer} from '../MainContext/MainContext'
import Biryani from '../Biryani/Biryani'
import {Link} from 'react-router-dom'

export default class BiryaniList extends Component {
    render() {
        return (
            <>
            <h2 style={{position:"relative",textTransform:"uppercase"}}>7 Hills Biryani Section</h2>
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
                        return value.biryaniProducts.map((item,index)=>{
                            return <Biryani key={index} item={item}></Biryani>
                        })
                    }
                }
            </MainContextConsumer>
            </>
        )
    }
}
