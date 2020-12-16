import React ,{useState,useEffect} from 'react'
import '../StyleCss/BackEndHomeStyle.scss'

const defaultImageSrc = "/image/Biryani.jpg"
const initialvalues={
    id:"0",
    name:"",
    image:"",
    price:0,
    section:"",
    imageSrc:defaultImageSrc,
    imageFile:null

}
const RotiNaanForm = (props) => {
    const {addOrEdit,recordForEdit} = props
    const [values,setValues] = useState(initialvalues)
    useEffect(()=>{
        if(recordForEdit!=null)
        {
            setValues(recordForEdit)
        }
    },[recordForEdit])
    const handleInput = (e)=>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }
    const showPreview = (e)=>{
        if(e.target.files && e.target.files[0])
        {
            let imageFile = e.target.files[0];
            const reader = new FileReader()
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
    const handleSubmit =(e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("id",values.id)
        formData.append("name",values.name)
        formData.append("price",values.price)
        formData.append("image",values.image)
        formData.append("section",values.section)
        formData.append("imageFile",values.imageFile)
        addOrEdit(formData,resetForm)
    }
    const resetForm = ()=>{
        setValues(initialvalues)
        document.getElementById("image-uploader").value=null
    }
    return (
        <>
            <h2>Roti & Naan Form</h2>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <div className="card">
                    <img src={values.imageSrc} className="card-img-top"></img>
                    <div className="card-body">
                        <div className="form-group">
                            {/* <label>Upload Image</label> */}
                            <input type="file" accept="image/*" name="image" className="form-control-file" onChange={showPreview} id="image-uploader"></input>
                        </div>
                        <div className="form-group">
                            <label>Item Name</label>
                            <input type="text" name="name" className="form-control" placeholder="Item Name" onChange={handleInput} value={values.name}></input>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="text" name="price" className="form-control" placeholder="Price" onChange={handleInput} value={values.price}></input>
                        </div>
                        <div className="form-group">
                            <label>Section</label>
                            <select className="form-control" value={values.section} name="section" onChange={handleInput}>
                                <option value="All">Select</option>
                                <option value="Veg">Vegetarian</option>
                                <option value="Non-Veg">Non-Vegetarian</option>
                            </select>
                            {/* <input type="text" name="section" className="form-control" placeholder="Veg or Non-Veg" onChange={handleInput} value={values.section}></input> */}
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-success" style={{width:"15rem"}}>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default RotiNaanForm
