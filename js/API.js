import {alerta, masInformacion, mostrarPaises, } from "./funciones.js";
class API{
    constructor(url){
        this.url = url;
    } 
    //optenemos la infomacion del pais a mostrar en la seccion de mas informacion
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
   conectarAPI(){
        try {
            fetch(this.url)
            .then(respuesta => respuesta.json())
            .then(resultado => {
                //si el pais no se encuentra mandamo la alerta y detenemos la ejecucion del codigo
               if(resultado.status === 404){
                    alerta("Country not found, try another search term","error");
                    return;
                }
                //mostramos el resultado
                mostrarPaises(resultado);
            });
        } catch (error) {
            console.log(error);
        }
    }

}
export default API;
