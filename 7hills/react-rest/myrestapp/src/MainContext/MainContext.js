import React, { Component } from 'react'
import api from '../actions/api'
import axios from 'axios'
import '../StyleCss/HomeStyle.scss'
import {Link} from 'react-router-dom'
import AddCartList from './DummyCart/AddCartList'

const AllContext = React.createContext()
const initialvalues = {
    user:"",
    password:"",
}

class MainContextProvider extends Component {
    constructor(props) {
        super(props)
    this.state = {
        isLoggedIn:false,
        onSuccess:false,
        openBackEnd:false,

        BackEndInitialValues:initialvalues,

        allProductsList:[],

        search:"",
        loading:false,

        sortPrice:"",

        showCheckOut:false,

        showOrder:false,
        orderDetails:[],

        userList:[],
        userDetails:[],

        menuList:[],
        menuNames:[],

        openProduct:false,
        productsDetail:[],

        vegSnacksList:[],
        vegSnacksProducts:[],

        vegCurryList:[],
        vegCurryProducts:[],

        biryaniList:[],
        biryaniProducts:[],
        biryaniProductDetail:[],
        biryaniDummyProducts:[],

        chickenSnacksList:[],
        chickenSnacksProducts:[],

        muttonSnacksList:[],
        muttonSnacksProducts:[],

        fishPrawnsSnacksList:[],
        fishPrawnsSnacksProducts:[],

        chickenCurryList:[],
        chickenCurryProducts:[],

        muttonCurryList:[],
        muttonCurryProducts:[],

        tandooriList:[],
        tandooriProducts:[],

        rotiNaanList:[],
        rotiNaanProducts:[],

        bestOfSevenHillsList:[],
        bestOfSevenHillsProducts:[],

        cart:[],
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0
    }
    this.cancel='';
}
    // handleSearch=e=>{
    //     const search = e.target.value
    //     this.setState({search,loading:true},()=>{
    //         // this.fetchBiryaniList(search)
    //     })
    // }
    // fetchSearchResult = (search)=>{
    //     if(this.cancel)
    //     {
    //         this.cancel.cancel()
    //     }
    //     this.cancel = axios.CancelToken.source()
    //     axios.get(`http://localhost:64823/api/${search}/`,{CancelToken:this.cancel.token})
    //     .then(res=>console.log(res))
    // }
    componentDidMount=()=>{
        this.fetchMenuList()
        this.fetchVegSnacksList()
        this.fetchVegCurryList()
        this.fetchBiryaniList()
        this.fetchChickenSnacksList()
        this.fetchMuttonSnacksList()
        this.fetchFishPrawnsSnacksList()
        this.fetchChickenCurryList()
        this.fetchMuttonCurryList()
        this.fetchTandooriList()
        this.fetchRotiNaanList()
        this.fetchUserList()
        this.fetchBestOfSevenHillsList()
        
    }
    
    handleSearch=(e)=>{
        const value = e.target.value
        let search = [];
        if(value.length>0)
        {
            const regex = new RegExp(`^${value}`,'i')
            search = this.state.menuNames.sort().filter(v=>regex.test(v))
        }
        this.setState(()=>({search}))
    }
    renderSearchList=(items)=>{
        const {search} = this.state
        // if(search !== "" && items.toString().toLowerCase().indexOf(search.toString().toLowerCase())===-1)
        // {
        //     return null
        // }
        return (
            <Link to={`./MainSection${items}`}>
                <label className="home-items-label">{items}</label>
            </Link>)
    }
    renderSearch=()=>{
        const {search} = this.state
        if(search.length===0){
            return null
        }
        return (
            <ul className="home-items-ul">
                <div>
                    {
                        search && search.map((items,index)=>{
                        return (<div key={index}>{this.renderSearchList(items)}</div>)
                        })
                    }
                </div>
            </ul>
        )

    }
    checkOutForm=()=>{
        this.setState({
            showCheckOut:true
        })
    }
    createOrder=(order)=>{
        alert("Need to Save your order " + order.name)
    }

    filterPoductPrice=(e)=>{
        console.log(e.target.value)
        const sortPrice = e.target.value
        const tempProducts= [...this.state.biryaniProducts] 
        this.setState(()=>({
            sortPrice:sortPrice,
            tempProducts: tempProducts.slice().sort((a,b)=>(
                sortPrice === "lowest" ?
                ((a.price < b.price)? 1:-1):
                sortPrice === "highest" ?
                ((a.price > b.price) ? 1:-1):
                ((a.id > b.id)?1:-1),
                console.log(a.price)
            ))
        }))
        console.log(tempProducts)
        // if(e.target.value==="")
        // {
        //     this.setState({filterPrice:e.target.value, product:tempProducts})
        // }
        // this.setState({
        //     filterPrice:e.target.value,
        //     index: tempProducts.filter(product=>product.price.indexOf(e.target.value)>=0)
        // })
        // console.log(index)
    }

