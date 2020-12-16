import React,{useState,useEffect} from 'react'
import api from '../actions/api'
import Footer from './Footer'
import '../StyleCss/HomeStyle.scss'

const Contacts = () => {
    const [ownerList,setOwnerList] = useState([])
    function fetchAllList(){
        api.ownersAPI().fetchAll().then(res=>{
            setOwnerList(res.data)
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        fetchAllList();
    },[])
    return (
        <>
        {console.log(ownerList)}
            <div className="contact-first-div">
                <h2>7 Hills Restaurant and Bar</h2>
                {
                    ownerList.map((e,index)=>
                    <div className="contact-sub-div" key={index}>
                        <div className="contact-image-div">
                            <img src={e.ownerImageSrc} className="owner-image-div"></img>
                        </div>
                        <h3 className="owner-name-div">{e.ownerName}</h3>
                        <div className="owner-email-div">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                            <h4 className="owner-email-h4">{e.ownerEmail}</h4>
                        </div>
                        <div className="social-media-div">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </div>
                    </div>
                    )
                }
            </div>
            <div className="developer-first-div">
                <h1> Developed By </h1>
                <div className="developer-second-div">
                    <div className="developer-image-div">
                        <img src="/image/defaultProfile.jpg" className="developer-image"></img>
                    </div>
                    <div className="developer-info">
                        <h2>Yedla Bharath Reddy</h2>
                        <h3>Web Developer</h3>
                        <h3>Higher Education : Master's Degree</h3>
                        <h4>Contact Details</h4>
                        <h4>Mobile:- +91 8885445442</h4>
                        <h4>Email:- bharathreddy1689@gmail.com</h4>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Contacts
