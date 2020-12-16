import React,{useState,useEffect} from 'react'
import BestForm from '../BestOfSevenHills/BestForm'
import api from '../actions/api'

const BestContainer = () => {
    const [list,setList] = useState([{}])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const addOrEdit = (formData,onSuccess)=>{
        if(formData.get('id')==="0"){
            api.bestofsevenhillsAPI().create(formData).then(res=>{
            fetchList();
            onSuccess();
        }).catch(err => console.log(err))
        }
        else{
            api.bestofsevenhillsAPI().update(formData.get('id'),formData).then(res=>{
                fetchList();
                onSuccess();
            })
        }
    }
    const fetchList =()=>{
        api.bestofsevenhillsAPI().fetchAll().then(res=>setList(res.data)).catch(err => console.log(err))
    }
    useEffect(()=>{
        fetchList()
    },[])
    const showMenuDetails =(data)=>{
        setRecordForEdit(data);
    }
    const handleDelete = (e,id)=>{
        e.stopPropagation();
        if(window.confirm('Are You Sure to Delete ?'))
        {
            api.bestofsevenhillsAPI().delete(id).then(res=>fetchList()).catch(err=>console.log(err))
        }
    }
    const imageCard= (data)=>(
    <div className="card" style={{height:"17rem", width:"10rem",zIndex:"1"}}>
        <img src={data.imageSrc} className="card-img-top" style={{height:"8rem", width:"100%"}}></img>
        <div className="card-body" style={{height:"100%", width:"100%"}}>
            <h4 style={{fontSize:"1rem"}}>{data.name}</h4>
            <h4 style={{fontSize:"0.7rem"}}>{data.price}{` Rs/-`}</h4>
            <h4 style={{fontSize:"0.7rem"}}>{data.section}</h4>
            <button className="btn btn-light" onClick={()=>{showMenuDetails(data)}} style={{margin:"0.5rem"}}>Edit<i className="fa fa-pencil" aria-hidden="true"></i></button>
            <button className="btn btn-light delete-button" onClick={(e)=>handleDelete(e,parseInt(data.id))}>
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    </div>
    )
    return (
        <>
        <BestForm addOrEdit={addOrEdit} recordForEdit={recordForEdit}></BestForm>
            <div  style={{position:"absolute",minHeight:"100rem",minWidth:"60rem",left:"25rem",top:"-0.5rem"}}>
            <h3>List of Items :{list.length}</h3>
                <table className="table">
                    <tbody>
                        {
                            list && [...Array(Math.ceil(list.length/4))].map((element,index)=>
                            <tr key={index}>
                                <td  style={{border:"none"}}>{imageCard(list[4*index])}</td>
                                <td  style={{border:"none"}}>{list[4*index+1]?imageCard(list[4*index+1]):null}</td>
                                <td  style={{border:"none"}}>{list[4*index+2]?imageCard(list[4*index+2]):null}</td>
                                <td  style={{border:"none"}}>{list[4*index+3]?imageCard(list[4*index+3]):null}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default BestContainer
