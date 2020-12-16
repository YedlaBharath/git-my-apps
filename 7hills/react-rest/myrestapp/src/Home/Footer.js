import React from 'react'
import '../StyleCss/HomeStyle.scss'
import {Link} from 'react-router-dom'
import { MainContextConsumer } from '../MainContext/MainContext'

const Footer = () => {
    return (
        <MainContextConsumer>
            {
                value=>{
                    return (
                        <div className="footer-div">
                            Footer Page
                            <div className="footer-backend-div">
                            {/* <Link to='./BackEndLogin'> */}
                                <button className="btn btn-light" onClick={()=>value.openBackEndLogin()}>BackEnd</button>
                            {/* </Link> */}
                </div>
            </div>
                    )
                }
            }
            
            
        </MainContextConsumer>
    )
}

export default Footer
