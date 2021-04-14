import API from "./API.js";
import {dark} from "./funciones.js";
const nombrePais = localStorage.getItem("nombre");
const darkMode = document.querySelector(".header__mode");
const URL = `https://restcountries.eu/rest/v2/name/${nombrePais}?fullText=true`; 
const api = new API(URL);
api.masInformacionApi();


darkMode.addEventListener("click",dark);