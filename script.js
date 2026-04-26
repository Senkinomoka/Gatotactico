let posts = JSON.parse(localStorage.getItem("posts")) || [];

function guardarPosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function crearPost() {
    const contenido = document.getElementById("contenido").value;

    if (contenido.trim() === "") {
        alert("Escribe algo primero");
        return;
    }

    const nuevoPost = {
        texto: contenido,
        fecha: new Date().toLocaleString()
    };

    posts.unshift(nuevoPost);
    guardarPosts();
    mostrarPosts();

    document.getElementById("contenido").value = "";
}

function mostrarPosts() {
    const contenedor = document.getElementById("posts");
    contenedor.innerHTML = "";

    posts.forEach(post => {
        const div = document.createElement("div");
        div.classList.add("post");

        div.innerHTML = `
            <p>${post.texto}</p>
            <span class="fecha">${post.fecha}</span>
        `;

        contenedor.appendChild(div);
    });
}

// cargar al iniciar
mostrarPosts();