import React, { Component } from 'react'
import {MainContextConsumer} from '../MainContext/MainContext'
import {Link} from 'react-router-dom'

export default class BackEndSuccess extends Component {
    render() {
        return (
            <MainContextConsumer>
                {
                    value=>{
                        // console.log(value.isLoggedIn)
                        // console.log(value.onSuccess)
                        if(!value.onSuccess)
                        {
                            return null
                            
                        }
                        if(value.onSuccess){return(
                            <div className="modal-login-main-div">
                                <div className="modal-login-sub-div">
                                <i className="fa fa-times" onClick={()=>value.closeBackEndSuccess()}></i>
                                    <h2>You have been logged in SuccessFully</h2>
                                    <Link to='./BackEndHome'>
                                    <button className="btn" style={{backgroundColor:"orange"}} onClick={()=>value.closeBackEndSuccess()}>OK</button>
                                    </Link>
                                </div>
                            </div>
                        )
                        }
                    }
                }
            </MainContextConsumer>
        )
    }
}
