import React,{useState,useEffect} from 'react'
import SignupForm from './SignupForm'
import api from '../actions/api'

const SignupContainer = () => {
    const [list,setList]=useState([{}])
    const [recordForEdit, setRecordForEdit]=useState(null)
    const addOrEdit = (data,onSuccess)=>{
        api.usersignUPAPI().create(data).then(res=>{
            onSuccess();
            fetchList();
        })
        .catch(err => console.log(err))
    }
    const fetchList=()=>{
        api.usersignUPAPI().fetchAll().then(res=>setList(res.data))
        .catch(err=>console.log(err))
    }
    
    useEffect(()=>{
        fetchList()
    },[])
    const handleEdit=(data)=>{
        // setRecordForEdit(data)
    }
    const handleDelete=(event,id)=>{
        event.stopPropagation();
        if(window.confirm("Are you sure to Delete ?"))
        {
            api.usersignupAPI().delete(id).then(res=>fetchList()).catch(err=>console.log(err))
        }
    }
    return (
        <div>
            {
                // console.log(list)
            }
            <SignupForm addOrEdit={addOrEdit} recordForEdit={recordForEdit}></SignupForm>
            {/* <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>mobile</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list && list.map((e,index)=>(
                            <tr key={index}>
                                <td>{e.id}</td>
                                <td>{e.userName}</td>
                                <td>{e.email}</td>
                                <td>{e.mobile}</td>
                                <td>{e.address}</td>
                                <td><button onClick={()=>handleEdit(e)}>Edit</button></td>
                                <td><button  onClick={(event)=>handleDelete(event,parseInt(e.id))}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> */}
        </div>
    )
}

export default SignupContainer
