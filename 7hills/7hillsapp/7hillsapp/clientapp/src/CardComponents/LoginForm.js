import React,{useState,useEffect} from 'react'

const initialvalues = {
    id:0,
    userName:"",
    passWord:"",
}
const LoginForm = (props) => {
    const {addOrEdit} = props
    const [values,setValues]= useState(initialvalues)
    const handleInput = (e)=>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }
    const handleSignupSubmit=(e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("id",values.id)
        formData.append("userName",values.userName)
        formData.append("passWord",values.passWord)
        addOrEdit(formData,resetForm)
    }
    const resetForm=()=>{
        setValues(initialvalues)
    }
    return (
        <div>
            <form autoComplete="off" noValidate onSubmit={(e)=>handleSignupSubmit(e)}>
                <div className="home-signup1" id="home-signup-id">
                    <h2 className="name-h2">SignUp Form</h2>
                    <div className="signup-form">
                        <div className="form-group email-div">
                            <input type="email" name="email" placeholder="Email" className="form-control" onChange={(e)=>handleInput(e)} value={values.userName}></input>
                        </div>
                        <div className="form-group email-div">
                            <input type="password" placeholder="Password" name="passWord" className="form-control" onChange={(e)=>handleInput(e)} value={values.passWord} ></input>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
