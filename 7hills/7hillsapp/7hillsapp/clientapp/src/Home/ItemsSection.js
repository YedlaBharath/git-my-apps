import React from 'react'
import ItemsContainer from '../ItemsComponents/ItemsContainer'
import { ItemTable } from './ItemTable'
import '../StyleCss/BackEndHomeStyle.scss'
import {MainContextConsumer} from '../MainContext/MainContext'

const ItemsSection = () => {
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
            <div className="items-form-first-div">
                <h2>Items Section</h2>
                <div className="items-form-subfirst-div">
                    <div className="items-form-div">
                        <ItemsContainer></ItemsContainer>
                    </div>
                </div>
                <div className="items-form-subsecond-div">
                    <ItemTable></ItemTable>
                </div>
            </div>
        </>)
                    }
                }
            }
        </MainContextConsumer>
    )
}

export default ItemsSection
