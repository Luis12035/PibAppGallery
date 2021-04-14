import React from 'react';
import TopBar from '../cmps/TopBar';
import axios from 'axios';
import {useParams} from 'react-router-dom';

import '../css/ColeccionPage.scss';

class ColeccionPage extends React.Component{
    
    constructor(){
        super();

        this.state = {
            col_fotos: "",
            col_name: ""
        }
    }

    componentDidMount(){
        this.loadData(this.state.ColCod);
    }

    render(){
        return(
            <div className="ColeccionPage">
                <TopBar />
                <h2 className="Tittle">{this.state.col_name}</h2>
                {this.state.col_fotos}
            </div>
        );
    }

    loadData = ColCod =>{
        // Realizo consulta al servidor...
        axios.defaults.withCredentials = true;
        axios.post("https://api.movil2.cointla.com/api/colecciones/obtener.php", {
            ColCod: ColCod
        }).then(res => {
            let jres = res.data;

            if(jres.status === "OK"){
                let col_fotos = [];
                let col_name = jres.payload.ColDsc;

                //Interamos todas las fotos para armas los divs
                for(const key in jres.payload.fotos) {
                    if(Object.hasOwnProperty.call(jres.payload.fotos, key)) {
                        const foto = jres.payload.fotos[key];
                        let foto_url = "https://api.movil2.cointla.com/data"+foto.FotPath;
                        col_fotos.push(
                            <div className="FItem" key={foto.FotCod} id={foto.FotCod} style={{background: "url("+foto.url+")"}}></div>
                        );
                    }
                }

                //Actualizar el state del componente para mostrar la coleccion y fotos
                this.setState({
                    col_fotos: col_fotos,
                    col_name: col_name
                });

            }else{
                this.setState({errorMessage: jres.payload.message});
            }
        });
    }

}

let _ColeccionPage = function(){
    let {ColCod} = useParams();
    return(<ColeccionPage ColCod={ColCod}></ColeccionPage>)
}

export default _ColeccionPage;