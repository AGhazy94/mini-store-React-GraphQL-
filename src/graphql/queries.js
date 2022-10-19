import { gql } from '@apollo/client';

const getProductsQuery = gql`
	query {
		category {
			products {
				id
			name
			gallery
			description
			category
			inStock
			attributes {
				id
				name
				type
				items {
					displayValue
					value
					id
				}
			}
			prices {
				currency {
					label
					symbol
				}
				amount
			}
			brand
			}
		}
	}
`;

const getCurrencies = gql`
	query {
		currencies {
			label
			symbol
		}
	}
`;

const getProductDetails = gql`
	query ($id: String!) {
		product(id: $id) {
			id
			name
			gallery
			description
			category
			inStock
			attributes {
				id
				name
				type
				items {
					displayValue
					value
					id
				}
			}
			prices {
				currency {
					label
					symbol
				}
				amount
			}
			brand
		}
	}
`;

export { getProductsQuery, getCurrencies, getProductDetails };
