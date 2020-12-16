import React ,{useState,useEffect}from 'react'
import api from '../actions/api'

const ItemDetails = ({match}) => {
    const [list,setList] = useState([{}])
    const [items,setItems] = useState([{}])
    // console.log(match)
    // const [id,setId]= useState(0);
    const ids= match.params.id;
    console.log(ids)
    
    const fetchListById= async()=>{
        // setId(match.params.id)
        if(ids==7)
        {api.ownersAPI().fetchAll().then(res=>setList(res.data))}
            // else{document.getElementById('card-id').style.display="none"}}
            if(ids==8)
            {
                api.itemsAPI().fetchAll().then(res=>setItems(res.data))
            }else{document.getElementById('card-id').style.display="none"}}
        // api.itemsAPI().fecthById(match.params.id).then(res=>setList(res.data))}
    // const fetchListById= async()=>{
    // const fetchListId = await fetch(`http://localhost:64823/api/DB7HillsInsertItems/${match.params.id}`);
    // const items = await fetchListId.json();
    // console.log(items)
    // setList(items)
    // }
    useEffect(()=>{
        fetchListById();
    },[ids])
    function check(){
        if(ids==7){
            return true
        }
        // else{document.getElementById('card-id').style.display="none"}
    }
    // const {a:{itemName}} = {list}
    // console.log(itemName)
    return (
        <div id="card-id">
            {items.map((e,index)=>
            <div key={index}>
                <h2>{e.itemName}</h2>
            </div>
            )}
            {
                list.map((e,index)=>
                // {switch(ids){
                //     case 7:
                //         return (
                //             <div key={index} id={`card-${index}`}>
                //             <h2>{e.ownerName}</h2>
                //             <img src={e.ownerImageSrc}></img>
                //         </div>
                //         )
                //         default:
                //         return (
                //             <h2>dsjnvjadfnv</h2>
                //         )
                // }
                {
                    return(
                        <div key={index} id={`card-${index}`}>
                            <h2>{e.ownerName}</h2>
                            <img src={e.ownerImageSrc}></img>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default ItemDetails
