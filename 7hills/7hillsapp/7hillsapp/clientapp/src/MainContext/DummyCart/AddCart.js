import React, { Component } from 'react'
import api from '../../actions/api'

const initialvalues = {
    id:0,
    name:"",
    image:"",
    section:"",
    price:""
}

export default class AddCart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            list:[initialvalues]
        }
    }
    componentDidMount(){
        this.setState({list:this.props.item})
    }
    addToCart=(e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append("id",this.state.list.id)
        formData.append("name",this.state.list.name)
        formData.append("image",this.state.list.image)
        formData.append("section",this.state.list.section)
        formData.append("price",this.state.list.price)
        this.addOrEdit(formData)
    }
    addOrEdit=(data)=>{
        api.addtocartAPI().create(data).then(res=>{
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    }
    render() {
        return (
            <div>
                <button onClick={(e)=>this.addToCart(e)}>Add To Cart</button>
                {console.log(this.state.list.id)}
            </div>
        )
    }
}

