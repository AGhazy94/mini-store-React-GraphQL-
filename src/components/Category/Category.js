import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import classes from './Category.module.css';
import { getProductsQuery } from '../../graphql/queries';
import addToCart from '../../assets/images/addToCard.png';
import { Link } from 'react-router-dom';
import StoreContext from '../../Context/context';

class Category extends Component {
	static contextType = StoreContext;

	displayProducts() {
		const data = this.props.data;
		const { currentCurrency, selectedProduct, id, addToCartHandler } =
			this.context;

		if (data.loading) {
			return (
				<div>
					<h1>LOADING...</h1>
				</div>
			);
		} else {
			return data.category.products.map((product) => {
				return (
					<div
						key={product.id}
						className={classes['product']}
						onClick={() => {
							selectedProduct(product.id);
						}}
					>
						<div className={classes['img__wrapper']}>
							<Link to={`/${id}`} className={classes['link']}>
								<img
									className={classes['product__img']}
									src={product.gallery[0]}
									alt={product.name}
								/>

								<div
									className={`${
										!product.inStock
											? classes['product__outOfStock__wrapper']
											: classes['hidden']
									}`}
								>
									<p
										className={`${
											!product.inStock
												? classes['product__outOfStock']
												: classes['hidden']
										}`}
									>
										Out of Stock
									</p>
								</div>
							</Link>
							<span
								className={`${
									product.inStock ? classes['addToCartBtn'] : classes['hidden']
								}`}
								onClick={() => addToCartHandler(product, product.id)}
							>
								<img
									src={addToCart}
									className={`${
										product.inStock ? classes['addToCart'] : classes['hidden']
									}`}
									alt="add to cart"
								/>
							</span>
						</div>

						<Link to={`/${id}`} className={classes['link']}>
							<div className={classes['product__info']}>
								<p className={classes['product__name']}>{product.name}</p>
								{currentCurrency === '$' && (
									<span className={classes['product__price']}>
										{product.prices[0].currency.symbol}
										{product.prices[0].amount}
									</span>
								)}
								{currentCurrency === '£' && (
									<span className={classes['product__price']}>
										{product.prices[1].currency.symbol}
										{product.prices[1].amount}
									</span>
								)}
								{currentCurrency === 'A$' && (
									<span className={classes['product__price']}>
										{product.prices[2].currency.symbol}
										{product.prices[2].amount}
									</span>
								)}
								{currentCurrency === '¥' && (
									<span className={classes['product__price']}>
										{product.prices[3].currency.symbol}
										{product.prices[3].amount}
									</span>
								)}
								{currentCurrency === '₽' && (
									<span className={classes['product__price']}>
										{product.prices[4].currency.symbol}
										{product.prices[4].amount}
									</span>
								)}
								{!currentCurrency && (
									<span className={classes['product__price']}>
										{product.prices[0].currency.symbol}
										{product.prices[0].amount}
									</span>
								)}
							</div>
						</Link>
					</div>
				);
			});
		}
	}

	render() {
		return (
			<>
				<h5 className={classes['heading']}>Category name</h5>
				<div className={classes['products__wrapper']}>
					{this.displayProducts()}
				</div>
			</>
		);
	}
}

export default graphql(getProductsQuery)(Category);
