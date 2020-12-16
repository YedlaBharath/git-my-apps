import React ,{ useState,useEffect} from 'react'
import '../StyleCss/OwnerContactCSS.css'
import api from '../actions/api.js'
import IndexDOM from '../IndexDOM/IndexDOM'
import OwnerContainer from './OwnerContainer'

function OwnerContactContainers() {
    const [ownerList,setOwnerList] = useState([])

    function fetchAllList(){
        api.ownersAPI().fetchAll().then(res=>{
            setOwnerList(res.data)
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
                </div>
            </div>
            <IndexDOM></IndexDOM>
            <OwnerContainer></OwnerContainer>
        </React.Fragment>
    )
}

export default OwnerContactContainers
