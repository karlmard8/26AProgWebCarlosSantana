import { pool } from "./db";
import type { Servicio } from "../domain/Servicio";

export class ServicioRepository {
    public async obtenerTodos(): Promise<Servicio[]> {
        const queryTexto = `
      SELECT idservicio, nombre_tecnico, nombre_dispositivo, fecha_salida
      FROM servicios
      ORDER BY idservicio ASC
    `;

        const { rows } = await pool.query(queryTexto);
        return rows;
    }

    public async obtenerPorId(idservicio: number): Promise<Servicio | null> {
        const queryTexto = `
      SELECT idservicio, nombre_tecnico, nombre_dispositivo, fecha_salida
      FROM servicios
      WHERE idservicio = $1
    `;

        const { rows } = await pool.query(queryTexto, [idservicio]);
        return rows[0] || null;
    }

    public async crear(datosServicio: Servicio): Promise<Servicio> {
        const { nombre_tecnico, nombre_dispositivo } = datosServicio;
        const queryTexto = `
      INSERT INTO servicios (nombre_tecnico, nombre_dispositivo)
      VALUES ($1, $2)
      RETURNING idservicio, nombre_tecnico, nombre_dispositivo, fecha_salida
    `;

        const { rows } = await pool.query(queryTexto, [nombre_tecnico, nombre_dispositivo]);
        return rows[0];
    }

    public async actualizar(idservicio: number, datosActualizados: Servicio): Promise<Servicio | null> {
        const { nombre_tecnico, nombre_dispositivo } = datosActualizados;
        const queryTexto = `
      UPDATE servicios
      SET nombre_tecnico = $1, nombre_dispositivo = $2
      WHERE idservicio = $3
      RETURNING idservicio, nombre_tecnico, nombre_dispositivo, fecha_salida
    `;

        const { rows } = await pool.query(queryTexto, [nombre_tecnico, nombre_dispositivo, idservicio]);
        return rows[0] || null;
    }

    public async eliminar(idservicio: number): Promise<boolean> {
        const queryTexto = `
      DELETE FROM servicios
      WHERE idservicio = $1
    `;

        const { rowCount } = await pool.query(queryTexto, [idservicio]);
        return typeof rowCount === "number" && rowCount > 0;
    }
}
