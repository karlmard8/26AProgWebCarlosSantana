import { TecnicoService } from "../application/TecnicoService";
import { TecnicoRepository } from "../infrastructure/TecnicoRepository";
import type { Tecnico } from "../domain/Tecnico"; // Importamos el tipo para solucionar el error

// Inicializamos el repositorio y el servicio específicos de Técnicos
const tecnicoRepository = new TecnicoRepository();
const tecnicoService = new TecnicoService(tecnicoRepository);

export async function manejarRutasTecnicos(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const metodo = req.method;
    const partes = url.pathname.split("/").filter(Boolean);

    // Ajustado al endpoint de técnicos
    if (partes[0] !== "tecnicos") {
        return respuestaJSON({ mensaje: "Ruta no encontrada" }, 404);
    }

    try {
        // GET /tecnicos -> Listar nómina completa
        if (metodo === "GET" && partes.length === 1) {
            const tecnicos = await tecnicoService.obtenerNominaTecnica();
            return respuestaJSON(tecnicos);
        }

        // GET /tecnicos/:idtecnico -> Buscar técnico específico
        if (metodo === "GET" && partes.length === 2) {
            const idtecnico = Number(partes[1]);

            if (Number.isNaN(idtecnico)) {
                return respuestaJSON({ mensaje: "ID de técnico inválido" }, 400);
            }

            const tecnico = await tecnicoService.consultarHistorialTecnico(idtecnico);

            if (!tecnico) {
                return respuestaJSON({ mensaje: "Técnico no encontrado" }, 404);
            }

            return respuestaJSON(tecnico);
        }

        // POST /tecnicos -> Registrar nuevo técnico (con nombre y telefono)
        if (metodo === "POST" && partes.length === 1) {
            // Agregamos 'as Tecnico' para decirle a TypeScript que confíe en la estructura del JSON entrante
            const body = await req.json() as Tecnico;
            const nuevoTecnico = await tecnicoService.darDeAltaTecnico(body);

            return respuestaJSON(nuevoTecnico, 201);
        }

        // PUT /tecnicos/:idtecnico -> Modificar datos del técnico
        if (metodo === "PUT" && partes.length === 2) {
            const idtecnico = Number(partes[1]);

            if (Number.isNaN(idtecnico)) {
                return respuestaJSON({ mensaje: "ID de técnico inválido" }, 400);
            }

            // Agregamos 'as Tecnico' también aquí para solucionar el tipado 'unknown'
            const body = await req.json() as Tecnico;
            const tecnicoActualizado = await tecnicoService.modificarDatosTecnico(idtecnico, body);

            if (!tecnicoActualizado) {
                return respuestaJSON({ mensaje: "Técnico no encontrado" }, 404);
            }

            return respuestaJSON(tecnicoActualizado);
        }

        // DELETE /tecnicos/:idtecnico -> Dar de baja al técnico
        if (metodo === "DELETE" && partes.length === 2) {
            const idtecnico = Number(partes[1]);

            if (Number.isNaN(idtecnico)) {
                return respuestaJSON({ mensaje: "ID de técnico inválido" }, 400);
            }

            const eliminado = await tecnicoService.darDeBajaTecnico(idtecnico);

            if (!eliminado) {
                return respuestaJSON({ mensaje: "Técnico no encontrado" }, 404);
            }

            return respuestaJSON({ mensaje: "Técnico eliminado correctamente" });
        }

        return respuestaJSON({ mensaje: "Método no permitido" }, 405);
    } catch (error) {
        const mensaje = error instanceof Error ? error.message : "Error interno del servidor";
        return respuestaJSON({ error: mensaje }, 500);
    }
}

export function respuestaJSON(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}