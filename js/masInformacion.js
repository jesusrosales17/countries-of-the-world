import API from "./API.js";
import {dark} from "./funciones.js";
//optenemos el nommbre del pais
const nombrePais = localStorage.getItem("nombre");
const darkMode = document.querySelector(".header__mode");
//agregamos el nombre del pais a la url para conectar con la api y optener toda su información
const URL = `https://restcountries.eu/rest/v2/name/${nombrePais}?fullText=true`; 
const api = new API(URL);
api.masInformacionApi();

//habilitamos la opcion para poner y quetar el modo dark
darkMode.addEventListener("click",dark);