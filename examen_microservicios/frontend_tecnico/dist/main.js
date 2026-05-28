// src/main.ts
var API_URL = "http://localhost:3001";
var formTecnico = document.getElementById("formTecnico");
var nombreInput = document.getElementById("nombre");
var telefonoInput = document.getElementById("telefono");
var mensajeDiv = document.getElementById("mensaje");
var tablaTecnicos = document.getElementById("tablaTecnicos");
async function cargarTecnicos() {
  try {
    const response = await fetch(`${API_URL}/tecnicos`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const tecnicos = await response.json();
    mostrarTecnicos(tecnicos);
  } catch (error) {
    mostrarMensaje(`Error al cargar técnicos: ${error}`, "error");
  }
}
function mostrarTecnicos(tecnicos) {
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
    const btnEliminar = fila.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", () => eliminarTecnico(tecnico.idtecnico));
  });
}
async function guardarTecnico(e) {
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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, telefono })
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const nuevoTecnico = await response.json();
    mostrarMensaje(`Técnico "${nuevoTecnico.nombre}" guardado correctamente`, "exito");
    formTecnico.reset();
    cargarTecnicos();
  } catch (error) {
    mostrarMensaje(`Error al guardar técnico: ${error}`, "error");
  }
}
async function eliminarTecnico(idtecnico) {
  if (!confirm("¿Estás seguro de que deseas eliminar este técnico?")) {
    return;
  }
  try {
    const response = await fetch(`${API_URL}/tecnicos/${idtecnico}`, {
      method: "DELETE"
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
function mostrarMensaje(texto, tipo) {
  mensajeDiv.textContent = texto;
  mensajeDiv.className = `mensaje ${tipo}`;
  setTimeout(() => {
    mensajeDiv.textContent = "";
    mensajeDiv.className = "mensaje";
  }, 5000);
}
formTecnico.addEventListener("submit", guardarTecnico);
cargarTecnicos();
