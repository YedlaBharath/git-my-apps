import React,{useState,useEffect} from 'react'
import api from '../actions/api'
import { ItemTable } from '../Home/ItemTable'
import '../StyleCss/ItemContainer.scss'
import Data from './Data'


const Card =()=> {
    const [list,setList] = useState([{itemId:0,itemName:"",price:0,imageSrc:""}])
    const [index,setIndex] = useState(0)
    function fetchList(){
    api.itemsAPI().fetchAll().then(res=>{
        setList(res.data)
        }
    )
    .catch(err=>console.log(err))
}
console.log(index)
useEffect(()=>{
    fetchList()
},[])
const handleNextClick=()=>{
    if(index<list.length-1){
        setIndex(index+1)
    }
    if(index===list.length-1)
    {
        setIndex(0)
    }
    
}
const handlepreviousClick=()=>{
    if(index>0)
    {
        setIndex(index-1)
    }
    if(index===0){
        setIndex(list.length-1)
    }
}
// const {a:{itemId,imageSrc,price,itemName}} ={a:list[index]}

return (
    <>
    <div className="cart-btn">
        <button name ="canPrev" onClick={handlepreviousClick} disabled={index===0} >Previous</button>
        <button onClick={handleNextClick} disabled={index===list.length-1}>Next</button>
    </div>
    <div className="col">
    <div className={`cards-slider active-slide-${index}`}>
        <div className="cards-slider-wrapper" style={{'transform':`translateX(-${index*(100/list.length)}%)`}}>
            {
                list.map((element,index)=>
                    <Data key={element.itemId} props={element} i={index}></Data>
                )
            }
        </div>
    </div>
    <ItemTable prop={list}></ItemTable>
    </div>
    </>
)
}
export default Card