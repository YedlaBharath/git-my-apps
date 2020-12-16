import React from 'react'
import '../StyleCss/BackEndHomeStyle.scss'
import TandooriContainer from '../Tandoori/TandooriContainer'
import {MainContextConsumer} from '../MainContext/MainContext'
const TandooriSection = () => {
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
                <h2>Tandoori Section</h2>
                <div className="vegsnacks-form-sub-div">
                    <div className="vegsnacks-from-div">
                        <TandooriContainer></TandooriContainer>
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

export default TandooriSection
