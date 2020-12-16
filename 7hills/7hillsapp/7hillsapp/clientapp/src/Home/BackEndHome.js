import React from 'react'
import ItemsNewForm from '../ItemsComponents/ItemsNewForm'
import MenuDetails from '../Menu/MenuDetails'
import MenuForm from '../Menu/MenuForm'
import OwnerForm from '../OwnerContact/OwnerForm'
import '../StyleCss/BackEndHomeStyle.scss'
import {Link} from 'react-router-dom'
import { MainContextConsumer } from '../MainContext/MainContext'
import BackEndLogin from './BackEndLogin'
const BackEndHome = () => {
    return(
        <MainContextConsumer>
            {
                value=>
                {
                    console.log(value.isLoggedIn)
                    if(!value.isLoggedIn){
                        return <>
                        <h2>Please Login</h2>
                        <button className="btn" style={{backgroundColor:"orange"}}onClick={()=>value.openBackEndLogin()}>Go to Login</button>
                        </>
                    }
                    if(value.isLoggedIn){return (
                        <>
                            <h2>BackEnd Page</h2>
                            <button className="btn" style={{backgroundColor:"blue",position:"realtive",top:"-7rem",position:"relative"}} onClick={()=>value.closeIsLoggedIn()}>Log Out</button>
                                <div className="items-main-div">
                                    <Link to = './ItemsSection'>
                                        <label>Items Section</label>
                                    </Link>
                                    
                                </div>
                                <div className="items-main-div">
                                    <Link to = './OwnersSection'>
                                        <label>owners Section</label>
                                    </Link>
                                    
                                </div>
                                <div className="items-main-div">
                                    <Link to = './MenuSection'>
                                        <label>Menu Section</label>
                                    </Link>
                                    
                                </div>
                                <div className="items-main-div">
                                    <Link to = './VegSnacksSection'>
                                        <label>VegSnaks Section</label>
                                    </Link>
                                    
                                </div>
                                <div className="items-main-div">
                                    <Link to = './VegCurriesSection'>
                                        <label>VegCurries Section</label>
                                    </Link>
                                </div>
                                <div className="items-main-div">
                                    <Link to = './BiryaniSection'>
                                        <label>Biryani Section</label>
                                    </Link>
                                </div>
                                <div className="items-main-div">
                                    <Link to = './ChickenSnacksSection'>
                                        <label>Chicken Snacks Section</label>
                                    </Link>
                                </div>
                                <div className="items-main-div">
                                    <Link to = './MuttonSnacksSection'>
                                        <label>Mutton Snacks Section</label>
                                    </Link>
                                </div>
                                <div className="items-main-div">
                                    <Link to = './FishPrawnsSnacksSection'>
                                        <label>Fish and Prawns Snacks Section</label>
                                    </Link>
                                </div>
                                <div className="items-main-div">
                                    <Link to = './ChickenCurriesSection'>
                                        <label>Chicken Curries Section</label>
                                    </Link>
                                </div>
                                <div className="items-main-div">
                                    <Link to = './MuttonCurriesSection'>
                                        <label>Mutton Curries Section</label>
                                    </Link>
                                </div>
                                <div className="items-main-div">
                                    <Link to = './TandooriSection'>
                                        <label>Tandoori Section</label>
                                    </Link>
                                </div>
                                <div className="items-main-div">
                                    <Link to = './RotiNaanSection'>
                                        <label>Roti and Naan Section</label>
                                    </Link>
                                </div>
                                <div className="items-main-div">
                                    <Link to = './BestOfSevenHillsSection'>
                                        <label>Best of 7 HIlls Section</label>
                                    </Link>
                                </div>
                            </>
                        )
                    }
                }
                
            }
            
        </MainContextConsumer>
    )
}

export default BackEndHome