    fetchUserList=()=>{
        api.usersignUPAPI().fetchAll().then(res=>{
            this.setState({userList:[...res.data]},()=>{
                this.setUserDetails()
            })
        })
    }
    setUserDetails=()=>{
        let tempProducts = []
        let product = [...this.state.userList]
        product.forEach(user=>{
            const singleUser = {...user}
            tempProducts = [...tempProducts,singleUser]
        })
        this.setState(()=>{
            return {userDetails:tempProducts}
        })
    }
    fetchBestOfSevenHillsList=()=>{
        api.bestofsevenhillsAPI().fetchAll().then(res=>{
            this.setState({bestOfSevenHillsList:[...res.data]},()=>{
                this.setBestOfSevenHillsNames()
            })
        })
        .catch(err => console.log(err))
    }
    setBestOfSevenHillsNames=()=>{
        let tempProducts = []
        let product = [...this.state.bestOfSevenHillsList]
        product.forEach(item=>{
            const singleItem = {...item,inCart:false,count:0,total:0,cartId: Math.floor(100000 + Math.random() * 900000)}
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {bestOfSevenHillsProducts:tempProducts}
        })
    }

    fetchMenuList=()=>{
        api.menuAPI().fetchAll().then(res=>{
            this.setState({menuList:[...res.data]},()=>{
                this.setMenuNames()
            })
        })
        .catch(err => console.log(err))
    }
    setMenuNames=()=>{
        let tempProducts = []
        let product = [...this.state.menuList]
        product.forEach(item=>{
            const singleItem = item.name
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {menuNames:tempProducts}
        })
    }
    fetchVegSnacksList=()=>{
        api.vegsnacksAPI().fetchAll().then(res=>{
            this.setState({vegSnacksList:[...res.data]},()=>{
                this.setVegSnacksProducts()
            })
        })
        .catch(err => console.log(err))
    }
    fetchVegCurryList=()=>{
        api.vegcurriesAPI().fetchAll().then(res=>{
            this.setState({vegCurryList:[...res.data]},()=>{
                this.setVegCurryProducts()
            })
        })
        .catch(err => console.log(err))
    }
    fetchBiryaniList =()=>{
        api.biryaniAPI().fetchAll().then(res=>
            {this.setState({biryaniList:[...res.data]},()=>{
                this.setBiryaniProducts()
            });
        })
            .catch(err => console.log(err))
    }
    fetchChickenSnacksList=()=>{
        api.chickensnacksAPI().fetchAll().then(res=>{
            this.setState({chickenSnacksList:[...res.data]},()=>{
                this.setChickenSnacksProducts()
            })
        })
        .catch(err => console.log(err))
    }
    fetchMuttonSnacksList=()=>{
        api.muttonsnacksAPI().fetchAll().then(res=>{
            this.setState({muttonSnacksList:[...res.data]},()=>{
                this.setMuttonSnacksProducts()
            })
        })
        .catch(err => console.log(err))
    }
    fetchFishPrawnsSnacksList=()=>{
        api.fishprawnssnacksAPI().fetchAll().then(res=>{
            this.setState({fishPrawnsSnacksList:[...res.data]},()=>{
                this.setFishPrawnsSnacksProducts()
            })
        })
        .catch(err => console.log(err))
    }
    fetchChickenCurryList=()=>{
        api.chickencurriesAPI().fetchAll().then(res=>{
            this.setState({chickenCurryList:[...res.data]},()=>{
                this.setChickenCurryProducts()
            })
        })
        .catch(err => console.log(err))
    }
    fetchMuttonCurryList=()=>{
        api.muttoncurriesAPI().fetchAll().then(res=>{
            this.setState({muttonCurryList:[...res.data]},()=>{
                this.setMuttonCurryProducts()
            })
        })
        .catch(err => console.log(err))
    }
    fetchTandooriList=()=>{
        api.tandooriAPI().fetchAll().then(res=>{
            this.setState({tandooriList:[...res.data]},()=>{
                this.setTandooriProducts()
            })
        })
        .catch(err => console.log(err))
    }
    fetchRotiNaanList=()=>{
        api.rotinaanAPI().fetchAll().then(res=>{
            this.setState({rotiNaanList:[...res.data]},()=>{
                this.setRotiNaanProducts()
            })
        })
        .catch(err => console.log(err))
    }


