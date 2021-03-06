import API from "./API.js";
import {contenedorPaises} from "./app.js";

//funcion para el modo oscuro

export const alerta = (mensaje,tipo) => {
    //creamos la alerta
    const divAlerta = document.createElement("DIV");
    //le agregamos el mensaje
    divAlerta.textContent = mensaje;

    if(tipo === "error"){
        if(localStorage.getItem("dark") === "true"){
            divAlerta.classList.add("alerta-dark");
        }
        divAlerta.classList.add("error");
    }
   contenedorPaises.appendChild(divAlerta);

   //eliminamos la alerta pasando 3 segundos
   setTimeout(()=>{
       divAlerta.remove();
   },3000);
}


export const mostrarRegiones = () => {
    const opciones = document.querySelector(".main__region-option");
    const img = document.querySelector(".arrow-region");
    
    if(opciones.classList.contains("activo")){
        opciones.classList.remove("activo");
        opciones.style.display = "none";
        img.style.transform = "rotate(360deg)";
        return;
    }   
    opciones.style.display = "block";
    img.style.transform = "rotate(180deg)";
    opciones.classList.add("activo");
}

export const optenerPais = (e) =>{

    return e.target.value;
}


export const mostrarPaises = (paises) => {
        //creamos un fragmento
        const contenedor = document.createDocumentFragment();

       
        paises.forEach(pais => {
        
        // hacemos destrocturing a pais
        const {flag, name, population, region, capital} = pais;
         //DOM SCRIPTING

        //creamos un contenedor para los paises
        const contenedorPais = document.createElement("DIV");
        contenedorPais.classList.add("contenedorPais");

        //si existe dark en el localStorage agregamos la clase element-dark a el contenedor
        if(localStorage.getItem("dark") === "true"){
            contenedorPais.classList.add("element-dark");
        }
        
        //si solo hay un elemento le agregamos la clase unico y si no se la quitamos
        if(paises.length === 1){
            contenedorPaises.classList.add("unico")
        }else{
            contenedorPaises.classList.remove("unico")
        }

        const divImagen = document.createElement("DIV");
        //agregamos el nombre

        const nombrePais = document.createElement("h2");
        nombrePais.textContent = name;
        nombrePais.classList.add("nombrePais");
        //agregamos la imagen
        const imagen = document.createElement("IMG");
        imagen.src = flag;
        imagen.alt = `${name} flag`;
        imagen.loading = "lazy";
        divImagen.classList.add("imagenDiv");
        divImagen.appendChild(imagen);

        const divPopulation = document.createElement("p");
        divPopulation.classList.add("populationDiv");
        //agregamos la cantidad de abitantes

        const spanPopulation = document.createElement("span");
        spanPopulation.textContent = population;
        divPopulation.textContent = `Population:`;
        divPopulation.appendChild(spanPopulation);
        
        //agregamos la region

        const divRegion = document.createElement("p");
        divRegion.classList.add("regionDiv");

        const spanRegion = document.createElement("span");
        spanRegion.textContent = region;
        divRegion.textContent = `Region:`;
        divRegion.appendChild(spanRegion);

        //agregamos la capital 

        const divCapital= document.createElement("p");
        divCapital.classList.add("capitalDiv");

        const spanCapital= document.createElement("span");
        spanCapital.textContent = capital;
        divCapital.textContent = `Capital:`;
        divCapital.appendChild(spanCapital);

        contenedorPais.appendChild(divImagen);
        contenedorPais.appendChild(nombrePais);
        contenedorPais.appendChild(divPopulation);
        contenedorPais.appendChild(divRegion);
        contenedorPais.appendChild(divCapital);
        
        //agregamos el contenedor del pais al fragmento
        contenedor.appendChild(contenedorPais);
        //al aser click guardamos el nombre del pais en el localStorage y redireccionamos a la pagina de mas informacion
        contenedorPais.addEventListener("click",()=>{
             localStorage.setItem("nombre",name);
             window.location = "mas_informacion.html";
         });
    });
    //agregamos el fragmento al dom
    contenedorPaises.appendChild(contenedor);
}

export const limpiarHTML = () =>{ 
    while(contenedorPaises.firstChild){
        contenedorPaises.removeChild(contenedorPaises.firstChild);
    }
}
export const optenerRegion = (e) =>{
    const region = e.target.dataset.region;
    const url = `https://restcountries.eu/rest/v2/region/${region}`;   
    const api = new API(url); 
    limpiarHTML();
    api.conectarAPI();
}

