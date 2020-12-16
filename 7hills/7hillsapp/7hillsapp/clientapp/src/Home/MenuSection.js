import React from 'react'
import '../StyleCss/BackEndHomeStyle.scss'
import MenuContainer from '../Menu/MenuContainer'

const MenuSection = () => {
    return (
        <>
        <div className="vegsnacks-form-main-div">
            <h2>Menu Section</h2>
                <div className="vegsnacks-form-sub-div">
                    <div className="vegsnacks-from-div">
                        <MenuContainer></MenuContainer>
                    </div>
                </div>
                {/* <span className="menu-form-subsecond-div">
                    <MenuDetails></MenuDetails>
                </span> */}
        </div>
        </>
    )
}

export default MenuSection
