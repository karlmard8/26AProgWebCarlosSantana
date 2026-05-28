import { pool } from "./db";
import type { Tecnico } from "../domain/Tecnico";

export class TecnicoRepository {

    /**
     * Obtiene la lista completa de técnicos registrados
     */
    public async obtenerTodos(): Promise<Tecnico[]> {
        const queryTexto = `
      SELECT idtecnico, nombre, telefono 
      FROM tecnicos 
      ORDER BY idtecnico ASC
    `;

        const { rows } = await pool.query(queryTexto);
        return rows;
    }

    /**
     * Busca un técnico por su identificador primario (idtecnico)
     */
    public async obtenerPorId(idtecnico: number): Promise<Tecnico | null> {
        const queryTexto = `
      SELECT idtecnico, nombre, telefono 
      FROM tecnicos 
      WHERE idtecnico = $1
    `;

        const { rows } = await pool.query(queryTexto, [idtecnico]);
        const [tecnicoEncontrado] = rows;

        return tecnicoEncontrado || null;
    }

    /**
     * Inserta un nuevo técnico con su número de contacto
     */
    public async crear(datosTecnico: Tecnico): Promise<Tecnico> {
        const { nombre, telefono } = datosTecnico;
        const queryTexto = `
      INSERT INTO tecnicos (nombre, telefono) 
      VALUES ($1, $2) 
      RETURNING idtecnico, nombre, telefono
    `;

        const { rows } = await pool.query(queryTexto, [nombre, telefono]);
        return rows[0];
    }

    /**
     * Modifica los datos de un técnico existente usando idtecnico
     */
    public async actualizar(idtecnico: number, datosActualizados: Tecnico): Promise<Tecnico | null> {
        const { nombre, telefono } = datosActualizados;
        const queryTexto = `
      UPDATE tecnicos 
      SET nombre = $1, telefono = $2 
      WHERE idtecnico = $3 
      RETURNING idtecnico, nombre, telefono
    `;

        const { rows } = await pool.query(queryTexto, [nombre, telefono, idtecnico]);
        const [tecnicoModificado] = rows;

        return tecnicoModificado || null;
    }

    /**
     * Elimina el registro de un técnico mediante su ID
     */
    public async eliminar(idtecnico: number): Promise<boolean> {
        const queryTexto = `
      DELETE FROM tecnicos 
      WHERE idtecnico = $1
    `;

        const { rowCount } = await pool.query(queryTexto, [idtecnico]);
        return typeof rowCount === "number" && rowCount > 0;
    }
}