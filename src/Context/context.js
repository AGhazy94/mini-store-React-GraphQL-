import React, { Component } from 'react';

const StoreContext = React.createContext();

export class StoreProvider extends Component {
	state = {
		currentCurrency: '',
		id: '',
		cart: [],
		total: 0,
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
		this.totalPriceHandler();
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
		this.totalPriceHandler();
	};

	CurrencyChangeHandler = (e) => {
		this.setState({ currentCurrency: e.target.value });
	};

	selectedProduct = (productID) => {
		this.setState({ id: productID });
	};

	totalPriceHandler = () => {
		const { cart } = this.state;
		const price = cart.reduce((accum, current) => {
			return accum + current.prices[0].amount * current.quantity;
		}, 0);
		this.setState({ total: price });
	};

	render() {
		const { currentCurrency, id, cart, cartItemQuantity, total } = this.state;
		const {
			CurrencyChangeHandler,
			selectedProduct,
			addToCartHandler,
			onIncreasingCartItemQuantityHandler,
			onDecreasingCartItemQuantityHandler,
			totalPriceHandler,
		} = this;

		return (
			<StoreContext.Provider
				value={{
					currentCurrency,
					id,
					cart,
					cartItemQuantity,
					total,
					CurrencyChangeHandler,
					selectedProduct,
					addToCartHandler,
					onIncreasingCartItemQuantityHandler,
					onDecreasingCartItemQuantityHandler,
					totalPriceHandler,
				}}
			>
				{this.props.children}
			</StoreContext.Provider>
		);
	}
}

export default StoreContext;
