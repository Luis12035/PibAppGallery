import React from 'react';
import TopBar from '../cmps/TopBar';
import axios from 'axios';

import '../css/ColeccionesPage.scss';

class ColeccionesPage extends React.Component{

	constructor(){
		super();

		this.state = {
			cols_divs: ""
		}
	}
	
	componentDidMount(){
		this.loadData();
	}

	onColClick = e =>{
		let ColCod = e.target.id;

		window.location = "#/coleccion/"+ColCod;
	}

	render(){
		return (
			<div className="ColeccionesPage">
				<TopBar />
				<h2 className="Title">Colecciones</h2>
				{this.state.cols_divs}
			</div>
		);
	}

	loadData = () =>{
		// Realizo consulta al servidor...
		axios.defaults.withCredentials = true;
		axios.post("https://api.movil2.cointla.com/api/colecciones/listado.php", {}).then(res => {
			let jres = res.data;

			if(jres.status === "OK"){
				let cols_divs = [];
				
				// Iteramos todas las colecciones para armar los divs
				for (const key in jres.payload) {
					if (Object.hasOwnProperty.call(jres.payload, key)) {
						const coleccion = jres.payload[key];
						cols_divs.push(
							<div className="CItem" key={coleccion.ColCod} id={coleccion.ColCod} onClick={this.onColClick}>
								<div className="Desc">{coleccion.ColDsc}</div>
								<div className="Icon"><i className="material-icons">arrow_forward_ios</i></div>
							</div>
						);
					}
				}

				// Actualizar el State del Componente para mostrar las colecciones
				this.setState({
					cols_divs: cols_divs
				});
			}else{
				this.setState({errorMessage: jres.payload.message});
			}
		});
	}


}

export default ColeccionesPage;