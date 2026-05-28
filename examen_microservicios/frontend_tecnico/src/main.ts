const API_URL = "http://localhost:3001";

interface Tecnico {
    idtecnico: number;
    nombre: string;
    telefono: string;
}

// Obtener elementos del DOM
const formTecnico = document.getElementById("formTecnico") as HTMLFormElement;
const nombreInput = document.getElementById("nombre") as HTMLInputElement;
const telefonoInput = document.getElementById("telefono") as HTMLInputElement;
const mensajeDiv = document.getElementById("mensaje") as HTMLDivElement;
const tablaTecnicos = document.getElementById("tablaTecnicos") as HTMLTableSectionElement;

// Cargar técnicos al iniciar
async function cargarTecnicos(): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/tecnicos`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const tecnicos: Tecnico[] = await response.json();
        mostrarTecnicos(tecnicos);
    } catch (error) {
        mostrarMensaje(`Error al cargar técnicos: ${error}`, "error");
    }
}

// Mostrar técnicos en la tabla
function mostrarTecnicos(tecnicos: Tecnico[]): void {
    tablaTecnicos.innerHTML = "";

    if (tecnicos.length === 0) {
        tablaTecnicos.innerHTML = '<tr><td colspan="4">No hay técnicos registrados</td></tr>';
        return;
    }

    tecnicos.forEach((tecnico) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
      <td>${tecnico.idtecnico}</td>
      <td>${tecnico.nombre}</td>
      <td>${tecnico.telefono}</td>
      <td>
        <button class="btn-eliminar" data-id="${tecnico.idtecnico}">Eliminar</button>
      </td>
    `;
        tablaTecnicos.appendChild(fila);

        // Agregar evento al botón eliminar
        const btnEliminar = fila.querySelector(".btn-eliminar") as HTMLButtonElement;
        btnEliminar.addEventListener("click", () => eliminarTecnico(tecnico.idtecnico));
    });
}

// Guardar nuevo técnico
async function guardarTecnico(e: Event): Promise<void> {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const telefono = telefonoInput.value.trim();

    if (!nombre || !telefono) {
        mostrarMensaje("Por favor completa todos los campos", "error");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tecnicos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, telefono }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const nuevoTecnico: Tecnico = await response.json();
        mostrarMensaje(`Técnico "${nuevoTecnico.nombre}" guardado correctamente`, "exito");
        formTecnico.reset();
        cargarTecnicos();
    } catch (error) {
        mostrarMensaje(`Error al guardar técnico: ${error}`, "error");
    }
}

// Eliminar técnico
async function eliminarTecnico(idtecnico: number): Promise<void> {
    if (!confirm("¿Estás seguro de que deseas eliminar este técnico?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tecnicos/${idtecnico}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        mostrarMensaje("Técnico eliminado correctamente", "exito");
        cargarTecnicos();
    } catch (error) {
        mostrarMensaje(`Error al eliminar técnico: ${error}`, "error");
    }
}

// Mostrar mensaje
function mostrarMensaje(texto: string, tipo: "exito" | "error"): void {
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje ${tipo}`;

    setTimeout(() => {
        mensajeDiv.textContent = "";
        mensajeDiv.className = "mensaje";
    }, 5000);
}

// Event listeners
formTecnico.addEventListener("submit", guardarTecnico);

// Cargar técnicos al iniciar la página
cargarTecnicos();
