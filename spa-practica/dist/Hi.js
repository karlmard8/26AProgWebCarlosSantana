// Hi.ts
function createButtonEvP(text, id, css_class, evt) {
  const buttonHi = document.createElement("button");
  buttonHi.textContent = text;
  buttonHi.id = id;
  buttonHi.classList.add(css_class);
  buttonHi.addEventListener(evt.event, evt.handler);
  return buttonHi;
}
var button3 = createButtonEvP("console", "03", "btn", {
  event: "click",
  handler: () => {
    console.log("evento ejecutado");
  }
});
document.body.appendChild(button3);
function createInjectorButton(text, html) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", () => {
    const appDiv = document.getElementById("App");
    if (appDiv) {
      appDiv.innerHTML = html;
    }
  });
  document.body.appendChild(button);
}
createInjectorButton("Inyectar HTML", "<p style='background-color: yellow; padding: 20px;'>¡HTML inyectado !< /p>");
createInjectorButton("Página Azul", "<p style='background-color: blue; padding: 20px;'>Contenido Azul</p>");
createInjectorButton("Página Roja", "<div style='background-color: red; padding: 20px;'>Contenido Rojo</div>");
function createlnjectorButton(text, html, b) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", () => {
    const appDiv = document.getElementById("App");
    if (appDiv) {
      appDiv.innerHTML = html;
      appDiv.appendChild(b);
    }
  });
  document.body.appendChild(button);
  return button;
}
var bx = createlnjectorButton("Inyectar HTML", "<p><strong>jHTML inyectado !< /strong></p>", button3);
createlnjectorButton("2 Inyectar HTML", "<div style='background-color: #FF0000; padding: 20px;'>Este div tiene un fondo rojo .< /div>", bx);
function routerSimple(text, html) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("btn");
  button.addEventListener("click", () => {
    const appDiv = document.getElementById("App");
    if (appDiv) {
      appDiv.innerHTML = html;
    }
  });
  document.body.appendChild(button);
  return button;
}
routerSimple("SPA", "<h2>SPA</h2><p>Bienvenido a la página principal.</p>");
routerSimple("Hola", "<h2>Hola</h2><p>Hola.</p>");
routerSimple("Adios", "<h2>Adios</h2><p>Adiós</p>");