export const masInformacion = (pais) =>{
    if(pais.length === 1){      
        var {flag, name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders} = pais[0];
    }else{
        var {flag, name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders} = pais;
    }
    const mas_informacion__img = document.querySelector(".mas_informacion__container-img img");
    const nombreNativo = document.querySelector(".nativeName span");
    const nombrePais = document.querySelector(".nombrePais");
    const populationDiv= document.querySelector(".populationDiv span");
    const regionDiv = document.querySelector(".regionDiv span");
    const subRegion = document.querySelector(".supRegion span");
    const capitalDiv = document.querySelector(".capitalDiv span");
    const top_lavel = document.querySelector(".top-lavel span");
    const currencie = document.querySelector(".currencies span");
    const languajes = document.querySelector(".languajes span");
    const border_countries = document.querySelector(".border-countries");
    
    
    //agregamos la image
   mas_informacion__img.src = flag;
   mas_informacion__img.alt = `bandera de ${name}`

   //agregamos el nombre
   nombrePais.textContent = name;
   
   //agregamos el nombre nativo
    nombreNativo.textContent = nativeName;  
    
    //ponemos la populacion 
    populationDiv.textContent = population;

    //ponemos la region
    regionDiv.textContent = region;

    //agregamos la subRegion
    subRegion.textContent = subregion;

    //agregamos la capital
    capitalDiv.textContent = capital;

    //agregamos el top level domain
    top_lavel.textContent = topLevelDomain[0];

    //agregamos el currencies
    currencie.textContent = currencies[0].name;

    //agregamos los lenguajes
    let listaLenguajes = []
    languages.forEach(lenguaje => listaLenguajes = [...listaLenguajes,lenguaje.name]);
    languajes.textContent = listaLenguajes.join(", ");

    //agregamos los border countries
    // const parrafo = document.createElement("P");
    if(borders.length === 0){
        const parrafo = document.createElement("P");
        parrafo.textContent = "none";
        parrafo.classList.add("border-countries__pais");
        border_countries.appendChild(parrafo);
    }else{
        borders.forEach((pais,i,border) => {
            // if(border.length === 0){
            //     parrafo.textContent = "none";
            //     border_countries.appendChild(parrafo);
            // }
            const parrafo = document.createElement("P");
            parrafo.textContent= pais;
            parrafo.classList.add("border-countries__pais");
            border_countries.appendChild(parrafo);
            parrafo.onclick = () =>{
                const name = pais;
                // const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`; 
                // const api = new API(url);
                // console.log(api);
                localStorage.setItem("nombre",name);
                window.location.reload();
            }
        });
    }
}

export function dark(){
    const body = document.querySelector("body");
    const header = document.querySelector(".header");
    const moon = document.querySelector(".header__mode-icon");
    const contenedorPais = document.querySelectorAll(".contenedorPais");
    const input = document.querySelector("input");
    const select = document.querySelector(".main__region-select");
    const option = document.querySelector(".main__region-option");
    const arrow = document.querySelector(".arrow-region");
    const icon = document.querySelector(".icon");
    const masInfo = document.querySelector(".mas_informacion__container");
    const btn_regresar = document.querySelector(".mas_informacion__btn-regresar");
    const icon_btn_regresar = document.querySelector(".mas_informacion__btn-regresar a img");

    //al dar click si ya existe la clase se quita y si no se pone
    header.classList.toggle("element-dark");
    contenedorPais.forEach(pais => {
        pais.classList.toggle("element-dark");
    });

    // si estamos en el index cambiamos la direccion del icono y agregamos unas clases
    if(document.querySelector(".index")){
        icon.src = "icons/search-dark.svg";
        arrow.src = "icons/arrow-region-dark.svg"
        select.classList.toggle("element-dark");
        option.classList.toggle("element-dark");
        input.classList.toggle("element-dark");
    }else{
        icon_btn_regresar.src = "icons/arrow-dark.svg";
        masInfo.classList.toggle("element-dark");
        btn_regresar.classList.toggle("element-dark");
    }

    // si existe la clase body-dark removemos dark del localStorage, cambiamos las direcciones de los iconos,etc
    if(document.querySelector(".body-dark")){
        //agregamos dark al localStorage
        localStorage.removeItem('dark');
        body.classList.remove("body-dark")

        moon.src = "icons/moon-light.svg"

        //cambiamos la direccion de los iconos dependiendo de la pagina
        if(document.querySelector(".index")){
            icon.src = "icons/search.svg";
            arrow.src = "icons/arrow-region.svg"

        }else{
            icon_btn_regresar.src = "icons/arrow.svg";
        }

        return;
    }
    
    //agregamos la clase body-dark
    body.classList.add("body-dark");
    moon.src = "icons/moon-dark.svg";



    localStorage.setItem("dark","true"); 
}