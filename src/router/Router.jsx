import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from '../App';
import { Header } from '../components';
import { Product } from '../pages';

const Router = () => {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/shirts/:id" element={<Product />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router