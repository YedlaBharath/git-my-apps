// import React, {useState} from 'react'

// const  ItemFormOperations=(initialvalues,validate,setCurrentId) =>{
//     const [values, setValues] = useState(initialvalues)
//     const [errors,setErrors] = useState({})
//     const handleInputItemChange = (e)=> {
//         const {name, value} = e.target;
//         const fieldValue = {[name]:value};
//         console.log(...fieldValue)
//         setValues({
//         ...values,
//         ...fieldValue,
        
//     })
//     setErrors({})
//     setCurrentId(0)
//     validate(fieldValue);
//     }
    // const handleImage = (e)=>{
    //     if(e.target.files && e.target.files[0])
    //     {
    //         let imageFile = e.target.files[0];
    //         const reader = new FileReader();
    //         reader.onload = x =>{
    //             setValues({
    //                 ...values,
    //                 imageFile,
    //                 imageSrc:x.target.result
    //             })
    //             reader.readAsDataURL(imageFile)
    //         }
    //     }
    // }
//     return {
//         values,
//         setValues,
//         errors,
//         setErrors,
//         handleInputItemChange,
//         handleImage
//     }
// }

// export default ItemFormOperations
