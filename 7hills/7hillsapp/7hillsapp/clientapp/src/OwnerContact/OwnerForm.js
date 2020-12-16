import React,{useState,useEffect} from 'react'
import '../StyleCss/OwnerStyleSheet.css'

const defaultImageSrc= "/image/defaultProfile.jpg"

const initialOwnervalues ={
    ownerId:0,
    ownerName:"",
    ownerUserName:"",
    ownerPassword:"",
    ownerEmail:"",
    ownerAdress:"",
    ownerImage:"",
    ownerImageFile:null,
    ownerImageSrc:defaultImageSrc
}
const initiallabelstylevalues={
    top: "",
    left: "",
    backgroundColor: "",
    fontWeight:"",
    opacity:"",
    border:"",
    transform:""
}

function OwnerForm(props) {

    const [values,setValues] = useState(initialOwnervalues)
    const [top,setTop] = useState(initiallabelstylevalues)
    const [topOne,setTopOne] = useState(initiallabelstylevalues)
    const [topTwo,setTopTwo] = useState(initiallabelstylevalues)
    const [topThree,setTopThree] = useState(initiallabelstylevalues)
    const [topFour,setTopFour] = useState(initiallabelstylevalues)
    const [errors,setErrors] = useState({})
    const {insertOrUpdate,recordForEdit} = props
    useEffect(()=>{
        if(recordForEdit!=null)
        {
            setValues(recordForEdit)
        }
    },[recordForEdit])
    const ShowPreview = (e)=>{
        if(e.target.files && e.target.files[0]){
            let ownerImageFile=e.target.files[0]
            const reader = new FileReader()
            reader.onload=(o)=>{
                setValues({
                    ...values,
                    ownerImageFile,
                    ownerImageSrc:o.target.result
                })
            }
            reader.readAsDataURL(ownerImageFile)
        }
        else{
            setValues({
                ...values,
                ownerImageFile:null,
                ownerImageSrc:defaultImageSrc,
            })
        }
    }
    const handleInputClick=(e)=>{
        const {name,value}= e.target
        setValues({
            ...values,
            [name]:value
        })
    }
    const handleInputChange=(e)=>{
            e.target.result=setTop({
            top: "-5rem",
            left: "2rem",
            backgroundColor: "white",
            fontWeight:"900",
            opacity:"1",
            border:"1px solid blue",
            transform:"scale(0.9)"
        })
    }
    const handleBlurClick=(e)=>{
        if(e.target.value===""){
        setTop(initiallabelstylevalues)
    }
    }
    
    const handleInputChangeOne= (e)=>{
            setTopOne({
            top: "-5rem",
            left: "2rem",
            backgroundColor: "white",
            fontWeight:"900",
            opacity:"1",
            border:"1px solid blue",
            transform:"scale(0.9)"
        })
    }
    const handleBlurClickOne=(e)=>{
        if(e.target.value===""){
        setTopOne(initiallabelstylevalues)
    }
    }

    const handleInputChangeTwo= (e)=>{
            setTopTwo({
            top: "-5rem",
            left: "2rem",
            backgroundColor: "white",
            fontWeight:"900",
            opacity:"1",
            border:"1px solid blue",
            transform:"scale(0.9)"
        })
    }
    const handleBlurClickTwo=(e)=>{
        if(e.target.value===""){
        setTopTwo(initiallabelstylevalues)
    }
    }

    const handleInputChangeThree= (e)=>{
            setTopThree({
            top: "-5rem",
            left: "2rem",
            backgroundColor: "white",
            fontWeight:"900",
            opacity:"1",
            border:"1px solid blue",
            transform:"scale(0.9)"
        })
    }
    const handleBlurClickThree=(e)=>{
        if(e.target.value===""){
        setTopThree(initiallabelstylevalues)
    }
    }

    const handleInputChangeFour= (e)=>{
            setTopFour({
            top: "-6rem",
            left: "2rem",
            backgroundColor: "white",
            fontWeight:"900",
            opacity:"1",
            border:"1px solid blue",
            transform:"scale(0.9)"
        })
        
    }
    const handleBlurClickFour=(e)=>{
        if(e.target.value===""){
        setTopFour(initiallabelstylevalues)
    }
    }
    const validate=(fieldValues = values)=>{
        let tempErrors={...errors};
        if("ownerName" in fieldValues){
            tempErrors.ownerName = fieldValues.ownerName ?"":"This Field is Required"
        }
        setErrors({
            ...tempErrors
        })
        if(fieldValues === values)
        {
            return Object.values(tempErrors).every((x)=>x==="")
        }
        
        // tempErrors.ownerUserName=fieldValues.ownerUserName===""?"This Field is Required"
    }
    const handelOwnerFormSubmit = (e)=>{
        e.preventDefault()
        console.log(values);
        // if(validate())
        // {
            const formdata = new FormData();
            formdata.append("ownerId",values.ownerId)
            formdata.append("ownerName",values.ownerName)
            formdata.append("ownerUserName",values.ownerUserName)
            formdata.append("ownerPassword",values.ownerPassword)
            formdata.append("ownerEmail",values.ownerEmail)
            formdata.append("ownerAdress",values.ownerAdress)
            formdata.append("ownerImage",values.ownerImage)
            formdata.append("ownerImageFile",values.ownerImageFile)
            insertOrUpdate(formdata,resetForm)
        // }
    }
    const resetForm=()=>{
        setValues(initialOwnervalues)
    }
    return (
        <React.Fragment>
            <div className="">
                <div className="">
                    <form autoComplete="off" noValidate onSubmit={handelOwnerFormSubmit}>
                        <div className="card">
                            <img className="card-img-top" src={values.ownerImageSrc} style={{height:"15rem"}}></img>
                            <div className="card-body">
                                <div className="form-group">
                                    <input type="file" className="form-control-file" accept="image/*" name="ownerImage" onChange={ShowPreview} ></input>
                                </div>
                            
                            <div className="form-group">
                                <input className="form-control input-control" type="text" name="ownerName" value={values.ownerName}
                                onClick={handleInputChange} onChange={handleInputClick} onBlur={handleBlurClick} 
                                ></input>
                                <label className="labeling-control" style={{top:top.top,left:top.left,backgroundColor:top.backgroundColor,
                                fontWeight: top.fontWeight,opacity: 1,transform:top.transform ,border: top.border,}}>Owner Name</label>
                            </div>
                            <div className="form-group">
                                <input className="form-control input-control" type="text" name="ownerUserName" value={values.owneruserName}
                                onClick={handleInputChangeOne} onChange={handleInputClick} onBlur={handleBlurClickOne} 
                                ></input>
                                <label className="labeling-control" style={{top:topOne.top,left:topOne.left,backgroundColor:topOne.backgroundColor,
                                fontWeight: topOne.fontWeight,opacity: 1,transform:topOne.transform ,border: topOne.border,}}>Owner UserName</label>
                            </div>
                            <div className="form-group">
                                <input className="form-control input-control" type="text" name="ownerPassword" value={values.ownerPassword}
                                onChange={handleInputClick} onClick={handleInputChangeTwo} onBlur={handleBlurClickTwo}
                                ></input>
                                <label className="labeling-control" style={{top:topTwo.top,left:topTwo.left,backgroundColor:topTwo.backgroundColor,
                                fontWeight: topTwo.fontWeight,opacity: 1,transform:topTwo.transform ,border: topTwo.border,}}>Owner Password</label>
                            </div>
                            <div className="form-group">
                                <input className="form-control input-control" type="text" name="ownerEmail" value={values.ownerEmail}
                                onChange={handleInputClick} onClick={handleInputChangeThree} onBlur={handleBlurClickThree}
                                ></input>
                                <label className="labeling-control" style={{
                                    top:topThree.top,left:topThree.left,backgroundColor:topThree.backgroundColor,
                                    fontWeight: topThree.fontWeight,opacity: 1,transform:topThree.transform ,border: topThree.border,
                                    }}
                                    >Owner Email</label>
                            </div>
                            <div className="form-group">
                                <textarea className="form-control input-control" type="text" name="ownerAdress" value={values.ownerAdress}
                                onClick={handleInputChangeFour} onChange={handleInputClick} onBlur={handleBlurClickFour}
                                ></textarea>
                                <label className="labeling-control" style={{
                                    top:topFour.top,left:topFour.left,backgroundColor:topFour.backgroundColor,
                                    fontWeight: topFour.fontWeight,opacity: 1,transform:topFour.transform ,border: topFour.border,
                                    }}
                                    >Owner Adress</label>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success" style={{width:"15rem"}}> Save</button>
                            </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            
        </React.Fragment>
    )
}

export default OwnerForm
