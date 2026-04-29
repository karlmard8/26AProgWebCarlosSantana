// src/buttons.ts
function createDivButton(text) {
  const div = document.createElement("div");
  div.textContent = text;
  div.className = "fake-button";
  div.addEventListener("click", () => {
    console.log("Botón DIV presionado");
  });
  return div;
}
function createSpanButton(text) {
  const span = document.createElement("span");
  span.textContent = text;
  span.className = "fake-button";
  span.addEventListener("click", () => {
    console.log("Botón SPAN presionado");
  });
  return span;
}
function createImageButton(text) {
  const image = document.createElement("img");
  image.src = "https://via.placeholder.com/160x50?text=IMG";
  image.alt = text;
  image.className = "fake-button";
  image.addEventListener("click", () => {
    console.log("Botón IMAGEN presionado");
  });
  return image;
}
function createParagraphButton(text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  paragraph.className = "fake-button";
  paragraph.addEventListener("click", () => {
    console.log("Botón PÁRRAFO presionado");
  });
  return paragraph;
}
function createLinkButton(text) {
  const link = document.createElement("a");
  link.textContent = text;
  link.href = "#";
  link.className = "fake-button";
  link.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Botón ENLACE presionado");
  });
  return link;
}
function createArticleButton(text) {
  const article = document.createElement("article");
  article.textContent = text;
  article.className = "fake-button";
  article.addEventListener("click", () => {
    console.log("Botón ARTICLE presionado");
  });
  return article;
}
function createHeaderButton(text) {
  const header = document.createElement("h2");
  header.textContent = text;
  header.className = "fake-button";
  header.addEventListener("click", () => {
    console.log("Botón ENCABEZADO presionado");
  });
  return header;
}
function createListButton(text) {
  const listItem = document.createElement("li");
  listItem.textContent = text;
  listItem.className = "fake-button";
  listItem.addEventListener("click", () => {
    console.log("Botón LISTA presionado");
  });
  return listItem;
}
function createSectionButton(text) {
  const section = document.createElement("section");
  section.textContent = text;
  section.className = "fake-button";
  section.addEventListener("click", () => {
    console.log("Botón SECCIÓN presionado");
  });
  return section;
}

// src/main.ts
var style = document.createElement("style");
style.textContent = `
  body {
    font-family: Arial, sans-serif;
    padding: 20px;
  }

  h1 {
    margin-bottom: 10px;
  }

  #app {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
  }

  .fake-button {
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid black;
    border-radius: 6px;
    background: lightgray;
    width: fit-content;
    transition: 0.2s;
    text-decoration: none;
    color: black;
    display: inline-block;
  }

  .fake-button:hover {
    background: gray;
    color: white;
  }

  .fake-button:active {
    transform: scale(0.95);
  }
`;
document.head.appendChild(style);
var app = document.getElementById("app");
if (app) {
  app.appendChild(createDivButton("Botón con DIV"));
  app.appendChild(createSpanButton("Botón con SPAN"));
  app.appendChild(createImageButton("Botón con IMAGEN"));
  app.appendChild(createParagraphButton("Botón con PÁRRAFO"));
  app.appendChild(createLinkButton("Botón con ENLACE"));
  app.appendChild(createArticleButton("Botón con ARTICLE"));
  app.appendChild(createHeaderButton("Botón con ENCABEZADO"));
  app.appendChild(createListButton("Botón con LISTA"));
  app.appendChild(createSectionButton("Botón con SECCIÓN"));
}
