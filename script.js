// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TU CONFIG AQUÍ
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO",
  projectId: "TU_PROJECT_ID",
};

// Inicializar
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a colección
const comentariosRef = collection(db, "comentarios");

// Enviar comentario
window.enviarComentario = async function () {
  const input = document.getElementById("comentarioInput");
  if (!input.value.trim()) return;

  await addDoc(comentariosRef, {
    texto: input.value,
    fecha: Date.now()
  });

  input.value = "";
};

// Escuchar comentarios en vivo
const q = query(comentariosRef, orderBy("fecha", "asc"));

onSnapshot(q, (snapshot) => {
  const lista = document.getElementById("listaComentarios");
  lista.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = data.texto;
    lista.appendChild(li);
  });
});