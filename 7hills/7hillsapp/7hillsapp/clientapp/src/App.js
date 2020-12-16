import logo from './logo.svg';
import './App.css';
import React from 'react'
import ItemsNewForm from './ItemsComponents/ItemsNewForm';
import ItemsContainer from './ItemsComponents/ItemsContainer';
import { Table } from './Table/Table';
import { SortingColumns } from './Table/SortingColumns';
import { PagginationTable } from './Table/PagginationTable';
import { Card } from './CardComponents/Card';
import OwnerContactContainers from './OwnerContact/OwnerContactContainers';
import Home from './Home/Home';
import ItemDetails from './ItemsComponents/ItemDetails'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SignupForm from './CardComponents/SignupForm';
import SignUpContainer from './Home/SignUpContainer';
import Footer from './Home/Footer';
import Consumer from './context/Consumer'
import {VegSnacksContextProvider} from './context/VegSnacksContext/VegSnacksContext'
import ProductList from './context/ProductList';
import Product from './context/Product'
import Details from './context/Details';
import Cart from './context/Cart'
import Modal from './context/Modal'
import SignupContainer from './CardComponents/SignupContainer'
import AddCartList from './MainContext/DummyCart/AddCartList'
function App() {
  return (
    <div className="App">
    <Home></Home>
    </div>
  );
}

export default App;
