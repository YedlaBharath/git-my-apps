import React, { Component } from 'react'
import Mock from '../Home/Mock.json'

const productContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products:[],
        detailProduct:[],
        cart:[],
        modalOpen:false,
        modalProduct:[],
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0

    }
    componentDidMount(){
        this.setProducts()
    }
    setProducts=()=>{
        let tempProducts = []
        Mock.forEach(item=>{
            const singleItem = {...item}
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {products:tempProducts}
        })
    }
    getItem=(id)=>{
        const product = this.state.products.find(item=>item.id===id)
        return product
    }
    handleDetail=(id)=>{
        const product = this.getItem(id)
        this.setState(()=>{
            return {detailProduct:product}
        })
    }
    addToCart = (id)=>{
        let tempProducts = [...this.state.products,{count:0,total:0}]
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index]
        product.inCart = true
        product.count = 1;
        const price = product.price
        product.total=price
        this.setState(()=>{
            return {products:tempProducts,cart:[...this.state.cart,product]}
        },()=>{
            this.addTotals()
        })
    }
    openModal=(id)=>{
        const product = this.getItem(id)
        this.setState(()=>{
            return {modalProduct:product,modalOpen:true}
        })
    }
    closeModal=()=>{
        this.setState(()=>{
            return {modalOpen:false}
        })
    }
    increment=(id)=>{
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item=>item.id===id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]

        product.count= product.count+1
        product.total = product.count * product.price
        this.setState(()=>{
            return {
                cart:[...tempCart]
            }
        },()=>{
            return this.addTotals()
        })
    }
    decrement=(id)=>{
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item=>item.id===id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]

        product.count = product.count-1
        if(product.count === 0)
        {
            this.removeItem(id)
        }
        else{
        product.total = product.count * product.price
        this.setState(()=>{
            return {
                cart:[...tempCart]
            }
        },()=>{
            return this.addTotals()
        })
        }
    }
    removeItem=(id)=>{
        let tempProducts = [...this.state.products]
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item=>item.id!==id)

        const index = tempProducts.indexOf(this.getItem(id))
        let removedProducts = tempProducts[index]
        removedProducts.inCart = false
        removedProducts.count = 0
        removedProducts.total = 0

        this.setState(()=>{
            return {
                cart:[...tempCart],
                products:[...tempProducts]
            }
        },()=>{
            this.addTotals()
        })
    }
    clearCart=()=>{
        this.setState(()=>{
            return {cart:[]}
        },()=>{
            return this.setProducts()
        })
    }
    addTotals=()=>{
        let subTotal =0
        this.state.cart.map(item=>(subTotal += item.total))
        const tempTax = subTotal * 0.2;
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax
        this.setState(()=>{
            return{
                cartSubTotal:subTotal,
                cartTax:tax,
                cartTotal:total
            }
        })
    }
    render() {
        return (
            <productContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                openModal:this.openModal,
                closeModal:this.closeModal,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart
                }}>
                {this.props.children}
            </productContext.Provider>
        )
    }
}
const ProductConsumer = productContext.Consumer

export {ProductProvider,ProductConsumer}
