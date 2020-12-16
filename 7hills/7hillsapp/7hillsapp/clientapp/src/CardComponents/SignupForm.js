import React,{useState,useEffect} from 'react'
import { MainContextConsumer } from '../MainContext/MainContext'

const initialvalues = {
    userId:Math.floor(100000 + Math.random()* 900000),
    name:"",
    email:"",
    mobile:1,
    // address:"",
}
// const express = require('express')
// const emailValidator = require('deep-email-validator');
const SignupForm = (props) => {
    const {addOrEdit} = props
    const [values,setValues]= useState(initialvalues)
    const [errors,setErrors] =useState({})
    // useEffect(()=>{
    //     if(recordForEdit!=null)
    //     {
    //         setValues(initialvalues)
    //     }
    // })
    const handleInput = (e)=>{
        // const fieldValue = {[e.target.name]:e.target.value}
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
        // validate(fieldValue)
    }
    const validate = ()=>{
        let temp = {}
        temp.name = values.name==""?false:true
        temp.mobile = values.mobile==0?false:true
        temp.email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(values.email)==""?false:true
        // emailValidator.validate(values.email)
        setErrors(temp)
        return Object.values(temp).every(x=>x==true)
    }
    
    const handleSignupSubmit=(e)=>{
        e.preventDefault();
        if(validate()){
        const formData = new FormData()
        formData.append("userid",values.userId)
        formData.append("name",values.name)
        formData.append("mobile",values.mobile)
        formData.append("email",values.email)
        // formData.append("passWord",values.passWord)
        // formData.append("address",values.address)
        addOrEdit(formData,resetForm)
        }
    }
    
    const applyErrorClass = field =>((field in errors && errors[field]==false)?" invalid-field":"")
    const resetForm=()=>{
        setValues(initialvalues)
    }
    return (
        <MainContextConsumer>
            {
                value=>(
                    <form autoComplete="off" noValidate onSubmit={(e)=>handleSignupSubmit(e)}>
                        <div className="home-signup1" id="home-signup-id">
                            <h2 className="name-h2">Please Fill The Form To Place An Order</h2>
                            <div className="signup-form" style={{position:"relative", left:"30rem"}}>
                                <div className="form-group email-div">
                                    <input type="text" name="userId" placeholder="Id" className="form-control" value={values.userId} disabled></input>
                                </div>
                                <div className="form-group email-div">
                                    <input type="email" name="email" placeholder="Email" className={"form-control" + applyErrorClass('email')}  onChange={(e)=>handleInput(e)} value={values.email}></input>
                                </div>
                                <div className="form-group email-div">
                                    <input type="text" placeholder="Mobile No" name="mobile" className={"form-control" + applyErrorClass('mobile')}  onChange={(e)=>handleInput(e)} value={values.mobile} disabled></input>
                                </div>
                                <div className="form-group user-div">
                                    <input type="text" placeholder="UserName" name="name" className={"form-control" + applyErrorClass('name')}  
                                    onChange={(e)=>handleInput(e)} value={values.name}></input>
                                </div>
                                {/* <div className="form-group password-div">
                                    <input type="password" placeholder="Password" name="passWord" className="form-control password-input" onChange={(e)=>handleInput(e)} value={values.passWord}></input>
                                </div> */}
                                {/* <div className="form-group password-div">
                                    <input type="text" placeholder="Address" name="address" className="form-control" onChange={(e)=>handleInput(e)} value={values.address}></input>
                                </div> */}
                                <div className="form-group" style={{position:"relative", left:"-1rem"}}>
                                    <button type="submit" className="form-control btn-success" onClick={()=>validate() && value.openOrderDetails(values.userId)}>Place An order</button>
                                </div>
                            </div>
                        </div>
                    </form>
                )
            }
            {/* {console.log(values)} */}
            
        </MainContextConsumer>
    )
}

export default SignupForm
