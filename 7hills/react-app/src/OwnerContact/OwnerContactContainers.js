import React ,{ useState,useEffect} from 'react'
import './OwnerContactCSS.css'
import api from '../actions/api.js'

function OwnerContactContainers() {
    const [ownerList,setOwnerList] = useState([])

    function fetchAllList(){
        api.ownersAPI().fetchAll().then(res=>{
            setOwnerList(res.data)
            // console.log(res.data)
            // console.log(ownerList)
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        fetchAllList()
    },[])
    return (
        <React.Fragment>
            <div className="main-contact">
                <div className="element-contact">
                    
                        {
                            [...Array(Math.ceil(ownerList.length))].map((e,index)=>
                            <div className="element-contact-img-container" key={index}>
                                <img src={ownerList[index].ownerImageSrc} alt="" className="contact-img"></img>
                                <h2 className="contact-name">{ownerList[index].ownerName}</h2>
                            </div>
                            )
                        }
                        
                    
                    {/* // <div className="element-contact-img-container">
                    //     <img src="" alt=""></img>
                    // </div>
                    // <div className="element-contact-img-container">
                    //     <img src="" alt=""></img>
                    // </div> */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default OwnerContactContainers
