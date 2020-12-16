import React from 'react'
import { VegSnacksContextConsumer} from '../context/VegSnacksContext/VegSnacksContext'

const VsProductList = () => {
    return (
        <VegSnacksContextConsumer>
            {
                value => {
                    return console.log(value)
                }
            }
        </VegSnacksContextConsumer>
    )
}

export default VsProductList
