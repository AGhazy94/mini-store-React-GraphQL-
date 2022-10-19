import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getProductDetails } from '../../graphql/queries';
import StoreContext from '../../Context/context';
import classes from './ProductDetails.module.css';

class ProductDetails extends Component {
	static contextType = StoreContext;

	state = {
		imgSrc: null,
		selectedAtt: [],
	};

	onSelectingAttributeHandler = (item) => {
		console.log(item.value)
	}

	displayProductDetails = () => {
		const { product, loading } = this.props.data;
		const { currentCurrency, addToCartHandler } = this.context;

		if (loading) {
			return <h1>Loading...</h1>;
		} else {
			const renderDescription = () => {
				return { __html: product.description };
			};

			const imgDisplayHandler = (e) => {
				this.setState({ imgSrc: e.target.currentSrc });
			};

			console.log(product)
			return (
				<main className={classes['productDetails']}>
					<div className={classes['productDetails__imgsWrapper']}>
						<div className={classes['productDetails__imgsWrapper--small']}>
							{product.gallery.map((img) => {
								return (
									<img
										key={img}
										src={img}
										alt={product.name}
										className={classes['productDetails__imgsWrapper--img']}
										onClick={imgDisplayHandler}
									/>
								);
							})}
						</div>

						<div className={classes['parent']}>
							<img
								src={
									!this.state.imgSrc ? product.gallery[0] : this.state.imgSrc
								}
								alt={product.name}
								className={classes['productDetails__imgsWrapper--img--main']}
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
						</div>
					</div>
					<div className={classes['productDetails__info']}>
						<div className={classes['productDetails__info__name']}>
							<h2 className={classes['productDetails__info__name--name']}>
								{product.name}
							</h2>
							<h4 className={classes['productDetails__info__name--brand']}>
								{product.brand}
							</h4>
						</div>
						<div className={classes['productDetails__attributes']}>
							{product.attributes.map((attribute) => {
								return (
									<div
										key={attribute.id}
										className={classes['productDetails__attributes__wrapper']}
									>
										<p
											className={
												classes['productDetails__attributes__wrapper--name']
											}
										>
											{attribute.name}:
										</p>
										<div
											className={
												classes['productDetails__attributes__wrapper__items']
											}
										>
											{attribute.items.map((item) => {
												return (
													<span
													onClick={() => {this.onSelectingAttributeHandler(item)}}
														key={item.id}
														style={
															attribute.type === 'swatch'
																? {
																		backgroundColor: item.value,
																  }
																: {}
														}
														className={
															classes[
																'productDetails__attributes__wrapper__items--value'
															]
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
						<div>
							<p className={classes['productDetails__info--price']}>Price:</p>
							{currentCurrency === '$' && (
								<span className={classes['productDetails__info--price--value']}>
									{product.prices[0].currency.symbol}
									{product.prices[0].amount}
								</span>
							)}
							{currentCurrency === '£' && (
								<span className={classes['productDetails__info--price--value']}>
									{product.prices[1].currency.symbol}
									{product.prices[1].amount}
								</span>
							)}
							{currentCurrency === 'A$' && (
								<span className={classes['productDetails__info--price--value']}>
									{product.prices[2].currency.symbol}
									{product.prices[2].amount}
								</span>
							)}
							{currentCurrency === '¥' && (
								<span className={classes['productDetails__info--price--value']}>
									{product.prices[3].currency.symbol}
									{product.prices[3].amount}
								</span>
							)}
							{currentCurrency === '₽' && (
								<span className={classes['productDetails__info--price--value']}>
									{product.prices[4].currency.symbol}
									{product.prices[4].amount}
								</span>
							)}
							{!currentCurrency && (
								<span className={classes['productDetails__info--price--value']}>
									{product.prices[0].currency.symbol}
									{product.prices[0].amount}
								</span>
							)}
						</div>
						{!product.inStock ? (
							<div className={`${classes['productDetails__info__outOfStock']}`}>
								Out of Stock
							</div>
						) : (
							<div
								className={classes['productDetails__info__AddToCart']}
								onClick={() => {
									addToCartHandler(product);
								}}
							>
								Add to Cart
							</div>
						)}
						<p
							className={classes['productDetails__info__description']}
							dangerouslySetInnerHTML={renderDescription()}
						/>
					</div>
				</main>
			);
		}
	};

	render() {
		return <>{this.displayProductDetails()}</>;
	}
}
export default graphql(getProductDetails, {
	options: (props) => {
		return {
			variables: {
				id: props.id,
			},
		};
	},
})(ProductDetails);
