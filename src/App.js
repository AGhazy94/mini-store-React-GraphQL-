import React, { Component } from 'react';
import Header from './components/Header/Header';
import Sections from './Sections';

class App extends Component {

	render() {
		return (
			<>
				<Header />
				<Sections />
			</>
		);
	}
}

export default App;
