import React from 'react'
import ChickenCurriesContainer from '../ChickenCurries/ChickenCurriesContainer'
import '../StyleCss/BackEndHomeStyle.scss'
import {MainContextConsumer} from '../MainContext/MainContext'

const ChickenCurriesSection = () => {
    return (
        <MainContextConsumer>
            {
                value=>
                {
                    if(!value.isLoggedIn){
                        return <>
                        <h2>Please Login</h2>
                        <button className="btn" style={{backgroundColor:"orange"}}onClick={()=>value.openBackEndLogin()}>Go to Login</button>
                        </>
                    }
                    if(value.isLoggedIn){return (
        <>
            <div className="vegsnacks-form-main-div">
                <h2>Chicken Snacks Section</h2>
                <div className="vegsnacks-form-sub-div">
                    <div className="vegsnacks-from-div">
                        <ChickenCurriesContainer></ChickenCurriesContainer>
                    </div>
                </div>
            </div>
        </>
                    )
                    }
                }
            }
        </MainContextConsumer>
    )
}

export default ChickenCurriesSection
