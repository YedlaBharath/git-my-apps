import React,{useState,useEffect} from 'react'
import Contacts from './Contacts'
import api from '../actions/api'
import {Link}from 'react-router-dom'
import '../StyleCss/HomeStyle.scss'
import axios from 'axios'
import {MainContextConsumer} from '../MainContext/MainContext'
const initialvalues ={
    // id:0,
    email:"",
    mobile:0,
    userName:"",
    passWord:""
}

const Nav = () => {
    const [count,setCount]=useState(0)
    const [values, setValues] = useState(initialvalues)
    const [list,setList]=useState([{}])
    const [search,setSearch] = useState([])
    
    const handleLoginForm=()=>{
        if(count%2===0){
            document.getElementById('home-login-id').style.display="block"
            document.getElementById('home-signup-id').style.display="none"
            setCount(count+1)
        }
        else{
            document.getElementById('home-login-id').style.display="none"
            setCount(count+1)
        }
    }
    const handleLoginFormBlur = ()=> {
        // document.getElementById('home-login-id').style.display="none"
    }
    useEffect(()=>{
        fetchValues()},[])
    const handleSignupForm = ()=> {
        if((count-1)%2===0){
            document.getElementById('home-signup-id').style.display="block"
            document.getElementById('home-login-id').style.display="none"
            setCount(count+1)
        }
        else{
            document.getElementById('home-signup-id').style.display="none"
            setCount(count+1)
        }
    }
    
    const handleInput =(e)=>{
        const {name, value} = e.target;
        const feildValue = { [name]: value };
        setValues({
            ...values,
            ...feildValue,
        })
    }
    
    function resetfrom(){
        setValues(initialvalues)
    }
    function fetchValues(){
        api.signupAPI().fetchAll().then(res=>setList(res.data)).catch((err)=>console.log(err))
    }
    
    const handleSignupSubmit = (e)=>{
        e.preventDefault();
        
        const fd = new FormData()
        fd.append("email",values.email)
        fd.append("mobile",values.mobile)
        fd.append("userName",values.userName)
        fd.append("passWord",values.passWord)
        addValues(values);
    }
    function addValues(data){
        api.signupAPI().create(data).then(res=>{
            fetchValues();
            resetfrom()
        }).catch((err)=>console.log(err))
    }
    const handleLoginSubmit =()=>{}
    return (
        <div className="nav-index">
            <nav className="home-nav">
                <ul>
                    <li><select className="home-location options">
                        <option value="Hyderabad">Hyderabad</option>
                        </select>
                    </li>
                    <li>
                        <div className="home-info">
                            <i className="fa fa-info" aria-hidden="true"></i><label>Info</label>
                        </div>
                    </li>
                    {/* <li>
                        <div className="home-user" onClick={handleLoginForm} onBlur={handleLoginFormBlur}>
                            <i className="fa fa-user-circle" aria-hidden="true"></i><label>Log in</label>
                        </div>
                    </li> */}
                    <li>
                        <div className="home-cart">
                            <Link to='./Cart'>
                                <i className="fa fa-shopping-cart" aria-hidden="true"></i><label>Cart</label>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="home-cart">
                        <Link to='./Contacts'>
                            <label>Contact</label>
                        </Link>
                        </div>
                    </li>
                    {/* <li>
                        <div className="home-cart">
                        <Link to ="../IndexDOM/MainData">
                            <label>Items</label>
                        </Link>
                        </div>
                    </li> */}
                </ul>
            </nav>
            <div className="home-search">
                        <MainContextConsumer>
                                        {
                                            value=>{
                                                return (
                                                    <>
                                                        <input type="text" name="search" placeholder="Search Menu Items" className="input-group-prepend" style={{border:"none"}} onChange={(e)=>value.handleSearch(e)}></input>
                                                        <i className="fa fa-search" aria-hidden="true"></i>
                                                        <i className="fa fa-close"></i>
                                                        {value.renderSearch()}
                                                    </>
                                                )
                                            }
                                        }
                                    
                        </MainContextConsumer>
                        </div>

            <form autoComplete="off" noValidate onSubmit={handleLoginSubmit} >
                <div className="home-login" id="home-login-id">
                <h2 className="name-h2">Login Form</h2>
                <div className="login-form">
                    <div className="form-group email-div">
                        <input type="text" placeholder="UserName" className="form-control"></input>
                    </div>
                    <div className="form-group password-div">
                        <input type="password" placeholder="Password" className="form-control password-input"></input>
                    </div>
                    <div className="form-group submit-div">
                        <input type="submit" className="form-control btn-success" value="Login"></input>
                    </div>
                </div>
                <div className="form-group signup-div">
                    <a>Forgot Password ?</a>{" or "}<a onClick={handleSignupForm}>Sign Up</a>
                </div>
            </div>
            </form>
            <form autoComplete="off" noValidate onSubmit={handleSignupSubmit}>
                <div className="home-signup" id="home-signup-id">
                    <h2 className="name-h2">SignUp Form</h2>
                    <div className="signup-form">
                        <div className="form-group email-div">
                            <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleInput} value={values.email}></input>
                        </div>
                        <div className="form-group email-div">
                            <input type="text" placeholder="Mobile No" name="mobile" className="form-control" onChange={handleInput}value={values.mobile} ></input>
                        </div>
                        <div className="form-group user-div">
                            <input type="text" placeholder="UserName" name="userName" className="form-control" 
                            onChange={handleInput} value={values.userName}></input>
                        </div>
                        <div className="form-group password-div">
                            <input type="password" placeholder="Password" name="passWord" className="form-control password-input" onChange={handleInput} value={values.passWord}></input>
                        </div>
                        <div className="form-group submit-div">
                            <button type="submit" className="form-control btn-success">Sign Up</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Nav
