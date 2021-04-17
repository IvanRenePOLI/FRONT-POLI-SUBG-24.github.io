
function LoadFunFacts() {
    let arrayUrlServices = [
        "https://rickandmortyapi.com/api/character",
        "https://rickandmortyapi.com/api/location",
        "https://rickandmortyapi.com/api/episode"
    ];

    // Este intervalo modificará el texto de la sección ¿SABIAS QUÉ...? cada 10 segundos, trayendo un dato al azar de los diferentes servicios del API (Cordialmente, Ivan Rene Monroy)
    setInterval(function () {
        //Solo realizará la función si existe el contenedor destino 
        if (document.getElementById("CuriosidadText") !== null) {
            //Traigo un dato random de el arreglo que fue creado al principio del script
            var randomURL = arrayUrlServices[Math.floor(Math.random() * arrayUrlServices.length)]
            let maxLenght = 0;
            //Según la URL defino el dato mayor de cada servicio que nos proporciona el API
            switch (randomURL) {
                case "https://rickandmortyapi.com/api/character":
                    //Ejemplo: En el API solo hay creados 670 personajes (está quemado ya que el API no proporciona un servicio de guardado, estos son los datos que siempre van a existir) (Cordialmente, Ivan Rene Monroy)
                    maxLenght = 670;
                    break;
                case "https://rickandmortyapi.com/api/location":
                    maxLenght = 107;
                    break;
                case "https://rickandmortyapi.com/api/episode":
                    maxLenght = 40;
                    break;
            }
            //Depende de la URL realizo el fetch de la url enviando como parametro un numero random, menor a maxLenght(cantidad máxima de registros) + 1 para que no llame el 0 (Cordialmente, Ivan Rene Monroy)
            fetch(randomURL + "/" + (Math.floor(Math.random() * maxLenght) + 1)).then(response => response.json())
                .then(function (data) {
                    let textMessage = "";
                    //Utilizo un case para validar la URL consultada así estucturar un mensaje especifico por cada servicio (Cordialmente, Ivan Rene Monroy)
                    switch (randomURL) {
                        case "https://rickandmortyapi.com/api/character":
                            textMessage = data.name + " pertenece a la especie " + data.species + " y se encuentrá ubicado en " + data.origin.name + ", este personaje ha aparecido en " +
                                data.episode.length.toString() + " espisodios."
                            break;
                        case "https://rickandmortyapi.com/api/location":
                            textMessage = "Existe una ubicación llamada " + data.name + ", que es de tipo " + data.type + " que se encuentra el la dimensión de " + data.dimension + "(En este lugar viven " + data.residents.length + " personajes)."
                            break;
                        case "https://rickandmortyapi.com/api/episode":
                            textMessage = "En el cápitulo No. " + data.episode + ", llamado: " + data.name + " podemos evidenciar la presencia de " + data.characters.length.toString() + " personajes" +
                                ". Este cápitulo salio al arte el día: " + data.air_date + "."
                            break;
                    }
                    document.getElementById("CuriosidadText").innerText = textMessage;

                })
        }
    }, 10000)

}
//Este es el servicio que traerá los personajes en la página de SeccionPersonajes.html y dará funcionalidad al paginador (Cordialmente, Ivan Monroy)
function LoadCharateres(urlPage) {
    document.getElementById("txtNombre").focus();
    document.getElementById("cont-characteres").innerHTML = "";
    urlPage !== undefined ? urlPage : urlPage = "https://rickandmortyapi.com/api/character";
    fetch(urlPage).then(response => response.json())
        .then(function (data) {
            document.getElementById("paginator").style.display = "";
            if (data.info.prev !== null) {
                document.getElementById("btnPrev").style.display = "";
                document.getElementById("btnPrev").setAttribute("onclick", "LoadCharateres('" + data.info.prev + "')")
            } else {
                document.getElementById("btnPrev").style.display = "none";
            }

            if (data.info.next !== null) {
                document.getElementById("btnNext").style.display = "";
                document.getElementById("btnNext").setAttribute("onclick", "LoadCharateres('" + data.info.next + "')")
            } else {
                document.getElementById("btnNext").style.display = "none";
            }

            for (let i = 0; i < data.results.length; i++) {
                let container = document.getElementsByClassName("seccionTitulos")[0].cloneNode(true);
                container.style.display = "";
                container.querySelector(".container-image-char").style = "background-image: url('" + data.results[i].image + "')"
                container.querySelector(".lblNombreChar").innerText = data.results[i].name;

                container.querySelector(".tagEstatus").innerText = data.results[i].status;
                container.querySelector(".tagEspecie").innerText = data.results[i].species;
                container.querySelector(".tagGenero").innerText = data.results[i].gender;
                container.querySelector(".tagLNacimiento").innerText = data.results[i].origin.name;
                container.querySelector(".tagLResidencia").innerText = data.results[i].location.name;
                container.querySelector(".tagFCreacion").innerText = data.results[i].created;


                document.getElementById("cont-characteres").appendChild(container);

            }

        })
}
/*Está funcion permitirá cambiar de página desde cualquier página diferente a la base, 
se utiliza postMessage debido al error de Blocked a frame with origin from accessing a cross-origin frame (Cordialmente Ivan Monroy)*/
function openPage(pagina) {
    let heightPage = 0;
    if (pagina.indexOf("PaginaPrincipal") >= 0) {
        heightPage = "1450px";
    } else if (pagina.indexOf("SeccionPersonajes") >= 0) {
        heightPage = "6350px";
    }
    window.parent.postMessage({
        'height': heightPage,
        'pagina': pagina
    }, "*");

}
