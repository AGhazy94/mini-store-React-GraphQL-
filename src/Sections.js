import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './components/Product Details/ProductDetails';
import Category from './components/Category/Category';
import Tech from './components/Category/Tech';
import Clothes from './components/Category/Clothes';
import StoreContext from './Context/context';
import Cart from './components/Category/Cart';

export default class Sections extends Component {
	static contextType = StoreContext;


	render() {
		return (
			<Routes>
				<Route path="/" element={<Category />} exact />
				<Route path="/clothes" element={<Clothes />} />
				<Route path="/tech" element={<Tech />} />
				<Route path="/:id" element={<ProductDetails id={this.context.id}/>} />
				<Route path="/cart" element={<Cart/>} />
			</Routes>
		);
	}
}
