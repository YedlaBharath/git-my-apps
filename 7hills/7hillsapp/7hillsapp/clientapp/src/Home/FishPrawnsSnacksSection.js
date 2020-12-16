import React from 'react'
import FishPrawnsSnacksContainer from '../FishPrawnsSnacks/FishPrawnsSnacksContainer'
import '../StyleCss/BackEndHomeStyle.scss'
import {MainContextConsumer} from '../MainContext/MainContext'

const FishPrawnsSnacksSection = () => {
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
                        <FishPrawnsSnacksContainer></FishPrawnsSnacksContainer>
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

export default FishPrawnsSnacksSection
