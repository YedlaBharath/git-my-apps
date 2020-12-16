import React, { PureComponent } from 'react'
import {MainContextConsumer} from './MainContext'
import ReactToPrint from 'react-to-print-advanced'

class PrintOrderForm extends PureComponent {
    render() {
        return (
            <>
            
            <MainContextConsumer>
                {
                    value=>{
                        return value.cart.map((e,index)=>(
                            <div key={e.id}>
                            <div className="main-section-item-main-card">
                            <img src={e.imageSrc} className="main-section-item-main-card-img"></img>
                            <div className="main-section-item-main-card-body">
                                <h2 className="cart-name">{e.name}</h2>
                                <h4 className="cart-price">Price: {e.price}{` Rs/-`}</h4>
                                <h2 className="cart-tot">Total: {e.total}</h2>
                            </div>
                                <button className="btn btn-dec"><i className="fa fa-minus"></i></button>
                                <h2 className="cart-quantity">{e.count}</h2>
                                <button className="btn btn-inc"><i className="fa fa-plus"></i></button>
                                <button className="main-section-item-main-btn btn">
                                    Remove
                                </button>
                        </div>
                        </div>
                        ))
                    }
                }
            </MainContextConsumer>
            </>
        )
    }
}
class Example extends React.Component {
  render() {
    return (
      <div>
        <div style={{display:"none"}}>
        <PrintOrderForm ref={(el) => (this.componentRef = el)} />
        </div>
        <ReactToPrint
        content={() => this.componentRef}
          trigger={() => <a href="#">Print It</a>}
          
        />
      </div>
    );
  }
}

export default Example;
