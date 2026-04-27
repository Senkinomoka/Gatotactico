// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// CONFIG (la que te dio Firebase)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO",
  databaseURL: "TU_DATABASE_URL",
  projectId: "TU_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referencia
const comentariosRef = ref(db, "comentarios");

// Enviar comentario
window.enviarComentario = function () {
  const input = document.getElementById("comentarioInput");
  if (!input.value.trim()) return;

  push(comentariosRef, {
    texto: input.value
  });

  input.value = "";
};

// Escuchar en vivo
onValue(comentariosRef, (snapshot) => {
  const lista = document.getElementById("listaComentarios");
  lista.innerHTML = "";

  snapshot.forEach((child) => {
    const data = child.val();
    const li = document.createElement("li");
    li.textContent = data.texto;
    lista.appendChild(li);
  });
});