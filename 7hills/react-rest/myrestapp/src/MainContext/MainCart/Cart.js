import React, { Component } from 'react'
import { MainContextConsumer } from '../MainContext'
import MainCartColumn from '../MainCart/MainCartColumn'
import MainCartList from '../MainCart/MainCartList'
import MainCartEmpty from '../MainCart/MainCartEmpty'
import MainCartTotal from '../MainCart/MainCartTotals'
import MainCartProceed from '../MainCart/MainCartProceed'
import { ChickenCurriesContextConsumer } from '../ChickenCurriesContext'
import ChickenCurriesCartList from '../ChickenCurriesCart/ChickenCurriesCartList'
import ChickenCurriesCartTotal from '../ChickenCurriesCart/ChickenCurriesCartTotal'
import ChickenCurriesCartEmpty from '../ChickenCurriesCart/ChickenCurriesCartEmpty'

export default class Cart extends Component {
    render() {
        return (
            <>
            {/* <ChickenCurriesContextConsumer>
                {value=>{
                    const {cart}= value
                    if(cart.length>0){
                        return(
                            <>
                            <ChickenCurriesCartList value={value}></ChickenCurriesCartList>
                            <ChickenCurriesCartTotal value={value}></ChickenCurriesCartTotal>
                            </>
                        )
                    }else{
                            return(
                            <>
                            <ChickenCurriesCartEmpty></ChickenCurriesCartEmpty>
                            </>
                            )
                        }
                }}
            </ChickenCurriesContextConsumer> */}
            <MainContextConsumer>
                {value=>{
                    const {cart} = value
                    if(cart.length>0){
                        return (
                            <>
                                <MainCartColumn/>
                                <MainCartList value={value}></MainCartList>
                                <MainCartTotal value={value}></MainCartTotal>
                                <MainCartProceed value={value}></MainCartProceed>
                            </>
                        )
                    }
                    else{
                            return(
                            <>
                            <MainCartEmpty></MainCartEmpty>
                            </>
                            )
                        }
                }
                }
            </MainContextConsumer>
            </>
        )
    }
}
