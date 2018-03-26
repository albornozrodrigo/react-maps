import React, { Component } from 'react';
import Search from '../search/search';
import './app.scss';

class App extends Component {
	render() {
		return (
			<div className="app">
				<h1>Consulta de endereço</h1>
				<Search/>
			</div>
		);
	}
}

export default App;
