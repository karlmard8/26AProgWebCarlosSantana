// src/main.ts
var API_URL = "http://localhost:3002";
var formServicio = document.getElementById("formServicio");
var nombreTecnicoInput = document.getElementById("nombreTecnico");
var nombreDispositivoInput = document.getElementById("nombreDispositivo");
var mensajeDiv = document.getElementById("mensaje");
var tablaServicios = document.getElementById("tablaServicios");
async function cargarServicios() {
  try {
    const response = await fetch(`${API_URL}/servicios`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const servicios = await response.json();
    mostrarServicios(servicios);
  } catch (error) {
    mostrarMensaje(`Error al cargar servicios: ${error}`, "error");
  }
}
function mostrarServicios(servicios) {
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
    const btnEliminar = fila.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", () => eliminarServicio(servicio.idservicio));
  });
}
async function guardarServicio(e) {
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre_tecnico: nombreTecnico, nombre_dispositivo: nombreDispositivo })
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const nuevoServicio = await response.json();
    mostrarMensaje(`Servicio creado correctamente`, "exito");
    formServicio.reset();
    cargarServicios();
  } catch (error) {
    mostrarMensaje(`Error al guardar servicio: ${error}`, "error");
  }
}
async function eliminarServicio(idservicio) {
  if (!confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
    return;
  }
  try {
    const response = await fetch(`${API_URL}/servicios/${idservicio}`, {
      method: "DELETE"
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
function mostrarMensaje(texto, tipo) {
  mensajeDiv.textContent = texto;
  mensajeDiv.className = `mensaje ${tipo}`;
  setTimeout(() => {
    mensajeDiv.textContent = "";
    mensajeDiv.className = "mensaje";
  }, 5000);
}
formServicio.addEventListener("submit", guardarServicio);
cargarServicios();
