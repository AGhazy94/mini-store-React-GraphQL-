import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/a-logo.png';
import cartIcon from '../../assets/images/Empty Cart.png';
import classes from './Header.module.css';
import { graphql } from '@apollo/client/react/hoc';
import { getCurrencies } from '../../graphql/queries';
import StoreContext from '../../Context/context';

class Header extends Component {
	static contextType = StoreContext;

	displayCurrencies = () => {
		const data = this.props.data;

		if (data.loading) {
			return <option>Loading..</option>;
		} else {
			return data.currencies.map((currency) => {
				return (
					<option key={currency.label} value={currency.symbol}>
						{currency.symbol}
					</option>
				);
			});
		}
	};

	render() {
		const { CurrencyChangeHandler, cart } = this.context;
		return (
			<header className={classes['header']}>
				<nav className={classes['header__nav']}>
					<ul className={classes['header__nav__list']}>
						<li className={`${classes['header__nav__item']}`}>
							<Link
								className={`${classes['header__nav__link']} ${
									classes[`active`]
								}`}
								to="/"
							>
								Home
							</Link>
						</li>
						<li className={`${classes['header__nav__item']}`}>
							<Link className={`${classes['header__nav__link']}`} to="/clothes">
								Clothes
							</Link>
						</li>
						<li className={`${classes['header__nav__item']}`}>
							<Link className={`${classes['header__nav__link']}`} to="/tech">
								Tech
							</Link>
						</li>
					</ul>
				</nav>
				<Link to="/" className={classes['header__logo']}>
					<img src={logo} alt="logo" className={classes['header__logo__img']} />
				</Link>
				<div className={classes['header__cart']}>
					<select
						className={classes['header__cart__currency']}
						onChange={CurrencyChangeHandler}
					>
						{this.displayCurrencies()}
					</select>
					<Link to="/cart">
						<img
							src={cartIcon}
							alt="cart"
							className={classes['header__cart__cart']}
						/>
						<div className={classes['header__cart__count']}>
							<span className={classes['header__cart__number']}>
								{cart.length}
							</span>
						</div>
					</Link>
				</div>
			</header>
		);
	}
}

export default graphql(getCurrencies)(Header);
