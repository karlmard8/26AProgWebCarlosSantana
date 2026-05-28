# Backend Dispositivo

API de microservicio de dispositivos construida con Bun y PostgreSQL.

## Rutas principales

- `GET /dispositivos`
- `GET /dispositivos/:id`
- `POST /dispositivos`
- `PUT /dispositivos/:id`
- `DELETE /dispositivos/:id`

## Variables de entorno

- `PORT` - Puerto del servicio (default `3003`)
- `DB_HOST` - Host de PostgreSQL
- `DB_PORT` - Puerto de PostgreSQL
- `DB_USER` - Usuario de PostgreSQL
- `DB_PASSWORD` - Contraseña de PostgreSQL
- `DB_NAME` - Nombre de la base de datos

## Comandos

```bash
bun install
bun run dev
```
