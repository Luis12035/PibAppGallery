import React from 'react';
import TopBar from './cmps/TopBar';
import axios from 'axios';

import './css/App.scss';

class App extends React.Component{

  constructor(){
    super();

    this.state = {
      "UsrUsr": "",
      "UsrPwd": "",
      "errorMessage": ""
    }
  }

  onLoginClick = e =>{
    let UsrUsr = this.state.UsrUsr;
    let UsrPwd = this.state.UsrPwd;
    
    let data = {
      UsrUsr: UsrUsr,
      UsrPwd: UsrPwd
    }

    axios.defaults.withCredentials = true;

    axios.post("192.168.1.41/api/usuarios/login.php", data).then(res => {

      let jres = res.data;

      if(jres.status === "OK"){
        
      }else{
          this.state({errorMessage: jres.payload.message})
      }
      console.log(res.data);
    })
  }

      render(){
          return (
            <div className="App">
              <TopBar />

              <div className="LogoContainer">
                  <div className="Logo"></div>
              </div>
              
              <div className="FormContainer">
                  <div className="LoginForm">
                    <div className="FieldContainer">
                      <input type="text" id="UsrUsr" placeholder="Usuarios"></input>
                    </div>
                    <div className="FieldContainer">
                      <input type="password" id="UsrPwd" placeholder="Contraseña"></input>
                    </div>
                    <div className="FieldContainer">
                      <div className="Button">Acceder</div>
                    </div>

                    <div className="ErrorMessage">{this.state.errorMessage}</div>
                  </div>
              </div>
              
            </div>
          );
      }
}

export default App;