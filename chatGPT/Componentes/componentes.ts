export function crearUl(linea1: string, linea2: string, clase: string): HTMLUListElement {
    const listaUL: HTMLUListElement = document.createElement("ul")
    const listaLI: HTMLLIElement = document.createElement("li")
    const laLinea1: HTMLSpanElement = document.createElement("span")
    const laLinea2p: HTMLParagraphElement = document.createElement("p")

    listaLI.classList.add('message', clase)

    laLinea1.textContent = linea1
    laLinea2p.textContent = linea2

    listaLI.appendChild(laLinea1)
    listaLI.appendChild(laLinea2p)
    listaUL.appendChild(listaLI)

    return listaUL
}


export function crearForm(): HTMLFormElement {
    const form: HTMLFormElement = document.createElement("form")
    const input: HTMLInputElement = document.createElement("input")
    const button: HTMLButtonElement = document.createElement("button")

    button.type = "submit"
    button.textContent = "Enviar"
    input.placeholder = "Escribe tu mensaje aquí..."
    form.appendChild(input)
    form.appendChild(button)

    return form
}

export function crearTemplate(): HTMLTemplateElement {
    const template: HTMLTemplateElement = document.createElement("template")
    const lista1: HTMLLIElement = document.createElement("li")
    const linea1: HTMLSpanElement = document.createElement("span")
    const linea2p: HTMLParagraphElement = document.createElement("p")
    template.id = "message-template"

    lista1.classList.add('message')
    lista1.appendChild(linea1)
    lista1.appendChild(linea2p)
    template.appendChild(lista1)

    return template
}