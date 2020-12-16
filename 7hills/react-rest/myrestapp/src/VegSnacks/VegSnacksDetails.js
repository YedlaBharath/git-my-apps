import React ,{useEffect,useState} from 'react'
import api from '../actions/api'
import '../StyleCss/MainSectionStyle.scss'
import ItemsCart from '../ItemsCart/ItemsCart'

const VegSnacksDetails = () => {
    const [list,setList] = useState([{}])
    const [cart,setCart] = useState([])
    const [tempTotal,setTempTotal] = useState(0)
    const [itemsTotal,setItemTotal] = useState(0)
    useEffect(()=>{
        fetchList()
    })
    const fetchList =()=>{
        api.vegsnacksAPI().fetchAll().then(res=>setList(res.data)).catch(err => console.log(err))
    }
    const addToCart= (e,data)=>{
        let id= data.id
        let inCart = cart.find((item)=>item.id === id);
        if(inCart)
        {
            e.target.innerText="In Cart"
            e.target.disabled=true
        }
        if(!inCart){
            let cartItem = {...data,amount:1}
            setCart([...cart,{...cartItem}])
        }
            setCartValues()
            SaveCart()
    }
    const setCartValues = ()=>{
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map((item)=>{
            setTempTotal(tempTotal += item.price* item.amount)
            setItemTotal(itemsTotal +=item.amount)
        })
    }
    const SaveCart= ()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    const getCart = ()=>{
        const Incart = JSON.parse(localStorage.getItem("cart"))
        // console.log(Incart)
    } 
    const increaseQuantity = (data)=>{
        let id = data;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount= tempItem.amount+1
        SaveCart()
        setCartValues()
    }
    const decreaseQuantity = (data)=>{
        let id = data;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;  
        if(tempItem.amount===0)
        {
            // removeItem(id)
        }
        setCartValues()
            SaveCart()
        
    }
    const removeItem = (data)=>{
        let id= data.id
        cart.filter((item)=>item.id!=id)
        
            setCart([...cart])
        
        setCartValues()
        setCart()
    }
    const imageCard= (data)=>(
    <div className="main-section-item-main-card">
        <img src={data.imageSrc} className="main-section-item-main-card-img"></img>
        <div className="main-section-item-main-card-body">
            <h2>{data.name}</h2>
            <h4>{data.price}{` Rs/-`}</h4>
            <h4>{data.section}</h4>
            <button className="main-section-item-main-card-btn btn" onClick={(e)=>addToCart(e,data)}>ADD</button>
        </div>
    </div>
    )
    return (
        <>
        <h2>7 Hills Veg Snacks</h2>
            <div className="main-section-item-main-div">
            {/* <h3>List of Items :{list.length}</h3> */}
                <table className="table">
                    <tbody>
                        {
                            list && [...Array(Math.ceil(list.length))].map((element,index)=>
                            <tr key={index}>
                                <td  style={{border:"none"}}>{imageCard(list[index])}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="main-section-incart-items-main-div">
                <div className="item-cart-main-div">
                    <h2>Your Cart Items</h2>
                    <div className="cart-items">{itemsTotal}</div>
                        {/* {console.log(cart)} */}
                        {
                            cart && cart.map((element,index)=>
                            <div key={index} className="cart-main-div">
                                    
                                    <img src={element.imageSrc} className="cart-img-div"></img>
                                    <h3>{element.name}</h3>
                                    <h4>Price: {`${element.price*element.amount} Rs/-`}</h4>
                                    <button onClick={()=>increaseQuantity(element.id)} className="btn btnPlus"><i className="fa fa-plus"></i></button>
                                    <label>{element.amount}</label>
                                    <button onClick={()=>decreaseQuantity(element.id)} className="btn btnMinus"><i className="fa fa-minus"></i></button>
                                    <button className="btn btnDelete" onClick={()=>{removeItem(element)}}>Delete</button>
                                    {/* <button onClick={()=>RemoveFromCart(element)}>Remove</button> */}
                            </div>
                            )}
                    <div>
                            <h3>your total : <span className="cart-total">{tempTotal}</span>Rs/-</h3>
                    </div>
                    <button className="btn btnProceed">Continue</button>
                </div>
            </div>
        </>
    )
}

export default VegSnacksDetails
