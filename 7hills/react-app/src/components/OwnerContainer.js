import React,{useEffect,useState} from 'react'
import api from '../actions/api'
// import OwnerContactContainer from './OwnerContact/OwnerContactContainer'
import OwnerForm from './OwnerForm'


// const initialOwnerList = {
//     ownerList:[]
// }

function OwnerContainer() {
    const [ownerList,setOwnerList] = useState([])
    const insertOrUpdate=(formdata,onSuccess)=>{
        api.ownersAPI().create(formdata).then(res=>{
            // console.log(res.data);
            fetchAllList();
            onSuccess();
        })
        .catch(err=>console.log(err))
    }
    function fetchAllList(){
        api.ownersAPI().fetchAll().then(res=>{
            setOwnerList(res.data)
            // console.log(res.data)
            console.log(ownerList)
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        fetchAllList();
    },[])
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-4">
                    <OwnerForm insertOrUpdate={insertOrUpdate}></OwnerForm>
                </div>
                <div className="col-md-8">
                    <h2>List of Owners</h2>
                    <table>
                        <tbody>
                            {
                                // [ownerList].map((e,index)=>
                                // <tr key={index}>
                                //     <td>{ownerList[index].ownerName}</td>
                                // </tr>
                                // )
                                [...Array(Math.ceil(ownerList.length))].map((e,index)=>
                                        <tr key={index}>
                                            <td>{ownerList[index].ownerName}:</td>
                                            <td>{ownerList[index].ownerUserName}:</td>
                                            <td>{ownerList[index].ownerPassword}:</td>
                                            <td>{ownerList[index].ownerEmail}:</td>
                                            <td>{ownerList[index].ownerAdress}:</td>
                                            <td>{ownerList[index].ownerId}:</td>
                                            <td><img src={ownerList[index].ownerImageSrc}></img></td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                {/* <OwnerContactContainer></OwnerContactContainer> */}
            </div>
        </React.Fragment>
    )
}

export default OwnerContainer
