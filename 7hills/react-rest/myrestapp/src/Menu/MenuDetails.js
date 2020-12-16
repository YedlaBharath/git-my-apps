import React,{useEffect,useState} from 'react'
import api from '../actions/api'
import '../StyleCss/MenuDetailsCss.scss'

const MenuDetails = () => {
    const [list,setList] = useState([{}])
    const fetchMenu = ()=>{
        api.menuAPI().fetchAll().then(res=>setList(res.data))
    }
    useEffect(() => {
        fetchMenu()
    },[])
    const imageCard= (data)=>(
    <div className="card" style={{height:"17rem", width:"10rem",zIndex:"1"}}>
        <img src={data.imageSrc} className="card-img-top" style={{height:"6rem", width:"100%"}}></img>
        <div className="card-body" style={{height:"100%", width:"100%"}}>
            <h5>{data.name}</h5>
            <button className="btn btn-light" >Edit<i className="fa fa-pencil" aria-hidden="true"></i></button>
            <button className="btn btn-light delete-button">
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    </div>
)
    return (
        <>
        {console.log(list)}
            <div>List of Items</div>
                <table className="table">
                    <tbody>
                        {
                            list && [...Array(Math.ceil(list.length/3))].map((element,index)=>
                            <tr key={index}>
                                <td  style={{border:"none"}}>{imageCard(list[3*index])}</td>
                                <td  style={{border:"none"}}>{list[3*index+1]?imageCard(list[3*index+1]):null}</td>
                                <td>{list[3*index+2]?imageCard(list[3*index+2]):null}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
        </>
    )
}

export default MenuDetails
