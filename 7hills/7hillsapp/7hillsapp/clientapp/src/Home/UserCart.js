import React from 'react'
import '../StyleCss/HomeStyle.scss'

const UserCart = () => {
    // const {a:{itemImage}}={a:props}
    return (
        <div>
            <h2>This is User Cart</h2>
            <div className="cart-first-div">
                <div className="cart-second-div">
                    <div className="cart-sub-div">
                        {/* <img src={itemImage}></img> */}
                    </div>
                    <i className="cart-total-div">

                    </i>
                </div>
            </div>
        </div>
    )
}

export default UserCart
