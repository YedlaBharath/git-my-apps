import React,{useState,useEffect} from 'react'
import api from '../../actions/api'

const productContext = React.createContext();

const VegSnacksContextProvider = () => {
    const [list,setList] = useState([{}])
    const [products,setProducts] = useState([])
    useEffect(()=>{
        fetchList()
        // setItems()
    })
    const fetchList =()=>{
        api.vegsnacksAPI().fetchAll().then(res=>setList(res.data)).catch(err => console.log(err))
    }
    const setItems=()=>{
        let tempProducts = [];
        list.forEach(item=>{
            const singleItem = {...item,incart:false};
            tempProducts = [...tempProducts,{...singleItem}];
        });
        setProducts(tempProducts)
    }
    return (
        <productContext.Provider value={{...list}}>
        </productContext.Provider>
    )
}
const VegSnacksContextConsumer = productContext.Consumer
export {VegSnacksContextProvider,VegSnacksContextConsumer}
