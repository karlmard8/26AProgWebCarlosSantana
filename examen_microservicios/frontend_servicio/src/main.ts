const API_URL = "http://localhost:3002";

interface Servicio {
    idservicio: number;
    nombre_tecnico: string;
    nombre_dispositivo: string;
    fecha_salida: string;
}

const formServicio = document.getElementById("formServicio") as HTMLFormElement;
const nombreTecnicoInput = document.getElementById("nombreTecnico") as HTMLInputElement;
const nombreDispositivoInput = document.getElementById("nombreDispositivo") as HTMLInputElement;
const mensajeDiv = document.getElementById("mensaje") as HTMLDivElement;
const tablaServicios = document.getElementById("tablaServicios") as HTMLTableSectionElement;

async function cargarServicios(): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/servicios`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const servicios: Servicio[] = await response.json();
        mostrarServicios(servicios);
    } catch (error) {
        mostrarMensaje(`Error al cargar servicios: ${error}`, "error");
    }
}

function mostrarServicios(servicios: Servicio[]): void {
    tablaServicios.innerHTML = "";

    if (servicios.length === 0) {
        tablaServicios.innerHTML = '<tr><td colspan="5">No hay servicios registrados</td></tr>';
        return;
    }

    servicios.forEach((servicio) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
      <td>${servicio.idservicio}</td>
      <td>${servicio.nombre_tecnico}</td>
      <td>${servicio.nombre_dispositivo}</td>
      <td>${new Date(servicio.fecha_salida).toLocaleString()}</td>
      <td>
        <button class="btn-eliminar" data-id="${servicio.idservicio}">Eliminar</button>
      </td>
    `;

        tablaServicios.appendChild(fila);
        const btnEliminar = fila.querySelector(".btn-eliminar") as HTMLButtonElement;
        btnEliminar.addEventListener("click", () => eliminarServicio(servicio.idservicio));
    });
}

async function guardarServicio(e: Event): Promise<void> {
    e.preventDefault();

    const nombreTecnico = nombreTecnicoInput.value.trim();
    const nombreDispositivo = nombreDispositivoInput.value.trim();

    if (!nombreTecnico || !nombreDispositivo) {
        mostrarMensaje("Por favor completa todos los campos", "error");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/servicios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre_tecnico: nombreTecnico, nombre_dispositivo: nombreDispositivo }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const nuevoServicio: Servicio = await response.json();
        mostrarMensaje(`Servicio creado correctamente`, "exito");
        formServicio.reset();
        cargarServicios();
    } catch (error) {
        mostrarMensaje(`Error al guardar servicio: ${error}`, "error");
    }
}

async function eliminarServicio(idservicio: number): Promise<void> {
    if (!confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/servicios/${idservicio}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        mostrarMensaje("Servicio eliminado correctamente", "exito");
        cargarServicios();
    } catch (error) {
        mostrarMensaje(`Error al eliminar servicio: ${error}`, "error");
    }
}

function mostrarMensaje(texto: string, tipo: "exito" | "error"): void {
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje ${tipo}`;

    setTimeout(() => {
        mensajeDiv.textContent = "";
        mensajeDiv.className = "mensaje";
    }, 5000);
}

formServicio.addEventListener("submit", guardarServicio);

cargarServicios();
