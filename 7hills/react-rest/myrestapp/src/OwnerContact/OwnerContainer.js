import React,{useEffect,useState} from 'react'
import api from '../actions/api'
import OwnerForm from './OwnerForm'


function OwnerContainer() {
    const [ownerList,setOwnerList] = useState([{}])
    const [recordForEdit, setRecordForEdit] = useState(null)
    const insertOrUpdate=(formData,onSuccess)=>{
        if(formData.get('ownerId')==="0"){
            api.ownersAPI().create(formData).then(res=>{
            fetchAllList();
            onSuccess();
        }).catch(err => console.log(err))
        }
        else{
            api.ownersAPI().update(formData.get('ownerId'),formData).then(res=>{
                fetchAllList();
                onSuccess();
            })
        }
    }
    function fetchAllList(){
        api.ownersAPI().fetchAll().then(res=>{
            setOwnerList(res.data)
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        fetchAllList();
    },[])
    const showMenuDetails =(data)=>{
        setRecordForEdit(data);
    }
    const handleDelete = (e,id)=>{
        e.stopPropagation();
        if(window.confirm('Are You Sure to Delete ?'))
        {
            api.ownersAPI().delete(id).then(res=>fetchAllList()).catch(err=>console.log(err))
        }
    }
    const imageCard= (data)=>(
    <div className="card" style={{height:"19rem", width:"10rem",zIndex:"1"}}>
        <img src={data.ownerImageSrc} className="card-img-top" style={{height:"8rem", width:"100%"}}></img>
        <div className="card-body" style={{height:"100%", width:"100%", top:"-0.8rem"}}>
            <h4 style={{fontSize:"1rem"}}>{data.ownerName}</h4>
            <h4 style={{fontSize:"0.7rem"}}>{data.ownerEmail}</h4>
            <h4 style={{fontSize:"0.7rem"}}>{data.ownerUserName}</h4>
            <button className="btn btn-light" onClick={()=>{showMenuDetails(data)}} style={{margin:"0.5rem"}}>Edit<i className="fa fa-pencil" aria-hidden="true"></i></button>
            <button className="btn btn-light delete-button" onClick={(e)=>handleDelete(e,parseInt(data.ownerId))}>
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    </div>
    )
    return (
        <React.Fragment>
            <>
                    <OwnerForm insertOrUpdate={insertOrUpdate} recordForEdit={recordForEdit}></OwnerForm>
                <div  style={{position:"absolute",minHeight:"100rem",minWidth:"60rem",left:"25rem",top:"-0.5rem"}}>
                <h3>List of Items :{ownerList.length}</h3>
                    <table className="table">
                        <tbody>
                            {
                                ownerList && [...Array(Math.ceil(ownerList.length/4))].map((element,index)=>
                                <tr key={index}>
                                    <td  style={{border:"none"}}>{imageCard(ownerList[4*index])}</td>
                                    <td  style={{border:"none"}}>{ownerList[4*index+1]?imageCard(ownerList[4*index+1]):null}</td>
                                    <td  style={{border:"none"}}>{ownerList[4*index+2]?imageCard(ownerList[4*index+2]):null}</td>
                                    <td  style={{border:"none"}}>{ownerList[4*index+3]?imageCard(ownerList[4*index+3]):null}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </>
        </React.Fragment>
    )
}

export default OwnerContainer
