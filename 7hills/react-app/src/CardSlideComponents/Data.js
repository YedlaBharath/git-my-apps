// import { Card } from '@material-ui/core'
import React, { Component,useEffect,useState } from 'react'
import api from '../actions/api'
// import SlideCart from './SlideCart'

// const initialdata={
//     itemData:[]
// }
function Data() {
    const [query,setQuery]= useState("")
    const [list,setList]= useState([])
    // const [itemData, setItemData]= useState([])
    const fetchList=()=>{
        api.itemsAPI().fetchAll()
        .then(res=>setList(res.data))
    //     .then((hits)=>hits.map(({imageSrc})=> imageSrc))
    }
    const runQuery = ()=>{
        fetch(
            "http://localhost:64823/api/DB7HillsInsertItems/"
        )
        .then(res=>res.json())
        .then(({list})=>list.map(({imageSrc})=>imageSrc))
        // .then(({index})=> [...Array(Math.ceil(list.length))].map((index)=>list[index].imageSrc))
        .then(setList)
    }
        

useEffect(()=>{
fetchList()
// setItemData(list)
// console.log([...list])
},[])
// const ddata={
//     properties:[
        
//                 [...Array(Math.ceil(list.length))]
//                 .map((element,index)=>{
//                 console.log(list[index])
//                 // itemId:{this.state.list[index].itemId}
            
//                 })]
//     }
    return (<div>
        <img onChange={(e)=>setQuery(e.target.value)}></img>
        <button onClick={runQuery}>Search</button>
    </div>)}
        // <div>
        //     {
                // [...Array(Math.ceil(list.length))].map((items,index)=>
                // <ul key={index}>
                //     <Card property={list[index]}></Card>
                // </ul>
                // )
            // [...Array(Math.ceil(list.length))]
                // .map((element,index)=>
                    // <div key={index}>
                    //     {/* <img src={list[index].imageSrc}></img> */}
                    //     <div>{list[index].itemName}</div>
                    // </div>
                // console.log(list[index])
        //     )
        // }
        // <div ></div>
        // </div>
    // )
// }
    // )


export default Data


// class Data extends Component {
//     constructor(props) {
//         super(props)
    
//         this.state = {
//             list:[]
//         }
//     }
    

//     fetchList(){
//         api.itemsAPI().fetchAll().then(res=>{
//         // console.log(res.data)
//         this.setState({
//             ...this.state.list,
//         list:[...res.data]
//     })
//     })
// }
// componentDidMount(){
//         this.fetchList()
//     }
// componentDidUpdate(){
    
//     // let listLength= this.state.list.length
//     console.log(Data.properties.list)
// }
    
//     render() {
//         return (
//             <div>
                
//                 <SlideCart></SlideCart>
//             </div>
//         )
//     }
// }
// export const data={
//     properties:[
        
//                 [...Array(Math.ceil(this.state.list.length))]
//                 .map((element,index)=>{
//                 console.log(this.state.list[index])
//                 // itemId:{this.state.list[index].itemId}
            
//                 })]
//     }

// export default Data

