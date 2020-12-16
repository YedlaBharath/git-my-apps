import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'
import {MainContextConsumer} from './MainContext'
import ReactToPrint,{ PrintContextConsumer } from 'react-to-print'
import MainCartItems from './MainCart/MainCartItems'
import Cart from './MainCart/Cart'

import Example from '../MainContext/PrintOrderForm'
// import {PrintOrderForm} from './PrintOrderForm'
import jspdf from 'jspdf'

export default class OrderDetails extends PureComponent {
    constructor(props) {
        super(props)
        this.componentRef= React.createRef();
        this.state = {
            
        }
    }
    
    
    jspfGenerator=()=>{
        var doc = new jspdf('p','pt');
        // const myFont = PrintOrderForm.js
        doc.text(250,170,`Order Id : ${this.props.item.orderId}`)
        doc.text(120,200,`Name : ${this.props.item.name}`)
        doc.text(400,200,`Price: ${this.props.item.price}`)
        // doc.addFileToVFS("PrintOrderForm.pdf",myFont)
        doc.save("generated.pdf")
    }
    render() {
            return (
            <MainContextConsumer>
                {
                    value=>{
                    const {imageSrc,orderId} = this.props.item
                    if(!value.showOrder)
                    {
                        return null;
                    }
                    else{
                    return(
                        <div className="modal-main-div">
                            {console.log(this.props.item.name)}
                            <div className="modal-sub-div">
                                    <h5>Your Order Details</h5>
                                    <i className="fa fa-times" onClick={()=>value.closeOrderDetails()} style={{position:"relative",   fontSize:"1.3rem",left: "-11rem",top: "0rem", cursor: "pointer"}}></i>
                                    
                                    <h5>Order Id : {orderId}</h5>
                                    {/* <img src={imageSrc} className="modal-img-div"></img> */}
                                    {
                                        value.orderDetails.map((e,index)=>(
                                            <div key={e.id}>
                                                <h2 style={{fontSize: "1.4rem",fontWeight:"400",letterSpacing:"0.1rem"}}>{e.name}</h2>
                                            </div>
                                        ))
                                    }
                                    <h2>Total : {value.cartTotal}</h2>
                                    <Link to='/'>
                                    <button onClick={()=>value.closeOrderDetails()} className="btn" style={{color:"blue",backgroundColor:"orange",margin:"1rem"}}>Continue to Shop</button>
                                    </Link>
                                    
                                    <div>
                                        
                <Example></Example>
                                        {/* <button onClick={this.jspfGenerator()}>Generate PDF</button> */}
                                        {/* <ReactToPrint content={() => this.componentRef}>
                                            <PrintContextConsumer>
                                                {({ handlePrint }) => (
                                                <button onClick={handlePrint}>Print this out!</button>
                                                )}
                                            </PrintContextConsumer>
                                            <div style={{ display: "none" }}>
                                                {
                                                    value.orderDetails.map((item,index)=>{
                                                            return <PrintOrderForm ref={el => (this.componentRef = el)} key={item.id} item={item}/>
                                                    })
                                                }
                                            </div>
                                        </ReactToPrint> */}
                                        <div>
                                                {/* {
                                                    value.orderDetails.map((item,index)=>{
                                                            return  */}
                                                            {/* <PrintOrderForm/> */}
                                                    {/* })
                                                } */}
                                            </div>
                                    </div>
                                    {/* <Link to='/Cart'>
                                    <button onClick={()=>closeProductsDetail()} className="btn" style={{color:"orange",backgroundColor:"green"}}>Go To Cart</button>
                                    </Link> */}
                                </div>
                                
                            </div>
                            )
                        }
                    }
                }
            </MainContextConsumer>   
        )
    }   
}
