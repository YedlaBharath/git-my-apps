import React from 'react'
import '../StyleCss/BackEndHomeStyle.scss'
import VegCurriesContainer from '../VegCurries/VegCurriesContainer'
import {MainContextConsumer} from '../MainContext/MainContext'

const vegCurriesSection = () => {
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
                <h2>Veg Curries Section</h2>
                <div className="vegsnacks-form-sub-div">
                    <div className="vegsnacks-from-div">
                        <VegCurriesContainer></VegCurriesContainer>
                    </div>
                </div>
            </div>
        </>)
                    }
                }
            }
        </MainContextConsumer>
    )
}

export default vegCurriesSection
