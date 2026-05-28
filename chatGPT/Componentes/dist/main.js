// componentes.ts
function crearUl(linea1, linea2, clase) {
  const listaUL = document.createElement("ul");
  const listaLI = document.createElement("li");
  const laLinea1 = document.createElement("span");
  const laLinea2p = document.createElement("p");
  listaLI.classList.add("message", clase);
  laLinea1.textContent = linea1;
  laLinea2p.textContent = linea2;
  listaLI.appendChild(laLinea1);
  listaLI.appendChild(laLinea2p);
  listaUL.appendChild(listaLI);
  return listaUL;
}
function crearForm() {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Enviar";
  input.placeholder = "Escribe tu mensaje aquí...";
  form.appendChild(input);
  form.appendChild(button);
  return form;
}
function crearTemplate() {
  const template = document.createElement("template");
  const lista1 = document.createElement("li");
  const linea1 = document.createElement("span");
  const linea2p = document.createElement("p");
  template.id = "message-template";
  lista1.classList.add("message");
  lista1.appendChild(linea1);
  lista1.appendChild(linea2p);
  template.appendChild(lista1);
  return template;
}

// main.ts
var app = document.getElementById("app");
var body = document.querySelector("body");
if (app) {
  app.appendChild(crearUl("GPT ", "Esta es la respuesta del bot ", "bot"));
  app.appendChild(crearUl("TÚ ", "Esta es la respuesta del usuario ", "user"));
}
if (body) {
  body.appendChild(crearForm());
  body.appendChild(crearTemplate());
}
