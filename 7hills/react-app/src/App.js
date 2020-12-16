import React from "react";
import "./App.css";
import { store } from "./actions/Store";
import { Provider } from "react-redux";
import HillsUserContainer from "./components/7HillsUserContainer";
import { Container } from "@material-ui/core";
import {ToastProvider} from 'react-toast-notifications'
import ItemsContainer from "./components/ItemsContainer";
import BackendPortal from "./components/Backend-Portal";
import IndexDOM from "./components/IndexDOM";
import OwnerContainer from './components/OwnerContainer'
// import OwnerContactContainer from './OwnerContact/OwnerContactContainer'
import OwnerContactContainers from "./OwnerContact/OwnerContactContainers";
// import DataFetching from "./CardSlideComponents/DataFetching";
// import SlideCart from "./CardSlideComponents/SlideCart";
import Data from "./CardSlideComponents/Data";

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        {/* <OwnerForm></OwnerForm> */}
        {/* <OwnerContactContainer></OwnerContactContainer> */}
        {/* <DataFetching></DataFetching> */}
        {/* <SlideCart></SlideCart> */}
        {/* <Data></Data> */}
        <OwnerContactContainers></OwnerContactContainers>
        <OwnerContainer></OwnerContainer>
        <IndexDOM></IndexDOM>
        <Container>
        <HillsUserContainer></HillsUserContainer>
        <ItemsContainer></ItemsContainer>
        <BackendPortal></BackendPortal>
      </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;
