import React from 'react';
import TopBar from '../cmps/TopBar';
import axios from 'axios';

import '../css/RegistroPage.scss';


class RegistroPage extends React.Component{

    constructor(){
		super();

		this.state = {
			"UsrUsr": "",
			"UsrNom": "",
			"UsrPwd": "",
            "UsrMail": "",
            "UsrTel": "",
            "UsrEst": "",
            "errorMessage": "",
            showOkPage: "none"
		}
	}

    onRegistroClick= e =>{
        //Realizamos la consulta al servidor
        let UsrUsr = this.state.UsrUsr;
        let UsrNom = this.state.UsrNom;
        let UsrPwd = this.state.UsrPwd;
        let UsrMail = this.state.UsrMail;
        let UsrTel = this.state.UsrTel;
        let UsrEst = this.state.UsrEst;

        axios.defaults.withCredentials = true;
        axios.post("https://api.movil2.cointla.com/api/usuarios/crear.php", {
			UsrUsr : UsrUsr,
            UsrNom : UsrNom,
            UsrPwd : UsrPwd,
            UsrMail : UsrMail,
            UsrTel : UsrTel,
            UsrEst : UsrEst

		}).then(res => {
			let jres = res.data;

			if(jres.status === "OK"){
                this.setState({errorMessage: jres.payload.message});
				this.setState({
                    showOkPage: "block"
                })
			}else{
				this.setState({errorMessage: jres.payload.message});
                this.setState({
                    showOkPage: "none"
                })
			}
		});
    }

    onLoginBack = e =>{
        window.location = "/";
    }

    render(){
        return (
            <div className="RegistroPage">
                <TopBar backTo="/"></TopBar>

                <div className="OkPage" style={{display: this.state.showOkPage}}>
					<div className="Container">
						<h3>{this.state.errorMessage}</h3>
						<div className="BackButton" onClick={this.onLoginBack}>Volver a inicio</div>
					</div>
				</div>

                <div className="LogoContainer">
					<image className="Logo"></image>
				</div>
				<div className="FormContainer">
					<div className="RegisForm">
						<div className="FieldContainer">
							<input type="text" id="UsrUsr" value={this.state.UsrUsr} onChange={e => this.setState({UsrUsr: e.target.value})} placeholder="Nombre de usuario" autoComplete="new-password"></input>
						</div>
                        <div className="FieldContainer">
							<input type="text" id="UsrNom" value={this.state.UsrNom} onChange={e => this.setState({UsrNom: e.target.value})} placeholder="Nombre completo" autoComplete="new-password"></input>
						</div>
						<div className="FieldContainer">
							<input type="password" id="UsrPwd" value={this.state.UsrPwd} onChange={e => this.setState({UsrPwd: e.target.value})} placeholder="Contraseña" autoComplete="new-password"></input>
						</div>
                        <div className="FieldContainer">
							<input type="text" id="UsrMail" value={this.state.UsrMail} onChange={e => this.setState({UsrMail: e.target.value})} placeholder="Correo" autoComplete="new-password"></input>
						</div>
                        <div className="FieldContainer">
							<input type="text" id="UsrTel" value={this.state.UsrTel} onChange={e => this.setState({UsrTel: e.target.value})} placeholder="Telefono" autoComplete="new-password"></input>
						</div>
                        <div className="Selecter">
	                        <select id="UsrEst" name="Estados" value={this.state.UsrEst} onChange={e => this.setState({UsrEst: e.target.value})}>
                                <option value="ACT" selected>Activo</option>
  	                            <option value="DESC">Inactivo</option>
                            </select>
                        </div>
						<div className="ErrorMessage">{this.state.errorMessage}</div>
						<div className="FieldContainer">
							<div onClick={this.onRegistroClick} className="Button">Registrarse</div>
						</div>
					</div>
				</div>
            </div>
            
        );
    }

}

export default RegistroPage;