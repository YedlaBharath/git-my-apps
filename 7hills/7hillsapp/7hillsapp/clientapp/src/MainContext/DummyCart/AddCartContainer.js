import React from 'react'
import api from '../../actions/api'

const AddCartContainer = () => {
    const addOrEdit=(data)=>{
        api.addtocartAPI().create(data).then(res=>{
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    }
    return (
        <div>
            <AddCartContainer ></AddCartContainer>
        </div>
    )
}

export default AddCartContainer