    setVegSnacksProducts=()=>{
        let tempProducts = []
        let product = [...this.state.vegSnacksList]
        product.forEach(item=>{
            const singleItem = {...item,inCart:false,count:0,total:0,cartId: Math.floor(100000 + Math.random() * 900000)}
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {vegSnacksProducts:tempProducts}
        },()=>{
            return this.SetAllProducts()
        })
    }
    setVegCurryProducts=()=>{
        let tempProducts = []
        let product = [...this.state.vegCurryList]
        product.forEach(item=>{
            const singleItem = {...item,inCart:false,count:0,total:0,cartId: Math.floor(100000 + Math.random() * 900000)}
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {vegCurryProducts:tempProducts}
        },()=>{
            return this.SetAllProducts()
        })
    }
    setBiryaniProducts=()=>{
        let tempProducts = []
        let tempDummyProducts = []
        let product = [...this.state.biryaniList]
        let dummyProduct = [...this.state.biryaniList]
        product.forEach(item=>{
            const singleItem = {...item,inCart:false,count:0,total:0,cartId: Math.floor(100000 + Math.random() * 900000)}
            tempProducts = [...tempProducts,singleItem]
        })
        dummyProduct.forEach(item=>{
            const singleItem = {...item}
            tempDummyProducts = [...tempDummyProducts,singleItem]
        })
        this.setState(()=>{
            return {biryaniDummyProducts:tempDummyProducts}
        },()=>{
            return this.SetAllProducts()
        })
        this.setState(()=>{
            return {biryaniProducts:tempProducts}
        })
        // console.log(tempProducts)
    }
    setChickenSnacksProducts=()=>{
        let tempProducts = []
        let product = [...this.state.chickenSnacksList]
        product.forEach(item=>{
            const singleItem = {...item,inCart:false,count:0,total:0,cartId: Math.floor(100000 + Math.random() * 900000)}
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {chickenSnacksProducts:tempProducts}
        },()=>{
            return this.SetAllProducts()
        })
    }
    setMuttonSnacksProducts=()=>{
        let tempProducts = []
        let product = [...this.state.muttonSnacksList]
        product.forEach(item=>{
            const singleItem = {...item,inCart:false,count:0,total:0,cartId: Math.floor(100000 + Math.random() * 900000)}
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {muttonSnacksProducts:tempProducts}
        },()=>{
            return this.SetAllProducts()
        })
    }
    setFishPrawnsSnacksProducts=()=>{
        let tempProducts = []
        let product = [...this.state.fishPrawnsSnacksList]
        product.forEach(item=>{
            const singleItem = {...item,inCart:false,count:0,total:0,cartId: Math.floor(100000 + Math.random() * 900000)}
            tempProducts = [...tempProducts,singleItem]
        },()=>{
            return this.SetAllProducts()
        })
        this.setState(()=>{
            return {fishPrawnsSnacksProducts:tempProducts}
        },()=>{
            return this.SetAllProducts()
        })
    }
    
    setChickenCurryProducts=()=>{
        let tempProducts = []
        let product = [...this.state.chickenCurryList]
        product.forEach(item=>{
            const singleItem = {...item,inCart:false,count:0,total:0,cartId: Math.floor(100000 + Math.random() * 900000)}
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {chickenCurryProducts:tempProducts}
        },()=>{
            return this.SetAllProducts()
        })
    }
    setMuttonCurryProducts=()=>{
        let tempProducts = []
        let product = [...this.state.muttonCurryList]
        product.forEach(item=>{
            const singleItem = {...item,inCart:false,count:0,total:0,cartId: Math.floor(100000 + Math.random() * 900000)}
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {muttonCurryProducts:tempProducts}
        },()=>{
            return this.SetAllProducts()
        })
    }
    setTandooriProducts=()=>{
        let tempProducts = []
        let product = [...this.state.tandooriList]
        product.forEach(item=>{
            const singleItem = {...item,inCart:false,count:0,total:0,cartId: Math.floor(100000 + Math.random() * 900000)}
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {tandooriProducts:tempProducts}
        },()=>{
            return this.SetAllProducts()
        })
    }
    setRotiNaanProducts=()=>{let tempProducts = []
        let product = [...this.state.rotiNaanList]
        product.forEach(item=>{
            const singleItem = {...item,inCart:false,count:0,total:0,cartId: Math.floor(100000 + Math.random() * 900000)}
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {rotiNaanProducts:tempProducts}
        },()=>{
            return this.SetAllProducts()
        })}



