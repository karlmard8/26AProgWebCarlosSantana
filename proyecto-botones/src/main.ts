import {
  createDivButton,
  createSpanButton,
  createImageButton,
  createParagraphButton,
  createLinkButton,
  createArticleButton,
  createHeaderButton,
  createListButton,
  createSectionButton
} from "./buttons.ts"

const app: HTMLElement | null = document.getElementById("app")

if (app) {
  app.appendChild(createDivButton("Botón con DIV"))
  app.appendChild(createSpanButton("Botón con SPAN"))
  app.appendChild(createImageButton("Botón con IMAGEN"))
  app.appendChild(createParagraphButton("Botón con PÁRRAFO"))
  app.appendChild(createLinkButton("Botón con ENLACE"))
  app.appendChild(createArticleButton("Botón con ARTICLE"))
  app.appendChild(createHeaderButton("Botón con ENCABEZADO"))
  app.appendChild(createListButton("Botón con LISTA"))
  app.appendChild(createSectionButton("Botón con SECCIÓN"))

}