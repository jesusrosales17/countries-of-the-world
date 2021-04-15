import {alerta, dark, limpiarHTML, mostrarRegiones, optenerPais, optenerRegion} from "./funciones.js";
import API from "./API.js";


const region = document.querySelector(".main__region");
const optionRegion = document.querySelectorAll(".region");
const pais =    document.querySelector((".main__inputSearch input"));
const darkMode = document.querySelector(".header__mode");
export const contenedorPaises = document.querySelector(".paises");

//modo dark
darkMode.addEventListener("click",dark);

//al iniciar si lo habiamos dejado en modo oscuro se volvera a poner

if(localStorage.getItem("dark") === "true"){
    dark();
}

//si estamos en el index ejecutamos el siguiente codigo para no causar interferencias con la pagina mas informacion
if(document.querySelector(".index")){
   
    let url = ``;
    let api;
    //a la hora de cargar el mostramos todos los paises
    document.addEventListener("DOMContentLoaded", ()=> {
        url = "https://restcountries.eu/rest/v2/all";
        api = new API(url);
        api.conectarAPI();
    });
    
    
    //optenemo el nombre del pais para buscarlo y mostrar su informacion 
    pais.addEventListener("change",(e) => {
        //agregamos el valor del input y eliminamos los espacion al inicio y al final
        const name = optenerPais(e).trim();
        if(name.trim() === ""){
            //si no escribio nada limpiamos el html , mandamos una alerta y detenemos la ejecucion del codigo
            limpiarHTML();
            alerta("write the name of a country","error");
            return;
        }
        //agregamos el nombre a la url y si habia algo antes lo eliminamos y mostramos el resultado
        const URL = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`; 
        const API2 = new API(URL);
        limpiarHTML();
        API2.conectarAPI();
    });
    
    //las opciones aparecen y desaparecen
    region.addEventListener("click", mostrarRegiones);
    
    //optener la region seleccionada
    
    optionRegion.forEach(region => {
        region.addEventListener("click", optenerRegion);
    })
    

}