    getItem=(cartId)=>{
        const vegSnacksproduct = this.state.vegSnacksProducts.find(item=>item.cartId === cartId)
        const vegCurryproduct = this.state.vegCurryProducts.find(item=>item.cartId === cartId)
        const BiryaniProduct = this.state.biryaniProducts.find(item => item.cartId===cartId)
        const chickenSnacksProduct = this.state.chickenSnacksProducts.find(item=>item.cartId === cartId)
        const muttonSnacksProduct = this.state.muttonSnacksProducts.find(item=>item.cartId === cartId)
        const fishPrawnsSnacksProduct = this.state.fishPrawnsSnacksProducts.find(item=>item.cartId === cartId)
        const chickenCurryProduct = this.state.chickenCurryProducts.find(item=>item.cartId===cartId)
        const muttonCurryProduct = this.state.muttonCurryProducts.find(item=>item.cartId === cartId)
        const tandooriProduct = this.state.tandooriProducts.find(item=>item.cartId===cartId)
        const rootiNaanProduct = this.state.rotiNaanProducts.find(item=>item.cartId===cartId)
        const bestOfSevenHillsProduct = this.state.bestOfSevenHillsProducts.find(item=>item.cartId===cartId)
        if(bestOfSevenHillsProduct){return bestOfSevenHillsProduct}
        if(BiryaniProduct){return BiryaniProduct}
        if(vegSnacksproduct){return vegSnacksproduct}
        if(fishPrawnsSnacksProduct){return fishPrawnsSnacksProduct}
        if(chickenSnacksProduct){return chickenSnacksProduct}
        if(vegCurryproduct){return vegCurryproduct}
        if(chickenCurryProduct){return chickenCurryProduct}
        if(muttonSnacksProduct){return muttonSnacksProduct}
        if(muttonCurryProduct){return muttonCurryProduct}
        if(tandooriProduct){return tandooriProduct}
        if(rootiNaanProduct){return rootiNaanProduct}
    }




    handelDetail=(id)=>{}


    SetAllProducts=()=>{
        let tempVegSnacksProducts = [...this.state.vegSnacksProducts]
        let tempVegCurryProducts = [...this.state.vegCurryProducts]
        let tempBiryaniProducts = [...this.state.biryaniProducts]
        let tempChickenSnacksProducts = [...this.state.chickenSnacksProducts]
        let tempMuttonSnacksProducts = [...this.state.muttonSnacksProducts]
        let tempFishPrawnsSnacksProducts = [...this.state.fishPrawnsSnacksProducts]
        let tempChickenCurryProducts = [...this.state.chickenCurryProducts]
        let tempMuttonCurryProducts = [...this.state.muttonCurryProducts]
        let tempTandooriProducts = [...this.state.tandooriProducts]
        let tempRotiNaanProducts = [...this.state.rotiNaanProducts]
        let tempDummyProducts = [...this.state.biryaniDummyProducts]

        // const tempAllProductsList = [tempVegSnacksProducts,tempVegCurryProducts,tempBiryaniProducts,tempChickenSnacksProducts,tempMuttonSnacksProducts,tempFishPrawnsSnacksProducts,tempChickenCurryProducts,tempMuttonCurryProducts,tempTandooriProducts,tempRotiNaanProducts]
        // this.setState(()=>{
        //     return {allProductsList:tempAllProductsList}
        // })
        // console.log(tempAllProductsList)
    }


