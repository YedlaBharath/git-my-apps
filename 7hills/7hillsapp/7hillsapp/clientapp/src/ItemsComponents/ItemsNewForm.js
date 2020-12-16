import React, { useState, useEffect} from 'react'
import axios from 'axios'

const defaultImageSrc = "/image/Biryani.jpg"

const initialvalues={
    itemId:0,
    itemName:"",
    price:0,
    itemImage:"",
    imageFile:null,
    imageSrc:defaultImageSrc
}

export default function ItemsNewForm(props) {
    
    const {addOrEdit, recordForEdit} = props
    const [ values, setValues] = useState(initialvalues)
    const [ errors, setErrors] = useState({})

    useEffect(()=>{
        if(recordForEdit!=null){
        setValues(recordForEdit);
        }
    },[recordForEdit])

    const handleInput = (e)=>{
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value
        })

    }

    const showPreview = (e)=>{
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload=(x)=>{
                setValues({
                    ...values,
                    imageFile,
                    imageSrc:x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else{
            setValues({
                ...values,
                imageFile:null,
                imageSrc:defaultImageSrc
            })
        }

    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // console.log(values)
        // if(validate()){
            const formData = new FormData()
            formData.append("itemId", values.itemId)
            formData.append("itemName", values.itemName)
            formData.append("price",values.price)
            formData.append("itemImage",values.itemImage)
            formData.append("imageFile",values.imageFile)
            addOrEdit(formData,resetForm)
        // }
    }
    const validate = ()=>{
        let temp = {}
        temp.itemName = values.itemName===""?false:true
        temp.price = values.price===0?false:true
        temp.imageSrc = values.imageSrc===defaultImageSrc?false:true
        setErrors(temp)
        return Object.values(temp).every(x=>x===true)
    }
    const applyErrorClass = field =>((field in errors && errors[field]===false)?" invalid-field":"")

    const resetForm = ()=>{
        setValues(initialvalues)
        document.getElementById("image-uploader").value=null
        setErrors({})
    }
    return (
        <React.Fragment>
        {/* <div className="text-center">
            <h3>Items Forms</h3>
        </div> */}
        <div style={{position:"relative"}}>
        <form autoComplete='off' noValidate onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="card">
                    <img src={values.imageSrc} className="card-img-top"></img>
                <div className="card-body">
                    <div className="form-group">
                        <label>Upload Image</label>
                        <input type="file" accept="image/*" name="imageFile" className={"form-control-file"+applyErrorClass('imageSrc')} onChange={showPreview} id="image-uploader"></input>
                    </div>
                    <div className="form-group">
                        <label>Item Name</label>
                        <input type="text" name="itemName" className={"form-control" + applyErrorClass('itemName')} placeholder="Item Name" onChange={handleInput} value={values.itemName}></input>
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="text" name="price" className={"form-control"+ applyErrorClass('price')} placeholder="Item Price" onChange={handleInput} value={values.price}></input>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-success" style={{width:"15rem"}}>Submit</button>
                    </div>
                </div>
            </div>
        </form>
        </div>
        </React.Fragment>
    )
}
