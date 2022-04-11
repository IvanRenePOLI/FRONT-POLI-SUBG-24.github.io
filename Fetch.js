
function LoadProductos() {
    document.getElementById("txtNombre").focus();
    let filter = document.getElementById("txtNombre").value;
    let urlPage = "https://api-poli-ivanmonroy.herokuapp.com/api/products/get_by_desc?filter=" + filter;
    fetch(urlPage).then(response => response.json())
        .then(function (data) {
            document.getElementById("cont-characteres").innerHTML = "";
           
            for (let i = 0; i < data.data.length; i++) {
                let container = document.getElementsByClassName("seccionTitulos")[0].cloneNode(true);
                container.style.display = "";
                container.querySelector(".imagenProducto").src = "data:image/png;base64," + data.data[i].image
                container.querySelector(".lblNombreChar").innerText = data.data[i].name;

                container.querySelector(".tagPrecio").innerText = "$" + data.data[i].price;
                container.querySelector(".tagMarca").innerText = data.data[i].brand == "" ? "x" : data.data[i].brand;
                container.querySelector(".tagColor").innerText = data.data[i].color == "" ? "x" : data.data[i].color;
                container.querySelector(".tagCantidad").innerText = data.data[i].available == "" ? "0 uds." : data.data[i].available + " uds.";
                container.querySelector(".tagDescripcion").innerText = data.data[i].description == "" ? "Sin descripción disponible" : data.data[i].description;


                document.getElementById("cont-characteres").appendChild(container);

            }

        })
}