    addToCart=(cartId)=>{
        let tempVegSnacksProducts = [...this.state.vegSnacksProducts]
        let tempVegCurryProducts = [...this.state.vegCurryProducts]
        let tempBiryaniProducts = [...this.state.biryaniProducts]
        let tempChickenSnacksProducts = [...this.state.chickenSnacksProducts]
        let tempMuttonSnacksProducts = [...this.state.muttonSnacksProducts]
        let tempFishPrawnsSnacksProducts = [...this.state.fishPrawnsSnacksProducts]
        let tempChickenCurryProducts = [...this.state.chickenCurryProducts]
        let tempMuttonCurryProducts = [...this.state.muttonCurryProducts]
        let tempTandooriProducts = [...this.state.tandooriProducts]
        let tempRotiNaanProducts = [...this.state.rotiNaanProducts]
        let tempDummyProducts = [...this.state.biryaniDummyProducts]
        let tempBestOfSevenHillsProducts = [...this.state.bestOfSevenHillsProducts]

        const indexBestOfSevenHills = tempBestOfSevenHillsProducts.indexOf(this.getItem(cartId))
        const productBestOfSevenHills = tempBestOfSevenHillsProducts[indexBestOfSevenHills]

        const indexVegSnacks = tempVegSnacksProducts.indexOf(this.getItem(cartId))
        const productVegSnacks = tempVegSnacksProducts[indexVegSnacks]

        const indexVegCurry = tempVegCurryProducts.indexOf(this.getItem(cartId))
        const productVegCurry = tempVegCurryProducts[indexVegCurry]

        const indexBiryani = tempBiryaniProducts.indexOf(this.getItem(cartId))
        const productBiryani = tempBiryaniProducts[indexBiryani]

        const indexChickenSnacks = tempChickenSnacksProducts.indexOf(this.getItem(cartId))
        const productChickenSnacks = tempChickenSnacksProducts[indexChickenSnacks]

        const indexMuttonSnacks = tempMuttonSnacksProducts.indexOf(this.getItem(cartId))
        const productMuttonSnacks = tempMuttonSnacksProducts[indexMuttonSnacks]

        const indexFishPrawnsSnacks = tempFishPrawnsSnacksProducts.indexOf(this.getItem(cartId))
        const productFishPrawnsSnacks = tempFishPrawnsSnacksProducts[indexFishPrawnsSnacks]

        const indexChickenCurry = tempChickenCurryProducts.indexOf(this.getItem(cartId))
        const productChickenCurry = tempChickenCurryProducts[indexChickenCurry]

        const indexMuttonCurry = tempMuttonCurryProducts.indexOf(this.getItem(cartId))
        const productMuttonCurry = tempMuttonCurryProducts[indexMuttonCurry]

        const indexTandoori = tempTandooriProducts.indexOf(this.getItem(cartId))
        const productTandoori = tempTandooriProducts[indexTandoori]

        const indexRotiNaan = tempRotiNaanProducts.indexOf(this.getItem(cartId))
        const productRotiNaan = tempRotiNaanProducts[indexRotiNaan]

        if(productBestOfSevenHills)
        {
            productBestOfSevenHills.inCart=true
            productBestOfSevenHills.count=1
            const price = productBestOfSevenHills.price
            productBestOfSevenHills.total = price
            this.setState(()=>{
                return {bestOfSevenHillsProducts:tempBestOfSevenHillsProducts,cart:[...this.state.cart,productBestOfSevenHills]}
            },()=>{
                this.addTotals()
            })
        }
        if(productRotiNaan)
        {
            productRotiNaan.inCart=true
            productRotiNaan.count=1
            const price = productRotiNaan.price
            productRotiNaan.total = price
            this.setState(()=>{
                return {rotiNaanProducts:tempRotiNaanProducts,cart:[...this.state.cart,productRotiNaan]}
            },()=>{
                this.addTotals()
            })
        }
        if(productTandoori)
        {
            productTandoori.inCart=true
            productTandoori.count=1
            const price = productTandoori.price
            productTandoori.total = price
            this.setState(()=>{
                return {tandooriProducts:tempTandooriProducts,cart:[...this.state.cart,productTandoori]}
            },()=>{
                this.addTotals()
            })
        }
        if(productMuttonCurry)
        {
            productMuttonCurry.inCart=true
            productMuttonCurry.count=1
            const price = productMuttonCurry.price
            productMuttonCurry.total = price
            this.setState(()=>{
                return {muttonCurryProducts:tempMuttonCurryProducts,cart:[...this.state.cart,productMuttonCurry]}
            },()=>{
                this.addTotals()
            })
        }
        if(productMuttonSnacks)
        {
            productMuttonSnacks.inCart=true
            productMuttonSnacks.count=1
            const price = productMuttonSnacks.price
            productMuttonSnacks.total = price
            this.setState(()=>{
                return {muttonSnacksProducts:tempMuttonSnacksProducts,cart:[...this.state.cart,productMuttonSnacks]}
            },()=>{
                this.addTotals()
            })
        }
        if(productBiryani)
        {
            productBiryani.inCart=true
            productBiryani.count=1
            const price = productBiryani.price
            productBiryani.total = price
            this.setState(()=>{
                return {biryaniProducts:tempBiryaniProducts,cart:[...this.state.cart,productBiryani]}
            },()=>{
                this.addTotals()
                this.add(tempDummyProducts)
            })
        }
        if(productVegSnacks)
        {
            productVegSnacks.inCart=true
            productVegSnacks.count=1
            const price = productVegSnacks.price
            productVegSnacks.total = price
            this.setState(()=>{
                return {vegSnacksProducts:tempVegSnacksProducts,cart:[...this.state.cart,productVegSnacks]}
            },()=>{
                this.addTotals()
            })
        }
        if(productFishPrawnsSnacks)
        {
            productFishPrawnsSnacks.inCart=true
            productFishPrawnsSnacks.count=1
            const price = productFishPrawnsSnacks.price
            productFishPrawnsSnacks.total = price
            this.setState(()=>{
                return {fishPrawnsSnacksProducts:tempFishPrawnsSnacksProducts,cart:[...this.state.cart,productFishPrawnsSnacks]}
            },()=>{
                this.addTotals()
            })
        }
        if(productChickenSnacks)
        {
            productChickenSnacks.inCart=true
            productChickenSnacks.count=1
            const price = productChickenSnacks.price
            productChickenSnacks.total = price
            this.setState(()=>{
                return {chickenSnacksProducts:tempChickenSnacksProducts,cart:[...this.state.cart,productChickenSnacks]}
            },()=>{
                this.addTotals()
            })
        }
        if(productVegCurry)
        {
            productVegCurry.inCart=true
            productVegCurry.count=1
            const price = productVegCurry.price
            productVegCurry.total = price
            this.setState(()=>{
                return {vegCurryProducts:tempVegCurryProducts,cart:[...this.state.cart,productVegCurry]}
            },()=>{
                this.addTotals()
            })
        }
        if(productChickenCurry)
        {
            productChickenCurry.inCart=true
            productChickenCurry.count=1
            const price = productChickenCurry.price
            productChickenCurry.total = price
            this.setState(()=>{
                return {chickenCurryProducts:tempChickenCurryProducts,cart:[...this.state.cart,productChickenCurry]}
            },()=>{
                this.addTotals()
            })
        }
    }


