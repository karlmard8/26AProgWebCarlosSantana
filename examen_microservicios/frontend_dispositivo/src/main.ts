const API_URL = "http://localhost:3003";

interface Dispositivo {
    iddispositivo: number;
    nombre: string;
    precio_estimado: number;
    fecha_ingreso: string;
}

const formDispositivo = document.getElementById("formDispositivo") as HTMLFormElement;
const nombreInput = document.getElementById("nombre") as HTMLInputElement;
const precioInput = document.getElementById("precio") as HTMLInputElement;
const mensajeDiv = document.getElementById("mensaje") as HTMLDivElement;
const tablaDispositivos = document.getElementById("tablaDispositivos") as HTMLTableSectionElement;

async function cargarDispositivos(): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/dispositivos`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const dispositivos: Dispositivo[] = await response.json();
        mostrarDispositivos(dispositivos);
    } catch (error) {
        mostrarMensaje(`Error al cargar dispositivos: ${error}`, "error");
    }
}

function mostrarDispositivos(dispositivos: Dispositivo[]): void {
    tablaDispositivos.innerHTML = "";

    if (dispositivos.length === 0) {
        tablaDispositivos.innerHTML = '<tr><td colspan="5">No hay dispositivos registrados</td></tr>';
        return;
    }

    dispositivos.forEach((dispositivo) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
      <td>${dispositivo.iddispositivo}</td>
      <td>${dispositivo.nombre}</td>
      <td>$${dispositivo.precio_estimado.toFixed(2)}</td>
      <td>${new Date(dispositivo.fecha_ingreso).toLocaleString()}</td>
      <td>
        <button class="btn-eliminar" data-id="${dispositivo.iddispositivo}">Eliminar</button>
      </td>
    `;

        tablaDispositivos.appendChild(fila);
        const btnEliminar = fila.querySelector(".btn-eliminar") as HTMLButtonElement;
        btnEliminar.addEventListener("click", () => eliminarDispositivo(dispositivo.iddispositivo));
    });
}

async function guardarDispositivo(e: Event): Promise<void> {
    e.preventDefault();
    e.stopPropagation();

    const nombre = nombreInput.value.trim();
    const precio = Number(precioInput.value);

    if (!nombre || Number.isNaN(precio)) {
        mostrarMensaje("Por favor completa todos los campos con datos válidos", "error");
        return;
    }

    if (precio <= 0) {
        mostrarMensaje("El precio debe ser mayor a 0", "error");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/dispositivos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, precio_estimado: precio }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ mensaje: response.statusText }));
            throw new Error(errorData.mensaje || errorData.error || `Error ${response.status}`);
        }

        const resultado = await response.json();
        mostrarMensaje("Dispositivo guardado correctamente", "exito");
        formDispositivo.reset();
        await cargarDispositivos();
    } catch (error) {
        const mensajeError = error instanceof Error ? error.message : String(error);
        console.error("Error al guardar:", mensajeError);
        mostrarMensaje(`Error al guardar dispositivo: ${mensajeError}`, "error");
    }
}

async function eliminarDispositivo(iddispositivo: number): Promise<void> {
    if (!confirm("¿Estás seguro de que deseas eliminar este dispositivo?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/dispositivos/${iddispositivo}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        mostrarMensaje("Dispositivo eliminado correctamente", "exito");
        cargarDispositivos();
    } catch (error) {
        mostrarMensaje(`Error al eliminar dispositivo: ${error}`, "error");
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

// Usar addEventListener con { once: false } para asegurar que se ejecute siempre
formDispositivo.addEventListener("submit", guardarDispositivo, false);

cargarDispositivos();
