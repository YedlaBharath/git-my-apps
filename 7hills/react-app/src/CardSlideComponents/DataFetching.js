// import { useContext, useReducer } from "react"
import React ,{useReducer,useContext, useEffect} from 'react'
import axios from 'axios'

const initialstate={
    post:{}
}
const reducer = (state,action)=>{
    switch(action.type)
    {
        case 'FETCH_SUCCESS':
            return {
                post:action.payload
            }
        default:
            return state
    }
}

function DataFetching() {
    const [state, dispatch] = useReducer(reducer, initialstate)
    const fetchList=()=>{
        axios.get("http://localhost:64823/api/DB7HillsInsertItems/7")
        .then(res=>{
            dispatch({type:"FETCH_SUCCESS",payload:res.data})
        })
}
useEffect(()=>{
fetchList()
},[])
    return (
        <div>
            {/* <img src={state.post.itemImage}></img> */}
            {
                console.log(state.post.itemName)
            }
        </div>
    )
}

export default DataFetching
