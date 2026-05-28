import type { Tecnico } from "../domain/Tecnico";
import { TecnicoRepository } from "../infrastructure/TecnicoRepository";

export class TecnicoService {

    constructor(private readonly tecnicoRepository: TecnicoRepository) { }

    public async obtenerNominaTecnica(): Promise<Tecnico[]> {
        return this.tecnicoRepository.obtenerTodos();
    }

    public async consultarHistorialTecnico(idtecnico: number): Promise<Tecnico | null> {
        if (idtecnico <= 0) throw new Error("El ID de técnico no es válido.");

        return this.tecnicoRepository.obtenerPorId(idtecnico);
    }

    public async darDeAltaTecnico(datosTecnico: Tecnico): Promise<Tecnico> {
        this.validarPerfilTecnico(datosTecnico);
        return this.tecnicoRepository.crear(datosTecnico);
    }

    public async modificarDatosTecnico(idtecnico: number, datosActualizados: Tecnico): Promise<Tecnico | null> {
        if (idtecnico <= 0) throw new Error("ID de técnico inválido para actualización.");
        this.validarPerfilTecnico(datosActualizados);

        return this.tecnicoRepository.actualizar(idtecnico, datosActualizados);
    }

    public async darDeBajaTecnico(idtecnico: number): Promise<boolean> {
        const registroExiste = await this.tecnicoRepository.obtenerPorId(idtecnico);
        if (!registroExiste) {
            throw new Error("No se puede eliminar: El técnico no está registrado en el sistema.");
        }

        return this.tecnicoRepository.eliminar(idtecnico);
    }

    /**
     * Regla de negocio adaptada a los nuevos atributos (nombre y teléfono)
     */
    private validarPerfilTecnico(tecnico: Tecnico): void {
        const { nombre, telefono } = tecnico;

        if (!nombre || nombre.trim().length === 0) {
            throw new Error("El nombre del técnico es obligatorio.");
        }

        // Validación orientada al campo telefono VARCHAR(10)
        if (!telefono || telefono.trim().length !== 10 || isNaN(Number(telefono))) {
            throw new Error("El teléfono es obligatorio y debe contener exactamente 10 dígitos numéricos.");
        }
    }
}