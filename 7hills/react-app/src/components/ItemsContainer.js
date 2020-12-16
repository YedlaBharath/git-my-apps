import React, {useState, useEffect} from 'react'
import api from '../actions/api'
import ItemsNewForm from './ItemsNewForm'
import Data from '../CardSlideComponents/Data'
import  Card  from '../CardSlideComponents/Card'


export default function ItemsContainer(){

    const [list,setList] = useState([])
    const [recordForEdit,setRecordForEdit] = useState(null)
    // const initialvaluesss = {
    //     property:list.map(property=>({property}))}
    // const [property,setProperty] = useState([])
    // const property= [...Array(Math.ceil(list))].map((x)=>{x})
const properties=list.map((property,index)=> (property))
    

    
    const addOrEdit = (formData,onSuccess) =>{
            // axios.post("http://localhost:64823/api/DB7HillsInsertItems",formData, {
            //         headers: {'Content-Type': 'multipart/form-data'}
            // });
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
        // console.log(JSON.stringify(res.data));
        setList(res.data)
        
    }
    
    
    )
    .catch(err=>console.log(err))
}
useEffect(()=>{
    fetchList();
    // setProperty(list.map(property=>({property})))
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
// const Data =()=>{
//     [...Array(Math.ceil(list.length))].map((e,index)=>
//     console.log(list[index])
//     )
//     console.log(list[])
// }
const imageCard= (data)=>(
    <div className="card" onClick={()=>{showRecordDetails(data)}}>
        <img src={data.imageSrc} className="card-img-top"></img>
        <div className="card-body">
            <h5>{data.itemName}</h5>
            <span>{data.price} Rs/-</span>
            <button className="btn btn-light delete-button" onClick={(e)=>handleDelete(e,parseInt(data.itemId))}>
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    </div>
)

// console.log({property})

    return (
        <div className="row">
            <div className="col-md-4">
                <ItemsNewForm addOrEdit={addOrEdit} recordForEdit={recordForEdit}></ItemsNewForm>
                <Card id={list[0]}></Card>
                {
        console.log(properties)
    }
                {/* <Data></Data> */}
            </div>
            <div className="col=md-8">
                <div>List of Items</div>
                {/* <button onClick={handleNext}>Next</button> */}
                <table className="table">
                    <tbody>
                        {
                            [...Array(Math.ceil(list.length/3))].map((element,index)=>
                            <tr key={index}>
                                <td>{imageCard(list[3*index])}</td>
                                <td>{list[3*index+1]?imageCard(list[3*index+1]):null}</td>
                                <td>{list[3*index+2]?imageCard(list[3*index+2]):null}</td>
                                
                            </tr>
                            )
                        }
                    </tbody>
                    {/* <tr>
                        <th>Item Id</th>
                        <th>Item Name</th>
                        <th>Item price</th>
                        <th>Item Image</th>
                    </tr>
                    <tr>
                        fetchList.map()
                    </tr> */}
                </table>
            </div>
        </div>
    )
}
// const mapStateToProps = (state)=>({
//         ItemsList: state.ItemReducer.list,
// })

// const mapActionToProps = {
//     fetchItems: actions.fetchAllItem
// }

// export default connect(mapStateToProps,mapActionToProps)(ItemsContainer);

