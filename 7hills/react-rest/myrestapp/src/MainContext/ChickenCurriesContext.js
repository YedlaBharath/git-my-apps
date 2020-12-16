import { parseSync } from '@babel/core'
import React, { Component } from 'react'
import api from '../actions/api'

const ChickenCurriesContext = React.createContext()
class ChickenCurriesContextProvider extends Component {
    state = {
        chickenCurriesList:[],
        chickenCurriesProduct:[],
        cart:[],
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0
    }
    componentDidMount=()=>{
        this.fetchChickenCurriesList()
    }
    fetchChickenCurriesList =()=>{
        api.chickencurriesAPI().fetchAll().then(res=>
            {this.setState({chickenCurriesList:[...res.data]},()=>{
                this.setProducts()
            });
        })
        
            .catch(err => console.log(err))
    }
    setProducts = ()=>{
        let tempProducts = []
        let product = [...this.state.chickenCurriesList]
        product.forEach(item=>{
            const singleProduct = {...item,inCart:false,count:0,total:0,cartId:Date().toLocaleString()}
            tempProducts = [...tempProducts,singleProduct]
        })
        this.setState(()=>{
            return {chickenCurriesProduct:tempProducts}
        })
    }
    getItem=(id)=>{
        const product = this.state.chickenCurriesProduct.find(item=>item.id===id)
        return product
    }
    addToCart=(id)=>{
        let tempProducts = [...this.state.chickenCurriesProduct]
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index]
        product.inCart = true
        product.count = 1
        const price = product.price
        product.total = price
        this.setState(()=>{
            return {chickenCurriesProduct:tempProducts,cart:[...this.state.cart,product]}
        },()=>{
            this.addTotals()
        })
    }
    increment=(id)=>{
        let tempCart = [...this.state.cart]
        const selectedItem = tempCart.find(item=>item.id===id)
        const index = tempCart.indexOf(selectedItem)
        const product = tempCart[index]
        product.count = product.count + 1
        product.total = product.price * product.count
        this.setState(()=>{
            return {cart:[...tempCart]}
        },()=>{
            this.addTotals()
        })
    }
    removeItem=(id)=>{
        let tempProducts = [...this.state.chickenCurriesProduct]
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item=>item.id!==id)
        const index = tempProducts.indexOf(this.getItem(id))
        let removedProduct = tempProducts[index]
        removedProduct.inCart = false
        removedProduct.count = 0
        removedProduct.total =0
        this.setState(()=>{
            return {chickenCurriesProduct:[...tempProducts],cart:[...tempCart]}
        },()=>{
            return this.addTotals()
        })
    }
    decrement=(id)=>{
        let tempCart = [...this.state.cart]
        const selectedItem = tempCart.find(item=>item.id===id)
        const index = tempCart.indexOf(selectedItem)
        const product = tempCart[index]
        product.count = product.count - 1
        if(product.count === 0)
        {
            this.removeItem(id)
        }
        else{
            product.total = product.count * product.price
            this.setState(()=>{
                return {cart:[...tempCart]}
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
                this.setProducts(),
                this.addTotals()
            )
        })
    }
    addTotals=()=>{
        let subTotal=0
        this.state.cart.map(item=>(subTotal += item.total))
        const tempTax = subTotal * 0.1
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
            <ChickenCurriesContext.Provider value={{
                ...this.state,
                addToCart:this.addToCart,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart
            }}>
                {this.props.children}
            </ChickenCurriesContext.Provider>
        )
    }
}
const ChickenCurriesContextConsumer = ChickenCurriesContext.Consumer

export {ChickenCurriesContextProvider,ChickenCurriesContextConsumer}
