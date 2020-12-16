import React from 'react'
import ChickenSnacksContainer from '../ChickenSnacks/ChickenSnacksContainer'
import '../StyleCss/BackEndHomeStyle.scss'
import {MainContextConsumer} from '../MainContext/MainContext'

const ChickenSnacksSection = () => {
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
                        <ChickenSnacksContainer></ChickenSnacksContainer>
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

export default ChickenSnacksSection
