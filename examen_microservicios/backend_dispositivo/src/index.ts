import { manejarRutasDispositivos } from "./interfaces/dispositivoRoutes";

declare const Bun: any;

const PORT = Number(process.env.PORT) || 3003;

Bun.serve({
    port: PORT,

    async fetch(req) {
        const url = new URL(req.url);

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

        if (url.pathname === "/") {
            return new Response(
                JSON.stringify({
                    mensaje: "Backend de dispositivos funcionando correctamente",
                    servicio: "backend-dispositivos",
                    entidad: "dispositivos",
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

        return await manejarRutasDispositivos(req);
    },
});

console.log(`Backend de dispositivos corriendo en http://localhost:${PORT}`);
