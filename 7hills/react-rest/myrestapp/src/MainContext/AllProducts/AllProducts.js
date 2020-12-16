import React, { Component } from 'react'
import {MainContextConsumer} from '../MainContext'
import '../../StyleCss/HomeMainSpanCss.scss'
import AllBiryaniProducts from './AllBiryaniProducts'
import AllChickenCurriesProducts from './AllChickenCurriesProducts'
import AllVegCurriesProducts from './AllVegCurriesProducts'
import AllVegSnacksProducts from './AllVegSnacksProducts'
import AllChickenSnacksProducts from './AllChickenSnacksProducts'
import AllMuttonCurryProducts from './AllMuttonCurryProducts'
import AllMuttonSnacksProducts from './AllMuttonSnacksProducts'
import AllRotiNaanProducts from './AllRotiNaanProducts'
import AllTandooriProducts from './AllTandooriProducts'
import AllFishPrawnsSnacksProducts from './AllFishPrawnsSnacksProducts'

export default class AllProducts extends Component {
    render() {
        return (
            <>
            {/* {console.log(this.props)} */}
                {
                    this.props.match.params.id==="Non-Veg"? <h2>7 Hills Non-Vegetarian Section</h2>:<h2>7 Hills Vegetarian Section</h2>
                }
            <div style={{position:"relative",display:"flex"}}>
                    <AllBiryaniProducts id={this.props.match.params.id}></AllBiryaniProducts>
                    <AllChickenCurriesProducts id={this.props.match.params.id}></AllChickenCurriesProducts>
                    <AllVegCurriesProducts id={this.props.match.params.id}></AllVegCurriesProducts>
                    <AllVegSnacksProducts id={this.props.match.params.id}></AllVegSnacksProducts>
                    <AllChickenSnacksProducts id={this.props.match.params.id}></AllChickenSnacksProducts>
                    <AllMuttonCurryProducts id={this.props.match.params.id}></AllMuttonCurryProducts>
                    <AllMuttonSnacksProducts id={this.props.match.params.id}></AllMuttonSnacksProducts>
                    <AllRotiNaanProducts id={this.props.match.params.id}></AllRotiNaanProducts>
                    <AllTandooriProducts id={this.props.match.params.id}></AllTandooriProducts>
                    <AllFishPrawnsSnacksProducts id={this.props.match.params.id}></AllFishPrawnsSnacksProducts>
            </div>
            </>
        )
    }
}
