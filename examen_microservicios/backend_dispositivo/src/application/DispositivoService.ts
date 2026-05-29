import type { Dispositivo } from "../domain/Dispositivo";
import { DispositivoRepository } from "../infrastructure/DispositivoRepository";

export class DispositivoService {
    constructor(private readonly dispositivoRepository: DispositivoRepository) { }

    public async obtenerDispositivos(): Promise<Dispositivo[]> {
        return this.dispositivoRepository.obtenerTodos();
    }

    public async consultarDispositivo(iddispositivo: number): Promise<Dispositivo | null> {
        if (iddispositivo <= 0) throw new Error("El ID de dispositivo no es válido.");
        return this.dispositivoRepository.obtenerPorId(iddispositivo);
    }

    public async crearDispositivo(datosDispositivo: Dispositivo): Promise<Dispositivo> {
        this.validarDispositivo(datosDispositivo);
        return this.dispositivoRepository.crear(datosDispositivo);
    }

    public async actualizarDispositivo(iddispositivo: number, datosDispositivo: Dispositivo): Promise<Dispositivo | null> {
        if (iddispositivo <= 0) throw new Error("ID de dispositivo inválido para actualización.");
        this.validarDispositivo(datosDispositivo);
        return this.dispositivoRepository.actualizar(iddispositivo, datosDispositivo);
    }

    public async eliminarDispositivo(iddispositivo: number): Promise<boolean> {
        const registroExiste = await this.dispositivoRepository.obtenerPorId(iddispositivo);
        if (!registroExiste) {
            throw new Error("No se puede eliminar: El dispositivo no está registrado en el sistema.");
        }
        return this.dispositivoRepository.eliminar(iddispositivo);
    }

    private validarDispositivo(dispositivo: Dispositivo): void {
        const { nombre, precio_estimado } = dispositivo;

        if (!nombre || nombre.trim().length === 0) {
            throw new Error("El nombre del dispositivo es obligatorio.");
        }

        if (precio_estimado === undefined || precio_estimado === null || Number.isNaN(Number(precio_estimado))) {
            throw new Error("El precio estimado es obligatorio y debe ser un número válido.");
        }
    }
}
