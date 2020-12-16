import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Contacts from './Contacts'
import Nav from './Nav'
import '../StyleCss/HomeStyle.scss'
import MainData from '../IndexDOM/MainData'
import ItemDetails from '../ItemsComponents/ItemDetails'
import HomeSideSpan from './HomeSideSpan'
import HomeMainSpan from './HomeMainSpan'
import SignupForm from './SignupForm'
import SignUpContainer from './SignUpContainer'
import Signup from './Signup'
import Footer from './Footer'
import UserCart from './UserCart'
import BackEndHome from './BackEndHome'
import ItemsSection from './ItemsSection'
import OwnersSection from './OwnersSection'
import VegSnacksSection from './VegSnacksSection'
import MenuSection from './MenuSection'
import VegCurriesSection from './VegCurriesSection'
import BiryaniSection from './BiryaniSection'
import ChickenSnacksSection from './ChickenSnacksSection'
import MuttonSnacksSection from './MuttonSnacksSection'
import FishPrawnsSnacksSection from './FishPrawnsSnacksSection'
import ChickenCurriesSection from './ChickenCurriesSection'
import MuttonCurriesSection from './MuttonCurriesSection'
import TandooriSection from './TandooriSection'
import RotiNaanSection from './RotiNaanSection'
import ItemDetail5 from '../IndexDOM/ItemDetail5'
import MainSection from './MainSection'
import Cart from '../MainContext/MainCart/Cart'
import MainProductDetails from '../MainContext/MainProductDetails'
import Default from './Default'
import SignupContainer from '../CardComponents/SignupContainer'
import MainOrderDetails from '../MainContext/MainOrderDetails'
import BackEndLogin from './BackEndLogin'
import BackEndSuccess from './BackEndSuccess'
import { PrintOrderForm } from '../MainContext/PrintOrderForm'
import AllProducts from '../MainContext/AllProducts/AllProducts'
import BestOfSevenHillsSection from './BestOfSevenHillsSection'
import BestOfSevenHillsList from '../BestOfSevenHills/BestOfSevenHillsList'

const Home = () => {
    return (
        <>
        <Router>
            <div>
                <Switch>
                    <Route path="/clientapp" exact component={Index}></Route>
                    <Route path="/Contacts" exact component={Contacts}></Route>
                    <Route path="/IndexDOM/MainData" exact component={MainData}></Route>
                    <Route path="/IndexDOM/ItemDetail5:id" exact component={ItemDetail5}></Route>
                    <Route path="/MainSection:id" exact component={MainSection}></Route>
                    <Route path="/Cart" exact component={Cart}></Route>
                    <Route path="/BackEndHome" exact component={BackEndHome}></Route>
                    <Route path="/HomeMainSpan" component={HomeMainSpan}></Route>
                    <Route path="/ItemsSection" exact component={ItemsSection}></Route>
                    <Route path="/OwnersSection" exact component={OwnersSection}></Route>
                    <Route path="/MenuSection" exact component={MenuSection}></Route>
                    <Route path="/VegSnacksSection" exact component={VegSnacksSection}></Route>
                    <Route path="/VegCurriesSection" exact component={VegCurriesSection}></Route>
                    <Route path="/BiryaniSection" exact component={BiryaniSection}></Route>
                    <Route path="/ChickenSnacksSection" exact component={ChickenSnacksSection}></Route>
                    <Route path="/MuttonSnacksSection" exact component={MuttonSnacksSection}></Route>
                    <Route path="/FishPrawnsSnacksSection" exact component={FishPrawnsSnacksSection}></Route>
                    <Route path="/ChickenCurriesSection" exact component={ChickenCurriesSection}></Route>
                    <Route path="/MuttonCurriesSection" exact component={MuttonCurriesSection}></Route>
                    <Route path="/TandooriSection" exact component={TandooriSection}></Route>
                    <Route path="/RotiNaanSection" exact component={RotiNaanSection}></Route>
                    <Route path="/SignupContainer" exact component={SignupContainer}></Route>
                    <Route path="/AllProducts:id" exact component={AllProducts}></Route>
                    <Route path="/BestOfSevenHillsSection" exact component={BestOfSevenHillsSection}></Route>
                    <Route path="/BestOfSevenHills" exact component={BestOfSevenHillsList}></Route>
                    {/* <Route component={Default}></Route> */}
                </Switch>
                <BackEndLogin></BackEndLogin>
                <BackEndSuccess></BackEndSuccess>
                <MainProductDetails></MainProductDetails>
                <MainOrderDetails></MainOrderDetails>
                
            </div>
        </Router>
        </>
    )
}
const Index = ()=>(
    <>
        <Nav></Nav>
        <div className="home-maindata">
            <MainData></MainData>
        </div>
        
        <div className="home-side-span">
            <HomeSideSpan></HomeSideSpan>
        </div>
        {/* <div className="home-signp-container">
            <SignupForm></SignupForm>
        </div> */}
        {/* <div className="home-main-span">
            <HomeMainSpan></HomeMainSpan>
            <AllProducts></AllProducts>
        </div> */}
        
        <Footer></Footer>
        {/* <Router>
            <Switch>
                <div className="home-main-span">
                    <Route path="/HomeMainSpan" component={HomeMainSpan}></Route>
                </div>
            </Switch>
        </Router> */}
        
        
        {/* // <div className="home-main-span">
        //     <HomeMainSpan></HomeMainSpan>
        // </div> */}
    </>
)

export default Home
