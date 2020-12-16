import React, { useState } from 'react'
import {MainContextConsumer} from '../MainContext/MainContext'
import '../StyleCss/HomeStyle.scss'

const initialvalues = {
    user:"",
    password:""
}

const BackEndLogin=()=> {
    const [BackEndInitialValues,setBackEndInitialValues] = useState(initialvalues)
    const handleBackendFormChange=(e)=>{
        setBackEndInitialValues({
            ...BackEndInitialValues,
            [e.target.name]:e.target.value
        })
    }
    const handleBackEndLoginSubmit=(e)=>{
        e.preventDefault();
        if(BackEndInitialValues.user==="user" && BackEndInitialValues.password === "root")
        {
            window.alert("logged in successfully")
        }
        else{
            window.alert("username or password is wrong")
        }
    }
        return(
            <MainContextConsumer>
                {
                    value=>{
                        // console.log(value.openBackEnd)
                        // console.log(value.BackEndInitialValues)
                        if(!value.openBackEnd)
                        {
                            return null
                        }
                        if(value.openBackEnd){return(
                            <>
                            <div className="modal-login-main-div">
                                <div className="modal-login-sub-div">
                                    <h5>Please Login</h5>
                                <i className="fa fa-times" onClick={()=>value.closeBackEndLogin()}></i>
                                <form autoComplete="off" noValidate onSubmit={(e)=>value.handleBackEndLoginSubmit(e)}>
                                <div className="form-group login-user-div">
                                    <label className="login-user-label">User Name</label>
                                    <input type="text" required name="user" placeholder="User Name" className="form-control" onChange={(e)=>value.handleBackendFormChange(e)}></input>
                                </div>
                                <div className="form-group login-password-div">
                                    <label className="login-password-label">Password</label>
                                    <input type="password" required name="password" placeholder="Password" onChange={(e)=>value.handleBackendFormChange(e)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <button className="btn" style={{backgroundColor:"orange",position:"relative",left:"2rem"}} type="submit">Log in</button>
                                </div>
                            </form>
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
export default BackEndLogin
