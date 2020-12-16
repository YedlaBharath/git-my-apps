import React,{useState,useEffect,useReducer} from 'react'
import '../StyleCss/HomeStyle.scss'
import api from '../actions/api'
import { actions } from 'react-table';
import axios from 'axios';


const initialState = {
  list: [],
};
const initialvalues ={
//     email:"",
//     mobile:0,
//     userName:"",
// passWord:""
}
const ACTIONS={
    CREATE:"CREATE",
    FETCHALL:"FETCHALL",
    UPDATE:"UPDATE",
    DELETE:"DELETE"
}
function reducer(state,action){
    switch(action.type)
    {
        case ACTIONS.FETCHALL:
        return {
            ...state,
            list:[...action.payload]
        }
        case ACTIONS.CREATE:
        // return [...state,newState(action.payload.values)]
        return {
            ...state,
            list:[...state.list,action.payload]
        }
        default:
            return state;
    }
}
function newState(values){
    return {id:Date.now() ,values:values,complete:false}
}


const SignupForm = () => {
    const [state,dispatch] = useReducer(reducer,initialState)
    const [values, setValues] = useState({email:"",
    mobile:0,
    userName:"",
    passWord:""
})
    const handleInput =(e)=>{
        // const {name, value} = e.target;
        // const feildValue = { [name]: value };
        setValues({...values,[e.target.name]: e.target.value});
    }
    useEffect(()=>{
        fetchAllList();
    },[])
    // const fetchAllList = async()=>{
    //     const result = await axios.post()
    // }
    function fetchAllList(){
        api.signupAPI().fetchAll()
        .then((response) => {
      console.log(response);
      dispatch({
        type: ACTIONS.FETCHALL,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
    }
    const addoredit=(values)=>{
    api.signupAPI().create(values)
        .then((response) => {
      console.log(response);
      dispatch({
        type: ACTIONS.CREATE,
        payload: response.data,
      });
      resetform();
    })
    .catch((err) => console.log(err));
        // dispatch({type:ACTIONS.CREATE,payload: {values:values}})
    }
    function resetform(){
        setValues(initialvalues)
    }
    const handleSignupSubmit= async e=>{
        e.preventDefault()
        await axios.post("http://localhost:64823/api/Signup/",values)
    }
    console.log(values)
    return (
        <div>
            <form autoComplete="off" noValidate onSubmit={handleSignupSubmit}>
                <div className="home-signup1" id="home-signup-id">
                    <h2 className="name-h2">SignUp Form</h2>
                    <div className="signup-form">
                        <div className="form-group email-div">
                            <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleInput} value={values.email}></input>
                        </div>
                        <div className="form-group email-div">
                            <input type="text" placeholder="Mobile No" name="mobile" className="form-control" onChange={handleInput} value={values.mobile} ></input>
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
            <div>
                {
                    state.list.map(e=>
                        <div key={e.id}>{e.email}</div>)
                }
            </div>
        </div>
    )
}

export default SignupForm
