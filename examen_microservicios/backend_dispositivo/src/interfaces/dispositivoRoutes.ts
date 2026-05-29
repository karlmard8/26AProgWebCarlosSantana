import { DispositivoService } from "../application/DispositivoService";
import { DispositivoRepository } from "../infrastructure/DispositivoRepository";
import type { Dispositivo } from "../domain/Dispositivo";

const dispositivoRepository = new DispositivoRepository();
const dispositivoService = new DispositivoService(dispositivoRepository);

export async function manejarRutasDispositivos(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const metodo = req.method;
    const partes = url.pathname.split("/").filter(Boolean);

    if (partes[0] !== "dispositivos") {
        return respuestaJSON({ mensaje: "Ruta no encontrada" }, 404);
    }

    try {
        if (metodo === "GET" && partes.length === 1) {
            const dispositivos = await dispositivoService.obtenerDispositivos();
            return respuestaJSON(dispositivos);
        }

        if (metodo === "GET" && partes.length === 2) {
            const iddispositivo = Number(partes[1]);
            if (Number.isNaN(iddispositivo)) {
                return respuestaJSON({ mensaje: "ID de dispositivo inválido" }, 400);
            }

            const dispositivo = await dispositivoService.consultarDispositivo(iddispositivo);
            if (!dispositivo) {
                return respuestaJSON({ mensaje: "Dispositivo no encontrado" }, 404);
            }
            return respuestaJSON(dispositivo);
        }

        if (metodo === "POST" && partes.length === 1) {
            const body = await req.json() as Dispositivo;
            const nuevoDispositivo = await dispositivoService.crearDispositivo(body);
            return respuestaJSON(nuevoDispositivo, 201);
        }

        if (metodo === "PUT" && partes.length === 2) {
            const iddispositivo = Number(partes[1]);
            if (Number.isNaN(iddispositivo)) {
                return respuestaJSON({ mensaje: "ID de dispositivo inválido" }, 400);
            }

            const body = await req.json() as Dispositivo;
            const dispositivoActualizado = await dispositivoService.actualizarDispositivo(iddispositivo, body);
            if (!dispositivoActualizado) {
                return respuestaJSON({ mensaje: "Dispositivo no encontrado" }, 404);
            }
            return respuestaJSON(dispositivoActualizado);
        }

        if (metodo === "DELETE" && partes.length === 2) {
            const iddispositivo = Number(partes[1]);
            if (Number.isNaN(iddispositivo)) {
                return respuestaJSON({ mensaje: "ID de dispositivo inválido" }, 400);
            }

            const eliminado = await dispositivoService.eliminarDispositivo(iddispositivo);
            if (!eliminado) {
                return respuestaJSON({ mensaje: "Dispositivo no encontrado" }, 404);
            }
            return respuestaJSON({ mensaje: "Dispositivo eliminado correctamente" });
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
