import React, {useState, useEffect} from 'react'
import api from '../actions/api'
import ItemsNewForm from './ItemsNewForm'
import  Card  from '../CardComponents/Card'
import '../StyleCss/ItemContainer.scss'


export default function ItemsContainer(){

    const [list,setList] = useState([{}])
    const [recordForEdit,setRecordForEdit] = useState(null)
    const addOrEdit = (formData,onSuccess) =>{
            if(formData.get('itemId')==="0")
            {
                api.itemsAPI().create(formData).then(res=>{
                    onSuccess();
                    fetchList();
                })
                .catch(err => console.log(err));
            }
            else{
                api.itemsAPI().update(formData.get('itemId'),formData).then(res=>{
                    onSuccess();
                    fetchList();
                })
                .catch(err => console.log(err));
            }
        }

function fetchList(){
    api.itemsAPI().fetchAll().then(res=>{
        setList(res.data)
        }
    )
    .catch(err=>console.log(err))
}
// const fetchListById=(formData)=>{
//     api.itemsAPI().fecthById(formData.get('itemId')).then(res=>{
//         setList(res.data)
//         }
//     )
//     .catch(err=>console.log(err))
// }
useEffect(()=>{
    fetchList();
},[])
const showRecordDetails = data =>{
setRecordForEdit(data);
}
const handleDelete = (e,id)=>{
    e.stopPropagation();
    if(window.confirm('Are you Sure to Delete?'))
    {
        api.itemsAPI().delete(id).then(res=>fetchList())
        .catch(err=>console.log(err))
    }
}
const imageCard= (data)=>(
    <div className="card" style={{height:"17rem", width:"10rem",zIndex:"1"}}>
        <img src={data.imageSrc} className="card-img-top" style={{height:"6rem", width:"100%"}}></img>
        <div className="card-body" style={{height:"100%", width:"100%"}}>
            <h5>{data.itemName}</h5>
            <span>{data.price} Rs/-</span>
            <button  onClick={()=>{showRecordDetails(data)}} className="btn btn-light" >Edit<i className="fa fa-pencil" aria-hidden="true"></i></button>
            <button className="btn btn-light delete-button" onClick={(e)=>handleDelete(e,parseInt(data.itemId))}>
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    </div>
)
    return (
        <div>
            {/* <div className="card-component">
            <Card></Card>
            </div> */}
            <div>
                <ItemsNewForm addOrEdit={addOrEdit} recordForEdit={recordForEdit}></ItemsNewForm>
            </div>
            {/* <div className="col=md-8"> */}
                <div>List of Items</div>
                <table className="table">
                    <tbody>
                        {
                            list && [...Array(Math.ceil(list.length/7))].map((element,index)=>
                            <tr key={index}>
                                <td  style={{border:"none"}}>{imageCard(list[7*index])}</td>
                                <td  style={{border:"none"}}>{list[7*index+1]?imageCard(list[7*index+1]):null}</td>
                                <td>{list[7*index+2]?imageCard(list[7*index+2]):null}</td>
                                <td>{list[7*index+3]?imageCard(list[7*index+3]):null}</td>
                                <td>{list[7*index+4]?imageCard(list[7*index+4]):null}</td>
                                <td>{list[7*index+5]?imageCard(list[7*index+5]):null}</td>
                                <td>{list[7*index+6]?imageCard(list[7*index+6]):null}</td>
                            </tr>
                            )}
                    </tbody>
                </table>
            {/* </div> */}
        </div>
    )
}