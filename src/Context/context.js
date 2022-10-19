import React, { Component } from 'react';

const StoreContext = React.createContext();

export class StoreProvider extends Component {
	state = {
		currentCurrency: '',
		id: '',
		cart: [],
	};

	addToCartHandler = (product, id) => {
		const { cart } = this.state;
		const checkDuplication = cart.every((item) => item.id !== id);

		if (checkDuplication) {
			this.setState({
				cart: [...cart, { ...product, quantity: 1 }],
			});
		} else {
			alert('item already added');
		}
	};

	onIncreasingCartItemQuantityHandler = (id) => {
		const { cart } = this.state;

		cart.map((product) => {
			if (product.id === id) {
				return (product.quantity += 1);
			} else {
				return product;
			}
		});

		this.setState({ cart: cart });
	};

	onDecreasingCartItemQuantityHandler = (id) => {
		const { cart } = this.state;

		cart.map((product, index) => {
			if (product.id === id) {
				if (product.quantity <= 1) {
					return cart.splice(index, 1);
				} else {
					return (product.quantity -= 1);
				}
			} else {
				return product;
			}
		});

		this.setState({ cart: cart });
	};

	CurrencyChangeHandler = (e) => {
		this.setState({ currentCurrency: e.target.value });
	};

	selectedProduct = (productID) => {
		this.setState({ id: productID });
	};

	render() {
		const { currentCurrency, id, cart, cartItemQuantity } = this.state;
		const {
			CurrencyChangeHandler,
			selectedProduct,
			addToCartHandler,
			onIncreasingCartItemQuantityHandler,
			onDecreasingCartItemQuantityHandler,
		} = this;

		return (
			<StoreContext.Provider
				value={{
					currentCurrency,
					id,
					cart,
					cartItemQuantity,
					CurrencyChangeHandler,
					selectedProduct,
					addToCartHandler,
					onIncreasingCartItemQuantityHandler,
					onDecreasingCartItemQuantityHandler,
				}}
			>
				{this.props.children}
			</StoreContext.Provider>
		);
	}
}

export default StoreContext;
