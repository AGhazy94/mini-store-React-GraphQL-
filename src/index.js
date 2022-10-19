import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from './Context/context';

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<StoreProvider>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</StoreProvider>
	</Router>
);
