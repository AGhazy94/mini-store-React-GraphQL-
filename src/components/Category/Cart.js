import React, { Component } from 'react';
import classes from './Cart.module.css';
import StoreContext from '../../Context/context';

export default class Cart extends Component {
	static contextType = StoreContext;

	state = {
		backgroundImg: { imgIndex: 0, id: '' },
	};

	displayCart = () => {
		const {
			currentCurrency,
			cart,
			onIncreasingCartItemQuantityHandler,
			onDecreasingCartItemQuantityHandler,
		} = this.context;

		const { backgroundImg } = this.state;

		return cart.map((product, index) => {
			const photoChangeHandler =
				backgroundImg.id === product.id
					? {
							backgroundImage: `url(${
								product.gallery[backgroundImg.imgIndex]
							})`,
					  }
					: { backgroundImage: `url(${product.gallery[0]})` };

			const goToNextImgHandler = (id) => {
				if (product.id === id) {
					this.setState({
						backgroundImg: { imgIndex: backgroundImg.imgIndex + 1, id: id },
					});

					if (backgroundImg.imgIndex === product.gallery.length - 1) {
						this.setState({ backgroundImg: { ...backgroundImg, imgIndex: 0 } });
					}
				}
			};

			const goToPrevImgHandler = () => {
				return;
			};

			return (
				<div className={classes['cart']} key={index}>
					<div className={classes['cart__info']}>
						<div className={classes['cart__info__name']}>
							<h2 className={classes['cart__info__name--name']}>
								{product.name}
							</h2>
							<h4 className={classes['cart__info__name--brand']}>
								{product.brand}
							</h4>
						</div>
						<div>
							<p className={classes['cart__info--price']}>Price:</p>
							{currentCurrency === '$' && (
								<span className={classes['cart__info--price--value']}>
									{product.prices[0].currency.symbol}
									{product.prices[0].amount}
								</span>
							)}
							{currentCurrency === '£' && (
								<span className={classes['cart__info--price--value']}>
									{product.prices[1].currency.symbol}
									{product.prices[1].amount}
								</span>
							)}
							{currentCurrency === 'A$' && (
								<span className={classes['cart__info--price--value']}>
									{product.prices[2].currency.symbol}
									{product.prices[2].amount}
								</span>
							)}
							{currentCurrency === '¥' && (
								<span className={classes['cart__info--price--value']}>
									{product.prices[3].currency.symbol}
									{product.prices[3].amount}
								</span>
							)}
							{currentCurrency === '₽' && (
								<span className={classes['cart__info--price--value']}>
									{product.prices[4].currency.symbol}
									{product.prices[4].amount}
								</span>
							)}
							{!currentCurrency && (
								<span className={classes['cart__info--price--value']}>
									{product.prices[0].currency.symbol}
									{product.prices[0].amount}
								</span>
							)}
						</div>
						<div className={classes['cart__attributes']}>
							{product.attributes.map((attribute) => {
								return (
									<div
										key={attribute.id}
										className={classes['cart__attributes__wrapper']}
									>
										<p className={classes['cart__attributes__wrapper--name']}>
											{attribute.name}:
										</p>
										<div
											className={classes['cart__attributes__wrapper__items']}
										>
											{attribute.items.map((item) => {
												return (
													<span
														key={item.id}
														style={
															attribute.type === 'swatch'
																? {
																		backgroundColor: item.value,
																  }
																: {}
														}
														className={
															classes['cart__attributes__wrapper__items--value']
														}
													>
														{attribute.type === 'text' && item.displayValue}
													</span>
												);
											})}
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className={classes['cart__imgsWrapper']}>
						<div className={classes['cart__quantity']}>
							<button
								className={classes['cart__quantity--plus']}
								onClick={() => onIncreasingCartItemQuantityHandler(product.id)}
							>
								+
							</button>
							<span>{product.quantity}</span>
							<button
								className={classes['cart__quantity--minus']}
								onClick={() => onDecreasingCartItemQuantityHandler(product.id)}
							>
								-
							</button>
						</div>
						<div className={classes['cart__imgsWrapper--slider__wrapper']}>
							<button
								onClick={() => goToPrevImgHandler(product.id)}
								className={classes['cart__imgsWrapper--slider__arrowLeft']}
							>
								&lt;
							</button>
							<button
								onClick={() => goToNextImgHandler(product.id)}
								className={classes['cart__imgsWrapper--slider__arrowRight']}
							>
								&gt;
							</button>
							<div
								className={classes['cart__imgsWrapper--slider']}
								style={photoChangeHandler}
							></div>
						</div>
					</div>
				</div>
			);
		});
	};

	render() {
		return (
			<>
				<h1 className={classes['heading']}>CART</h1>
				{this.displayCart()}
			</>
		);
	}
}
