import {alerta, masInformacion, mostrarPaises, } from "./funciones.js";
class API{
    constructor(url){
        this.url = url;
    } 
    masInformacionApi(){
        try {
            fetch(this.url)
            .then(respuesta => respuesta.json())
            .then(resultado => {
                masInformacion(resultado);
            });
        } catch (error) {
            console.log(error)
        }
      
    }
   async conectarAPI(){
        try {
            fetch(this.url)
            .then(respuesta => respuesta.json())
            .then(resultado => {
               if(resultado.status === 404){
                    alerta("Pais no encontrado","error");
                    return;
                }
                mostrarPaises(resultado);
            });
        } catch (error) {
            console.log(error);
        }
    }

}
export default API;
