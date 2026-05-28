import { pool } from "./db";
import type { Dispositivo } from "../domain/Dispositivo";

export class DispositivoRepository {
    public async obtenerTodos(): Promise<Dispositivo[]> {
        const queryTexto = `
      SELECT iddispositivo, nombre, precio_estimado, fecha_ingreso
      FROM dispositivos
      ORDER BY iddispositivo ASC
    `;

        const { rows } = await pool.query(queryTexto);
        return rows.map((r: any) => ({
            ...r,
            precio_estimado: r.precio_estimado === null || r.precio_estimado === undefined ? r.precio_estimado : Number(r.precio_estimado),
        }));
    }

    public async obtenerPorId(iddispositivo: number): Promise<Dispositivo | null> {
        const queryTexto = `
      SELECT iddispositivo, nombre, precio_estimado, fecha_ingreso
      FROM dispositivos
      WHERE iddispositivo = $1
    `;

        const { rows } = await pool.query(queryTexto, [iddispositivo]);
        const row = rows[0];
        if (!row) return null;
        return {
            ...row,
            precio_estimado: row.precio_estimado === null || row.precio_estimado === undefined ? row.precio_estimado : Number(row.precio_estimado),
        };
    }

    public async crear(datosDispositivo: Dispositivo): Promise<Dispositivo> {
        const { nombre, precio_estimado } = datosDispositivo;
        const queryTexto = `
      INSERT INTO dispositivos (nombre, precio_estimado)
      VALUES ($1, $2)
      RETURNING iddispositivo, nombre, precio_estimado, fecha_ingreso
    `;

        const { rows } = await pool.query(queryTexto, [nombre, precio_estimado]);
        const row = rows[0];
        return {
            ...row,
            precio_estimado: row.precio_estimado === null || row.precio_estimado === undefined ? row.precio_estimado : Number(row.precio_estimado),
        };
    }

    public async actualizar(iddispositivo: number, datosActualizados: Dispositivo): Promise<Dispositivo | null> {
        const { nombre, precio_estimado } = datosActualizados;
        const queryTexto = `
      UPDATE dispositivos
      SET nombre = $1, precio_estimado = $2
      WHERE iddispositivo = $3
      RETURNING iddispositivo, nombre, precio_estimado, fecha_ingreso
    `;

        const { rows } = await pool.query(queryTexto, [nombre, precio_estimado, iddispositivo]);
        const row = rows[0];
        if (!row) return null;
        return {
            ...row,
            precio_estimado: row.precio_estimado === null || row.precio_estimado === undefined ? row.precio_estimado : Number(row.precio_estimado),
        };
    }

    public async eliminar(iddispositivo: number): Promise<boolean> {
        const queryTexto = `
      DELETE FROM dispositivos
      WHERE iddispositivo = $1
    `;

        const { rowCount } = await pool.query(queryTexto, [iddispositivo]);
        return typeof rowCount === "number" && rowCount > 0;
    }
}
