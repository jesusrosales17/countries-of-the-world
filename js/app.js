import {alerta, dark, detener, limpiarHTML, mostrarRegiones, optenerPais, optenerRegion} from "./funciones.js";
import API from "./API.js";


const region = document.querySelector(".main__region");
const optionRegion = document.querySelectorAll(".region");
const pais =    document.querySelector((".main__inputSearch input"));
const darkMode = document.querySelector(".header__mode");
export const contenedorPaises = document.querySelector(".paises");

if(localStorage.getItem("dark") === "true"){
    dark();
}

if(document.querySelector(".index")){
    let name;
    let url = ``;
    let api;
    document.addEventListener("DOMContentLoaded", ()=> {
        url = "https://restcountries.eu/rest/v2/all";
        api = new API(url);
        api.conectarAPI();
    });
    
    
    //instanciamos la clase API
    //optenemo el nombre del pais y lo agregamos a la url
    pais.addEventListener("change",(e) => {
        name = optenerPais(e).trim();
        if(name.trim() === ""){
            limpiarHTML();
            alerta("write the name of a country","error");
            return;
        }
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
    
    //modo dark
    darkMode.addEventListener("click",dark);


}