    add=(data)=>{
        console.log(data)
        
        // api.addtocartAPI().create(data).then(res=>{
        //     console.log(res.data)
        // })
    }
    handleBackEndLoginSubmit=(e)=>{
        e.preventDefault();
        if(this.state.BackEndInitialValues.user==="user" && this.state.BackEndInitialValues.password === "root")
        {
            // window.alert("logged in successfully");
            this.setState(()=>{
                return{
                    isLoggedIn:true,
                }
            },()=>{
                this.openBackEndSuccess()
                this.closeBackEndLogin()
            })
        }
        else{
            window.alert("username or password is wrong")
        }
    }
    closeIsLoggedIn=()=>{
        this.setState(()=>{
                return{
                    isLoggedIn:false,
                }
            }
        )
    }
    handleBackendFormChange=(e)=>{
        this.setState(()=>{return{BackEndInitialValues:{...this.state.BackEndInitialValues,[e.target.name]:e.target.value}}})
    }
    openBackEndLogin=()=>{
        this.setState(()=>{
            return { openBackEnd:true}
        })
    }
    openBackEndSuccess=()=>{
        this.setState(()=>{
            return {onSuccess:true}
        })
    }
    closeBackEndLogin=()=>{
        this.setState(()=>{
            return { openBackEnd:false}
        })
    }
    closeBackEndSuccess=()=>{
        this.setState(()=>{
            return {onSuccess:false}
        })
    }

    openOrderDetails=(id)=>{
        let tempProducts = []
        let product = [...this.state.cart]
        product.forEach(item=>{
            const singleId = {...item,orderId:id}
            tempProducts = [...tempProducts,singleId]
        }) 
        this.setState(()=>{
            return {orderDetails:tempProducts,showOrder:true}
        })
    }
    closeOrderDetails=()=>{
        this.setState(()=>{
            return { showOrder:false}
        })
    }

    openProductDetail=(cartId)=>{
        const product = this.getItem(cartId)
        this.setState(()=>{
            return {productsDetail:product,openProduct:true}
        })
    }
    closeProductsDetail=()=>{
        this.setState(()=>{
            return {openProduct:false}
        })
    }

    increment=(cartId)=>{
        let tempCart = [...this.state.cart]
        const selecteditem=tempCart.find(item=>item.cartId===cartId)
        const index = tempCart.indexOf(selecteditem)
        const product = tempCart[index]
        product.count = product.count+1
        product.total = product.price * product.count
        this.setState(()=>{
            return {cart:[...tempCart]}
        },()=>{
            return this.addTotals()
        })
    }
    decrement=(cartId)=>{
        let tempCart = [...this.state.cart]
        const selecteditem=tempCart.find(item=>item.cartId===cartId)
        const index = tempCart.indexOf(selecteditem)
        const product = tempCart[index]
        product.count = product.count-1
        if(product.count===0)
        {
            this.removeItem(cartId)
        }
        else{
            product.total = product.price * product.count
            this.setState(()=>{
                return {cart:[...tempCart]}
            },()=>{
                return this.addTotals()
            })
        }
    }
    removeItem=(cartId)=>{
        let tempVegSnacksProducts = [...this.state.vegSnacksProducts]
        let tempVegCurryProducts = [...this.state.vegCurryProducts]
        let tempBiryaniProducts = [...this.state.biryaniProducts]
        let tempChickenSnacksProducts = [...this.state.chickenSnacksProducts]
        let tempMuttonSnacksProducts = [...this.state.muttonSnacksProducts]
        let tempFishPrawnsSnacksProducts = [...this.state.fishPrawnsSnacksProducts]
        let tempChickenCurryProducts = [...this.state.chickenCurryProducts]
        let tempMuttonCurryProducts = [...this.state.muttonCurryProducts]
        let tempTandooriProducts = [...this.state.tandooriProducts]
        let tempRotiNaanProducts = [...this.state.rotiNaanProducts]
        let tempBestOfSevenHillsProducts = [...this.state.bestOfSevenHillsProducts]

        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item=>item.cartId!==cartId)

