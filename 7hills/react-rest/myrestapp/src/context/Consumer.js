import React from 'react'
import {ProductConsumer} from './MockContext'
import ProductList from './ProductList'

const Consumer = () => {
    return (
        <div>
            {/* <ProductConsumer>
                {(value)=>{
                    return value.products.map(product=>{
                        return <ProductList key={product.id} product={product}></ProductList>
                    })
                }}
            </ProductConsumer> */}
        </div>
    )
}

export default Consumer
