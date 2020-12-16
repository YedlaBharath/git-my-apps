import React,{useEffect} from 'react'
import BiryaniDetails from '../Biryani/BiryaniDetails'
import FishPrawnsSnacksDetails from '../FishPrawnsSnacks/FishPrawnsSnacksDetails'
import ItemDetails from '../ItemsComponents/ItemDetails'
import MenuDetails from '../Menu/MenuDetails'
import VegSnacksDetails from '../VegSnacks/VegSnacksDetails'
import UserCart from './UserCart'
import BiryaniList from '../Biryani/BiryaniList'
import ChickenCurriesList from '../ChickenCurries/ChickenCurriesList'
import VegSnacksList from '../VegSnacks/VegSnacksList'
import FishPrawnsSnacksList from '../FishPrawnsSnacks/FishPrawnsSnacksList'
import ChickenSnacksList from '../ChickenSnacks/ChickenSnacksList'
import VegCurriesList from '../VegCurries/VegCurriesList'
import MuttonCurriesList from '../MuttonCurries/MuttonCurriesList'
import MuttonSnacksList from '../MuttonSnacks/MuttonSnacksList'
import RootiNaanList from '../RotiNaan/RootiNaanList'
import TandooriList from '../Tandoori/TandooriList'

const MainSection = (props) => {
    const UseCart=()=>{
        if(props.match.params.id==="5" || props.match.params.id==="Fish and Prawns Snacks")
        {
            return (
            <FishPrawnsSnacksList></FishPrawnsSnacksList>
            )
        }
        if(props.match.params.id==="6" || props.match.params.id=== "Veg Snacks")
        {
            return (
                <VegSnacksList></VegSnacksList>
            )
        }
        if(props.match.params.id==="7" || props.match.params.id=== "Biryani")
        {
            return (
            <BiryaniList></BiryaniList>
            )
        }
        if(props.match.params.id==="8" || props.match.params.id=== "Chicken Snacks")
        {
            return (
                <ChickenSnacksList></ChickenSnacksList>
            )
        }
        if(props.match.params.id==="9" || props.match.params.id === "Veg Curry")
        {
            return (
                <VegCurriesList></VegCurriesList>
            )
        }
        if(props.match.params.id==="10" || props.match.params.id=== "Chicken Curry")
        {
            return (
                <ChickenCurriesList></ChickenCurriesList>
            )
        }
        if(props.match.params.id==="11" || props.match.params.id=== "Mutton Curry")
        {
            return (
                <MuttonCurriesList></MuttonCurriesList>
            )
        }
        if(props.match.params.id==="14" || props.match.params.id=== "Mutton Snacks & dry")
        {
            return (
                <MuttonSnacksList></MuttonSnacksList>
            )
        }
        if(props.match.params.id==="16" || props.match.params.id=== "Roti Naan")
        {
            return (
                <RootiNaanList></RootiNaanList>
            )
        }
        if(props.match.params.id==="17" || props.match.params.id=== "Tandoori Items")
        {
            return (
                <TandooriList></TandooriList>
            )
        }
    }
        
    
    return (
        <>
            {UseCart()}
            
        </>
    )
}

export default MainSection