        const indexBestOfSevenHills = tempBestOfSevenHillsProducts.indexOf(this.getItem(cartId))
        let removedBestOfSevenHillsProduct = tempBestOfSevenHillsProducts[indexBestOfSevenHills]

        const indexRotiNaan = tempRotiNaanProducts.indexOf(this.getItem(cartId))
        let removedRotiNaanProduct = tempRotiNaanProducts[indexRotiNaan]

        const indexTandoori = tempTandooriProducts.indexOf(this.getItem(cartId))
        let removedTandooriProduct = tempTandooriProducts[indexTandoori]

        const indexMuttonCurry = tempMuttonCurryProducts.indexOf(this.getItem(cartId))
        let removedMuttonCurryProduct = tempMuttonCurryProducts[indexMuttonCurry]

        const indexMuttonSnacks = tempMuttonSnacksProducts.indexOf(this.getItem(cartId))
        let removedMuttonSnacksProduct = tempMuttonSnacksProducts[indexMuttonSnacks]

        const indexBiryani = tempBiryaniProducts.indexOf(this.getItem(cartId))
        let removedBiryaniProduct = tempBiryaniProducts[indexBiryani]

        const indexVegSnacks = tempVegSnacksProducts.indexOf(this.getItem(cartId))
        let removedVegSnacksProduct = tempVegSnacksProducts[indexVegSnacks]

        const indexFishPrawnsSnacks = tempFishPrawnsSnacksProducts.indexOf(this.getItem(cartId))
        let removedFishPrawnsSnacksProduct = tempFishPrawnsSnacksProducts[indexFishPrawnsSnacks]

        const indexChickenSnacks = tempChickenSnacksProducts.indexOf(this.getItem(cartId))
        let removedChickenSnacksProduct = tempChickenSnacksProducts[indexChickenSnacks]

        const indexVegCurry = tempVegCurryProducts.indexOf(this.getItem(cartId))
        let removedVegCurryProduct = tempVegCurryProducts[indexVegCurry]

        const indexChickenCurry = tempChickenCurryProducts.indexOf(this.getItem(cartId))
        let removedChickenCurryProduct = tempChickenCurryProducts[indexChickenCurry]

