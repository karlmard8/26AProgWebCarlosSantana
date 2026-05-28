# Backend Servicio

API de microservicio de servicios construida con Bun y PostgreSQL.

## Rutas principales

- `GET /servicios`
- `GET /servicios/:id`
- `POST /servicios`
- `PUT /servicios/:id`
- `DELETE /servicios/:id`

## Variables de entorno

- `PORT` - Puerto del servicio (default `3002`)
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
