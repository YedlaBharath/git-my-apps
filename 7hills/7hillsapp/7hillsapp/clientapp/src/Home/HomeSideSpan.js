import React,{useState,useEffect} from 'react'
import '../StyleCss/HomeStyle.scss'
import {Link} from 'react-router-dom'
import AllProducts from '../MainContext/AllProducts/AllProducts'

const veg = "Veg"
const Non = "Non-Veg"
const HomeSideSpan = () => {
    const [i,stI]=useState(0)
    const [clr0,setClr0]=useState("")
    const [bgColor0,setBgcolor0]=useState("")
    const [clr1,setClr1]=useState("")
    const [bgColor1,setBgcolor1]=useState("")
    const [clr2,setClr2]=useState("")
    const [bgColor2,setBgcolor2]=useState("")
    const [clr3,setClr3]=useState("")
    const [bgColor3,setBgcolor3]=useState("")
    useEffect(()=>{
        setBgcolor0("rgb(204, 76, 26)");
        setClr0("white");
    },[])
    const handelClick=(e)=>{
        e.stopPropagation()
        const name=e.target.className
        if(name==="item-name")
        {
            setBgcolor0("rgb(204, 76, 26)");
            setClr0("white");
            setBgcolor1("");
            setClr1("");
            setBgcolor2("");
            setClr2("");
            setBgcolor3("");
            setClr3("");
            
        }
        if(name==="item-name-1")
        {
            setBgcolor0("")
            setClr0("")
            setBgcolor1("rgb(204, 76, 26)")
            setClr1("white")
            setBgcolor2("")
            setClr2("")
            setBgcolor3("")
            setClr3("");
        }
        if(name==="item-name-2")
        {
            setBgcolor0("")
            setClr0("")
            setBgcolor1("")
            setClr1("")
            setBgcolor2("rgb(204, 76, 26)")
            setClr2("white")
            setBgcolor3("")
            setClr3("")
        }
        if(name==="item-name-3")
        {
            setBgcolor0("")
            setClr0("")
            setBgcolor1("")
            setClr1("")
            setBgcolor2("")
            setClr2("")
            setBgcolor3("rgb(204, 76, 26)")
            setClr3("white")
        }
            
            // console.log(name)
    }
    return (
        <>
        <div className="side-span">
            {/* <div className="side-span-items" style={{backgroundColor:bgColor0}} name="zero" onClick={handelClick}>
                <div className="item-pic"style={{color:bgColor0,backgroundColor:clr0}} ><i className="fa fa-fire" aria-hidden="true"></i></div>
                <div className="item-name" ><label style={{color:clr0}}>TopPicks</label><div className="item-options" style={{color:clr0}}>options</div></div>
            </div> */}
            <Link to="./BestOfSevenHills" style={{color:"black",textDecoration:"none"}}>
            <div className="side-span-items-1" style={{backgroundColor:bgColor1}} id="1" onClick={handelClick}>
                <div className="item-pic-1" style={{color:bgColor1,backgroundColor:clr1}}><i className="fa fa-trophy" aria-hidden="true"></i></div>
                <div className="item-name-1"><label style={{color:clr1}}>Best of 7 Hills</label><div className="item-options-1" style={{color:clr1}}>options</div></div>
            </div>
            </Link>
            <Link to={`./AllProducts${veg}`} style={{color:"black",textDecoration:"none"}}>
            <div className="side-span-items-2" style={{backgroundColor:bgColor2}} onClick={handelClick}>
                <div className="item-pic-2" style={{color:bgColor2,backgroundColor:clr2}}><i className="fa fa-leaf" aria-hidden="true"></i></div>
                <div className="item-name-2" ><label style={{color:clr2}}>Vegitarian</label><div className="item-options-2" style={{color:clr2}}>options</div></div>
            </div>
            </Link>
            <Link to={`./AllProducts${Non}`} style={{color:"black",textDecoration:"none"}}>
            <div className="side-span-items-3" style={{backgroundColor:bgColor3}} onClick={handelClick}>
                <div className="item-pic-3" style={{color:bgColor3,backgroundColor:clr3}}><i className="fa fa-cutlery" aria-hidden="true"></i></div>
                <div className="item-name-3"><label style={{color:clr3}}>Non Vegitarian</label><div className="item-options-3" style={{color:clr3}}>options</div></div>
            </div>
            </Link>
        </div>
        </>
    )
}

export default HomeSideSpan
