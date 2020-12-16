import React,{useState,useEffect,useMemo} from 'react'
import Mock from './Mock.json'
import '../StyleCss/HomeMainSpanCss.scss'
import UserCart from './UserCart'
import {Link} from 'react-router-dom'

const PAGE_ITEMS = "Page_Items"
const PAGE_CART = "Page_Cart"
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");

const HomeMainSpan = () => {
    const [search,setSearch]= useState("")
    const [list,setList]=useState([{}])
    const [cart,setCart] = useState([])
    // const [getCart,setGetCart] = useState([{}])
    const [buttonsDOM,setButtonsDOM] =useState([])
    const [buttons,setButtons] =useState([])
    const [page,setPage] = useState("Page_Items")
    const [quantity,setQuantity] = useState(1)
    const [tempTotal,setTempTotal] = useState(0)
    const [itemsTotal,setItemTotal] = useState(0)
    function fetchList(){
        setList(Mock)
    }
    useEffect(()=>{
        fetchList();
        getBagButtons();
    },[])
    const addToCart= (e,data)=>{
        let id= data.id
        let inCart = cart.find((item)=>item.id === id);
        if(inCart)
        {
            e.target.innerText="In Cart"
            e.target.disabled=true
        }
        if(!inCart)
        {
            let cartItem = {...data,amount:1}
            setCart([...cart,{...cartItem}])
        }
            setCartValues(cart)
            SaveCart()
    }
    const SaveCart= ()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    }
    // const GetCart=()=>{
    //     return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[]
    // }
    // setGetCart()
    // const cartGet = useMemo(()=> JSON.parse(localStorage.getItem("cart")))
    // console.log(cartGet)
    const handleSearch=(e)=>{
        setSearch(e.target.value)
        console.log(search)
    }
    const renderItems = ()=>(
        <>
        <input type="search" icon="search" onChange={(e)=>handleSearch(e)}></input>
        <table className="table">
                    <tbody>
                        {
                            [...Array(Math.ceil(list.length/3))].map((element,index)=>
                            <tr key={index} className="home-main-table-row-div">
                                <td>{imageCard(list[3*index])}</td>
                                <td>{list[3*index+1]?imageCard(list[3*index+1]):null}</td>
                                <td>{list[3*index+2]?imageCard(list[3*index+2]):null}</td>
                            </tr>
                            )}
                            {}
                    </tbody>
                </table>
                </>
    )
    const increaseQuantity = (data)=>{
        let id = data;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount= tempItem.amount+1
        SaveCart()
        setCartValues(cart)
    }
    const setCartValues = (cart)=>{
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map((item)=>{
            setTempTotal(tempTotal += item.price* item.amount)
            setItemTotal(itemsTotal +=item.amount)
        })
        // console.log(tempTotal, itemsTotal);
        // document.querySelector(".cart-total").innerText= tempTotal
        // document.querySelector(".cart-total").innerText = itemsTotal;
    }
    const decreaseQuantity = (data)=>{
        let id = data;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount - 1;  
        if(tempItem.amount===0)
        {
            removeItem(id)
        }
        setCartValues(cart)
            SaveCart()
        
    }
    const RemoveFromCart = (item)=>{
        setCart(
            cart.filter(products=>products!==item)
        )
        setCartValues(cart)
    }
    // const renderCarts = ()=>{
    //     <UserCart></UserCart>
    // }
    const renderCart = ()=>(
        <>
        <div className="cart-items">{itemsTotal}</div>
        <table className="table">
            {console.log(cart)}
                    <tbody>
                        {
                            JSON.parse(localStorage.getItem("cart")).map((element,index)=>
                            <tr key={index} className="home-main-table-row-div">
                                <td>
                                    <img src={element.image}></img>
                                    <label>price :{element.price*element.amount}</label>
                                    <button onClick={()=>increaseQuantity(element.id)}>+</button>
                                    {element.amount}
                                    <button onClick={()=>decreaseQuantity(element.id)}>-</button>
                                    <button onClick={()=>RemoveFromCart(element)}>Remove</button>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>
                <div>
                        <h3>your total : <span className="cart-total">{tempTotal}</span>Rs/-</h3>
                        {/* <button onClick={()=>SaveCart()}>Proceed</button> */}
                        {/* <button class="clear-cart clear-btn" onClick={()=>clearCart()}>clear cart</button> */}
                </div>
                </>
    )
    // console.log(getCart)
    const clearCart = ()=>{
        let cartItem = cart.map((item)=>item.id);
        cartItem.forEach((id)=>removeItem(id))
    }
    const removeItem = (id)=>{
        cart.filter((item)=>item.id!=id)
        setCartValues(cart)
        setCart()
    }
    
    const navigateTo=(nextPage)=>{
        setPage(nextPage)
    }
    const imageCard= (data)=>{
        if(search !== "" && data.price.toString().toLowerCase().indexOf(search.toString().toLowerCase()) === -1)
        {
            return null
        }
        return(
    <div className="home-table-image-div">
        <img src={data.image} className="home-table-image"></img>
        <div className="home-table-cart-div">
            <button className="home-table-cart-btn btn btn-light" onClick={(e)=>addToCart(e,data)}>Add to Cart</button>
        </div>
    </div>
    )}
    // const buttonsDOM =[]
    // const buttons = []
    const getBagButtons=()=>{
        const buttons = [...document.querySelectorAll(".home-table-cart-btn")]; // this will turns the nodelist into arrays.
        console.log(buttons)
        const buttonsDOM = [...document.querySelectorAll(".home-table-cart-btn")]
        buttons.forEach((button) => {
                        let id = button.dataset.id;
                        let inCart = cart.find((item) => item.id === id);
                        if (inCart) {
                            button.innerText = "In Cart";
                            button.disabled = true;
                        }
                    })
    }
    const MainSpan=()=>{
        
    }
    return (
        <>
            <div className="home-main-table-first-div">
                {/* <button onClick={()=>navigateTo(PAGE_CART)}>Cart :{itemsTotal}</button>
                <button onClick={()=>navigateTo(PAGE_ITEMS)}>Items</button>
                {page===PAGE_ITEMS && renderItems()}
                {page===PAGE_CART && renderCart()} */}
                {MainSpan()}
            </div>
        </>
    )
}

export default HomeMainSpan
