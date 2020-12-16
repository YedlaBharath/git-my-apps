// import { Button, Grid, TextField, withStyles } from '@material-ui/core'
// import React,{useState,useEffect}from 'react'
// // import ItemFormOperations from './ItemFormOperations'
// import * as actions from '../actions/ItemActions'
// import {connect} from 'react-redux'

// const defaultImageSrc = "/image/Biryani.jpg"

// const initialvalues={
//     item_name:"",
//     price:"",
//     item_image:"",
//     imageSrc:defaultImageSrc,
//     imageFile:null
// };
// const styles = (theme)=>({
//    TextField:{
//     margin: theme.spacing(2),
//     width: 500,
//         },
//         smMargin: {
//     marginLeft: theme.spacing(3),
//   },
//     })

    
// const ItemsForm = ({classes, ...props}) => {
//     const [values,setValues] = useState(initialvalues)
//     const [errors,setErrors] = useState({})

//     const handleInputItemChange = (e)=> {
//         const {name, value} = e.target;
//         setValues({
//         ...values,
//         [name]:value
        
//     })
// }

//     const handleImage = (e)=>{
//         if(e.target.files && e.target.files[0])
//         {
//             let imageFile = e.target.files[0];
//             const reader = new FileReader();
//             reader.onload = x =>{
//                 setValues({
//                     ...values,
//                     imageFile,
//                     imageSrc:x.target.result
//                 })
                
//             }
//             reader.readAsDataURL(imageFile)
//         }
//         else{
//             setValues({
//                 imageFile:null,
//                 imageSrc:""
//             })
//         }
//     }
    
//     const validate = ()=>{
//         let temp={};
        
//             temp.item_name = values.item_name===""?false:true;
        
//             temp.price = values.price===""?false:true;
        
//             temp.imageSrc = values.imageSrc===defaultImageSrc?false:true;
        
//         setErrors(temp)
//         return Object.values(temp).every(x=>x===true)
//     }
//     const handleSubmitItem=(e)=>{
//         e.preventDefault();
//         if(validate())
//         {
//             const formData = new FormData();
//             formData.append('item_name',values.item_name)
//             formData.append('price',values.price)
//             formData.append('item_image',values.item_image)
//             formData.append('imageFile',values.imageFile)
//             // props.createItem();
//         }
        
//     }
//     const applyErrorClass = field =>((field in errors && errors[field]===false)?' invalid-field':'')
    
//     return (
//         <>
//             <form autoComplete="off" noValidate onSubmit={handleSubmitItem}>
//                 <div className="card">
//                     <img src={values.imageSrc} className="card-img-top"></img>
//                     <div className="card-body">
//                                     <div className="form-group">
//                                         <input type="file" accept="image/*" className={"form-control-file"+ applyErrorClass('imageSrc')} onChange={handleImage}></input>
//                                     </div>
//                     </div>
//                     <div className="form-group">
//                         <input
//                             className={"form-control"+applyErrorClass('item_name')}
//                             placeholder="Item Name"
//                             value={values.item_name}
//                             onChange={handleInputItemChange}
//                         ></input>
//                         </div>
//                     </div><div className="form-group">
//                         <input
//                             className={"form-control"+applyErrorClass('price')}
//                             placeholder="Price"
//                             value={values.price}
//                             onChange={handleInputItemChange}
//                             ></input>
//                         </div>
//                         {/* <div className="form-group">
//                             <input
//                                 className={"form-control"+applyErrorClass(item_image)}
//                                 name="item_image"
//                                 placeholder="Item Image"
//                                 value={values.item_image}
//                                 onChange={handleInputItemChange}
//                             ></input>
//                         </div> */}
//                     <div className="form-group text-center">
//                         <button
//                             type="submit"
//                             className="btn-lg"
//                             >Submit   
//                         </button>
//                     </div>
//             </form>
//         </>
//     )
// }
// const mapStateToProps = state => ({
//         ItemsList: state.ItemReducer.list,
// })
// const mapActionToProps = {
//     createItem: actions.createItem
// }

// export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(ItemsForm))
