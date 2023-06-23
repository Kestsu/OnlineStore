import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search/Search';
import ShoopingCart from './pages/ShoppingCart/ShoppingCart';
import './App.css';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Checkout from './pages/Checkout/Checkout';
import LoginPage from './pages/LoginPage/LoginPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Register from './pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={ LoginPage } />
        <Route path="/forgot-pass" component={ ForgotPassword } />
        <Route path="/register" component={ Register } />
        <Route exact path="/" component={ Search } />
        <Route
          path="/produto/:id"
          render={ (props) => <ProductDetails { ...props } /> }
        />
        <Route path="/carrinho" component={ ShoopingCart } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
