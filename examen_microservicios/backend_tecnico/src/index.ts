import { manejarRutasTecnicos } from "./interfaces/tecnicoRoutes";

declare const Bun: any;

const PORT = Number(process.env.PORT) || 3001;

Bun.serve({
    port: PORT,

    async fetch(req) {
        const url = new URL(req.url);

        // Soporte para peticiones CORS Preflight (OPTIONS)
        if (req.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            });
        }

        // Ruta raíz informativa adaptada al contexto de técnicos
        if (url.pathname === "/") {
            return new Response(
                JSON.stringify({
                    mensaje: "Backend de técnicos funcionando correctamente",
                    servicio: "backend-tecnicos",
                    entidad: "tecnicos",
                    puerto: PORT,
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
        }

        // Delegamos cualquier otra petición al manejador de rutas de técnicos
        return await manejarRutasTecnicos(req);
    },
});

console.log(`Backend de técnicos corriendo en http://localhost:${PORT}`);