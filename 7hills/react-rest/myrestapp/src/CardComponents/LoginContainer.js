import React,{useState,useEffect} from 'react'
import LoginForm from './LoginForm'
import api from '../actions/api'

const LoginContainer = () => {
    
const [list,setList]=useState([{}])
    const addOrEdit = (data,onSuccess)=>{
        api.userloginAPI().create(data).then(res=>{
            onSuccess();
            fetchList();
        })
        .catch(err => console.log(err))
    }
    const fetchList=()=>{
        api.userloginAPI().fetchAll().then(res=>setList(res.data))
        .catch(err=>console.log(err))
    }
    
    useEffect(()=>{
        fetchList()
    },[])
    return (
        <div>
            {
                console.log(list)
            }
            <LoginForm addOrEdit={addOrEdit}></LoginForm>
        </div>
    )
}

export default LoginContainer
