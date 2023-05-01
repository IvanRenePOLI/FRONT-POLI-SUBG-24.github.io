
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
                container.querySelector(".btn-opiniones").href = "RateList.html?id=" + data.data[i].id

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

function loadOpiniones() {
    document.getElementById("txtOpinion").value = "";
    document.getElementById("txtContacto").value = "";
    document.getElementById("txtNombre").value = "";
    document.querySelector('input[name="exampleRadios"]:checked').value;
    document.getElementById("radio5").checked = true;


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    let urlPage = "https://api-poli-ivanmonroy.herokuapp.com/api/products/get_comments?id=" + id;
    fetch(urlPage).then(response => response.json())
        .then(function (data) {
            document.getElementById("nameProduct").innerHTML = data.data.product.name;
            document.getElementById("nameProduct").setAttribute("idHidden", data.data.product.id);
            document.getElementById("star-product").innerHTML = "Calificación " + data.data.averange + " / 5 ";
            let randomIMG = [
                "https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png",
                "https://cdn-icons-png.flaticon.com/512/147/147144.png",
                "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
                "https://www.tsensor.online/wp-content/uploads/2020/04/avatar-icon-png-105-images-in-collection-page-3-avatarpng-512_512.png",
                "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-File.png",
                "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png",
                "https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man4-512.png",
                "https://cdn1.iconfinder.com/data/icons/avatars-flat/33/an-05-512.png"
            ];

            document.querySelector("#imagenNOpinion").src = randomIMG[Math.floor(Math.random() * (7 - 0 + 1) + 0)];
            for (let i = 0; i < data.data.comments.length; i++) {
                let index = data.data.comments[i];
                let container = document.getElementsByClassName("seccionTitulos")[0].cloneNode(true);
                container.style.display = "";
                container.querySelector(".imagenProducto").src = randomIMG[Math.floor(Math.random() * (7 - 0 + 1) + 0)];
                container.querySelector(".lblCliente").innerText = index[3];
                container.querySelector(".tagCalif").innerHTML = index[2] + " <i class='fa fa-star' style='color: orange' aria-hidden='true'></i>";
                container.querySelector(".tagContact").innerText = index[4];
                container.querySelector(".tagopinion").innerText = index[1] == "" ? "Sin opinión disponible" : index[1];
                document.getElementById("cont-characteres").appendChild(container);
            }
        })
}

const guardarOpinion = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')
    const comentario = document.getElementById("txtOpinion").value;
    const email = document.getElementById("txtContacto").value;
    const name = document.getElementById("txtNombre").value;
    const star = document.querySelector('input[name="exampleRadios"]:checked').value;

    if (comentario == "") {
        alert("El comentario no puede estar vacío");
        return false;
    }

    if (email == "") {
        alert("El comentario no puede estar vacío");
        return false;
    }


    if (name == "") {
        alert("El comentario no puede estar vacío");
        return false;
    }

    let urlPage = "https://api-poli-ivanmonroy.herokuapp.com/api/comment_products?comment=" + comentario + "&star=" + star + "&email=" + email + "&product_id=" + id + "&name=" + name;
    
    const options = {
        method: "POST"
      };

    fetch(urlPage, options).then(response => response.json())
        .then(function (data) {
            alert(data.message);
            window.scrollTo(0,0); 
            loadOpiniones();
        })


}