        if(removedBestOfSevenHillsProduct)
        {
            removedBestOfSevenHillsProduct.inCart=false
            removedBestOfSevenHillsProduct.count=0
            removedBestOfSevenHillsProduct.total=0
            this.setState(()=>{
                return {bestOfSevenHillsProducts:[...tempBestOfSevenHillsProducts],cart:[...tempCart]}
            },()=>{
                this.addTotals()
            })
        }
        if(removedRotiNaanProduct)
        {
            removedRotiNaanProduct.inCart=false
            removedRotiNaanProduct.count=0
            removedRotiNaanProduct.total=0
            this.setState(()=>{
                return {rotiNaanProducts:[...tempRotiNaanProducts],cart:[...tempCart]}
            },()=>{
                this.addTotals()
            })
        }
        if(removedTandooriProduct)
        {
            removedTandooriProduct.inCart=false
            removedTandooriProduct.count=0
            removedTandooriProduct.total=0
            this.setState(()=>{
                return {tandooriProducts:[...tempTandooriProducts],cart:[...tempCart]}
            },()=>{
                this.addTotals()
            })
        }
        if(removedMuttonCurryProduct)
        {
            removedMuttonCurryProduct.inCart=false
            removedMuttonCurryProduct.count=0
            removedMuttonCurryProduct.total=0
            this.setState(()=>{
                return {muttonSnacksproducts:[...tempMuttonCurryProducts],cart:[...tempCart]}
            },()=>{
                this.addTotals()
            })
        }
        if(removedMuttonSnacksProduct)
        {
            removedMuttonSnacksProduct.inCart=false
            removedMuttonSnacksProduct.count=0
            removedMuttonSnacksProduct.total=0
            this.setState(()=>{
                return {muttonSnacksproducts:[...tempMuttonSnacksProducts],cart:[...tempCart]}
            },()=>{
                this.addTotals()
            })
        }
        if(removedBiryaniProduct)
        {
            removedBiryaniProduct.inCart=false
            removedBiryaniProduct.count=0
            removedBiryaniProduct.total=0
            this.setState(()=>{
                return {biryaniProducts:[...tempBiryaniProducts],cart:[...tempCart]}
            },()=>{
                this.addTotals()
            })
        }
        if(removedVegSnacksProduct){
            removedVegSnacksProduct.inCart=false
            removedVegSnacksProduct.count=0
            removedVegSnacksProduct.total=0
            this.setState(()=>{
                return {vegSnacksProducts:[...tempVegSnacksProducts],cart:[...tempCart]}
            },()=>{
                this.addTotals()
            })
        }
        if(removedFishPrawnsSnacksProduct){
            removedFishPrawnsSnacksProduct.inCart=false
            removedFishPrawnsSnacksProduct.count=0
            removedFishPrawnsSnacksProduct.total=0
            this.setState(()=>{
                return {fishPrawnsSnacksProducts:[...tempFishPrawnsSnacksProducts],cart:[...tempCart]}
            },()=>{
                this.addTotals()
            })
        }
        if(removedChickenSnacksProduct)
        {
            removedChickenSnacksProduct.inCart=false
            removedChickenSnacksProduct.count=0
            removedChickenSnacksProduct.total=0
            this.setState(()=>{
                return {chickenSnacksProducts:[...tempChickenSnacksProducts],cart:[...tempCart]}
            },()=>{
                this.addTotals()
            })
        }
        if(removedVegCurryProduct)
        {
            removedVegCurryProduct.inCart=false
            removedVegCurryProduct.count=0
            removedVegCurryProduct.total=0
            this.setState(()=>{
                return {vegCurryproducts:[...tempVegCurryProducts],cart:[...tempCart]}
            },()=>{
                this.addTotals()
            })
        }
        if(removedChickenCurryProduct)
        {
            removedChickenCurryProduct.inCart=false
            removedChickenCurryProduct.count=0
            removedChickenCurryProduct.total=0
            this.setState(()=>{
                return {chickenCurryProducts:[...tempChickenCurryProducts],cart:[...tempCart]}
            },()=>{
                this.addTotals()
            })
        }
        
    }
    clearCart=()=>{
        this.setState(()=>{
            return {cart:[]}
        },()=>{
            return (
                this.setBiryaniProducts(),
                this.setVegSnacksProducts(),
                this.setFishPrawnsSnacksProducts(),
                this.setChickenSnacksProducts(),
                this.setMuttonSnacksProducts(),
                this.setVegCurryProducts(),
                this.setChickenCurryProducts(),
                this.setMuttonCurryProducts(),
                this.setTandooriProducts(),
                this.setRotiNaanProducts(),
                this.setBestOfSevenHillsNames(),
                this.addTotals()
            )
        })
    }
    addTotals=()=>{
        let subTotal = 0
        this.state.cart.map(item=>(subTotal += item.total))
        const tempTax = subTotal *0.1
        const Tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + Tax
        this.setState(()=>{
            return {
                cartSubTotal:subTotal,
                cartTax:Tax,
                cartTotal:total
            }
        })
    }
    render() {
        return (
            <AllContext.Provider value={{
                ...this.state,
                handleSearch:this.handleSearch,
                renderSearch:this.renderSearch,
                filterPoductPrice:this.filterPoductPrice,
                checkOutForm:this.checkOutForm,
                createOrder:this.createOrder,
                closeIsLoggedIn:this.closeIsLoggedIn,
                openBackEndLogin:this.openBackEndLogin,
                closeBackEndLogin:this.closeBackEndLogin,
                openBackEndSuccess:this.openBackEndSuccess,
                closeBackEndSuccess:this.closeBackEndSuccess,
                handleBackEndLoginSubmit:this.handleBackEndLoginSubmit,
                handleBackendFormChange:this.handleBackendFormChange,
                handelDetail:this.handelDetail,
                addToCart:this.addToCart,
                openOrderDetails:this.openOrderDetails,
                closeOrderDetails:this.closeOrderDetails,
                openProductDetail:this.openProductDetail,
                closeProductsDetail:this.closeProductsDetail,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart
            }}>
                {this.props.children}
            </AllContext.Provider>
        )
    }
}

const MainContextConsumer = AllContext.Consumer

export {MainContextProvider, MainContextConsumer}
