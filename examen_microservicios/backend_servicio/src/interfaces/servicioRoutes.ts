import { ServicioService } from "../application/ServicioService";
import { ServicioRepository } from "../infrastructure/ServicioRepository";
import type { Servicio } from "../domain/Servicio";

const servicioRepository = new ServicioRepository();
const servicioService = new ServicioService(servicioRepository);

export async function manejarRutasServicios(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const metodo = req.method;
    const partes = url.pathname.split("/").filter(Boolean);

    if (partes[0] !== "servicios") {
        return respuestaJSON({ mensaje: "Ruta no encontrada" }, 404);
    }

    try {
        if (metodo === "GET" && partes.length === 1) {
            const servicios = await servicioService.obtenerServicios();
            return respuestaJSON(servicios);
        }

        if (metodo === "GET" && partes.length === 2) {
            const idservicio = Number(partes[1]);
            if (Number.isNaN(idservicio)) {
                return respuestaJSON({ mensaje: "ID de servicio inválido" }, 400);
            }

            const servicio = await servicioService.consultarServicio(idservicio);
            if (!servicio) {
                return respuestaJSON({ mensaje: "Servicio no encontrado" }, 404);
            }
            return respuestaJSON(servicio);
        }

        if (metodo === "POST" && partes.length === 1) {
            const body = await req.json() as Servicio;
            const nuevoServicio = await servicioService.crearServicio(body);
            return respuestaJSON(nuevoServicio, 201);
        }

        if (metodo === "PUT" && partes.length === 2) {
            const idservicio = Number(partes[1]);
            if (Number.isNaN(idservicio)) {
                return respuestaJSON({ mensaje: "ID de servicio inválido" }, 400);
            }

            const body = await req.json() as Servicio;
            const servicioActualizado = await servicioService.actualizarServicio(idservicio, body);
            if (!servicioActualizado) {
                return respuestaJSON({ mensaje: "Servicio no encontrado" }, 404);
            }
            return respuestaJSON(servicioActualizado);
        }

        if (metodo === "DELETE" && partes.length === 2) {
            const idservicio = Number(partes[1]);
            if (Number.isNaN(idservicio)) {
                return respuestaJSON({ mensaje: "ID de servicio inválido" }, 400);
            }

            const eliminado = await servicioService.eliminarServicio(idservicio);
            if (!eliminado) {
                return respuestaJSON({ mensaje: "Servicio no encontrado" }, 404);
            }
            return respuestaJSON({ mensaje: "Servicio eliminado correctamente" });
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
