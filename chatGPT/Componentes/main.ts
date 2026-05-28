import * as comp from "./componentes.ts"

const app: HTMLElement | null = document.getElementById("app")
const body = document.querySelector("body")

if (app) {
    app.appendChild(comp.crearUl('GPT ', 'Esta es la respuesta del bot ', 'bot'));
    app.appendChild(comp.crearUl('TÚ ', 'Esta es la respuesta del usuario ', 'user'));
}

if (body) {
    body.appendChild(comp.crearForm());
    body.appendChild(comp.crearTemplate());
}
