import React,{useState,useEffect} from 'react'
import api from '../actions/api'
import '../StyleCss/ItemContainer.scss'
import MainCard from './MainCard'

const MainData =()=> {
    const [list,setList] = useState([{itemId:0,itemName:"",price:0,imageSrc:""}])
    const [index,setIndex] = useState(0)
    function fetchList(){
    api.menuAPI().fetchAll().then(res=>{
        setList(res.data)
        }
    )
    .catch(err=>console.log(err))
}
useEffect(()=>{
    fetchList()
},[])
const handleNextClick =()=>{
    if(index<list.length-1){
        setIndex(index+1)
    }
    if(index===list.length-1)
    {
        setIndex(0)
    }
}
const handlePreviousClick =()=>{
    if(index>0)
    {
        setIndex(index-1)
    }
    if(index===0)
    {
        setIndex(list.length-1)
    }
}
    return (
        <>
            <div>
                <div onClick={handleNextClick} disabled={index===list.length-4}>
                    <button className="btn" aria-hidden="true" disabled={index===list.length-4}><i className="fa fa-chevron-right"></i></button></div>
                <div onClick={handlePreviousClick} disabled={index===0}>
                    <button className="btn" aria-hidden="true" disabled={index===0}>
                        <i className="fa fa-chevron-left"></i></button></div>
            </div>
                
            <div className="container-slider">
                <div className="container-slider-wrapper" style={{'transform':`translateX(-${index*(100/list.length)}%)`}}>
                    {list.map((property,index)=>
                        <MainCard key={index} props={property} i={index}></MainCard>
                    )}
                </div>
            </div>
        </>
    )
}


export default MainData
