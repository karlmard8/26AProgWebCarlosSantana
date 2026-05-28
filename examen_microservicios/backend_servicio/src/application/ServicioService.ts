import type { Servicio } from "../domain/Servicio";
import { ServicioRepository } from "../infrastructure/ServicioRepository";

export class ServicioService {
    constructor(private readonly servicioRepository: ServicioRepository) { }

    public async obtenerServicios(): Promise<Servicio[]> {
        return this.servicioRepository.obtenerTodos();
    }

    public async consultarServicio(idservicio: number): Promise<Servicio | null> {
        if (idservicio <= 0) throw new Error("El ID de servicio no es válido.");
        return this.servicioRepository.obtenerPorId(idservicio);
    }

    public async crearServicio(datosServicio: Servicio): Promise<Servicio> {
        this.validarServicio(datosServicio);
        return this.servicioRepository.crear(datosServicio);
    }

    public async actualizarServicio(idservicio: number, datosServicio: Servicio): Promise<Servicio | null> {
        if (idservicio <= 0) throw new Error("ID de servicio inválido para actualización.");
        this.validarServicio(datosServicio);
        return this.servicioRepository.actualizar(idservicio, datosServicio);
    }

    public async eliminarServicio(idservicio: number): Promise<boolean> {
        const registroExiste = await this.servicioRepository.obtenerPorId(idservicio);
        if (!registroExiste) {
            throw new Error("No se puede eliminar: El servicio no está registrado en el sistema.");
        }
        return this.servicioRepository.eliminar(idservicio);
    }

    private validarServicio(servicio: Servicio): void {
        const { nombre_tecnico, nombre_dispositivo } = servicio;

        if (!nombre_tecnico || nombre_tecnico.trim().length === 0) {
            throw new Error("El nombre del técnico es obligatorio.");
        }

        if (!nombre_dispositivo || nombre_dispositivo.trim().length === 0) {
            throw new Error("El nombre del dispositivo es obligatorio.");
        }
    }
}
