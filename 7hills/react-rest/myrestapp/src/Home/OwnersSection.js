import React from 'react'
import '../StyleCss/BackEndHomeStyle.scss'
import OwnerContainer from '../OwnerContact/OwnerContainer'
import { OwnerTable } from './OwnerTable'
import {MainContextConsumer} from '../MainContext/MainContext'

const OwnersSection = () => {
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
            <div className="owner-form-second-div">
                <h2> Owner Section</h2>
                <div className="owner-form-subfirst-div">
                    <div className="owner-form-div">
                        <OwnerContainer></OwnerContainer>
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

export default OwnersSection
