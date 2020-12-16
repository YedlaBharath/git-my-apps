import React,{useState,useEffect,useReducer} from 'react'
import '../StyleCss/HomeStyle.scss'

function SignUpContainer() {
    const [values, setValues] = useState([])
    const handleInput =(e)=>{
        const {name, value} = e.target;
        const feildValue = { [name]: value };
        setValues({
            ...values,
            ...feildValue,
        })
    }
    function handleSignupSubmit(e){
        e.preventDefault()
        // dispatch({type:ACTIONS.CREATE,payload: {values:values}})
    }
    return (
        <div>
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

export default SignUpContainer
