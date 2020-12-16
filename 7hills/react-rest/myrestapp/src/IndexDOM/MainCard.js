import React from 'react'
import '../StyleCss/ItemContainer.scss'
import {Link} from 'react-router-dom'

const MainCard = ({props,i}) => {
    const {a:{name,imageSrc,id}}={a:props}
    return (
        <div>
            <div className={`element-course-container-${i} container-card`}>
                <Link to={`./MainSection${id}`}>
                <div className="element-img-course-container">
                    <img src={imageSrc} className="img-container"></img>
                    <h2 id={`image-${name}`}>
                        <label className="img-name" style={{fontSize:"1.6rem"}}>{name}</label>
                    </h2>
                </div> 
                </Link>
            </div>
        </div>
    )
}
export default MainCard
