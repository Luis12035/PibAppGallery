import React from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import './css/App.scss';
import LoginPage from './cmps/LoginPage';
import ColeccionesPage from './cmps/ColeccionesPage';
import ColeccionPage from './cmps/ColeccionPage';
import RegistroPage from './cmps/RegistroPage';

class App extends React.Component{

	render(){
		return (
			<div className="App" id="picme-app">
				<Router>
					<Switch>
						<Route path="/" exact><LoginPage /></Route>
						<Route path="/colecciones" exact><ColeccionesPage /></Route>
						<Route path="/coleccion/:ColCod" exact><ColeccionPage /></Route>
						<Route path="/registro" exact><RegistroPage /></Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;