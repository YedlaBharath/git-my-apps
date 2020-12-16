// import { Card } from '@material-ui/core'
import React, { Component,useState, useEffect } from 'react'
import api from '../actions/api'
// import Card from '../CardSlideComponents/Card'


export default function SlideCart (){
    const [list,setList] = useState([])

    function fetchList(){
    api.itemsAPI().fetchAll().then(res=>{
        // console.log(JSON.stringify(res.data));
        setList(JSON.stringify(res.data))
    }
    
    )
    .catch(err=>console.log(err))
}
useEffect(()=>{
    fetchList();
},[])
        return (
            <div className="container">
                <table>
                    <tbody>
                        {
                    [...Array(Math.ceil(list.length))].map((element,index)=>
                            <tr key={index}>
                        <td>
                            {/* <Card property={list[index]}></Card> */}
                        </td>
                    </tr>
                    )
                }
                
                    </tbody>
                </table>
                <div>
                    
                </div>
                
            </div>
        )
    }
