import React,{useState} from 'react'
import '../StyleCss/ItemContainer.scss'

const ClickCard = ({props}) => {
console.log(props)
    if(props%2===0){
            document.getElementById('style-0').style.display="block"
        }
        else{
            document.getElementById(`style-0`).style.display="none"
        }
    return (
        <div>
            <div className="style" id="style-0">
                <h2>dbsjvn</h2>
            </div>
        </div>
    )
}

export default ClickCard
