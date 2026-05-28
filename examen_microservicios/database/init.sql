CREATE TABLE IF NOT EXISTS tecnicos (
    idtecnico SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS dispositivos (
    iddispositivo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio_estimado DECIMAL(10,2) NOT NULL,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS servicios (
    idservicio SERIAL PRIMARY KEY,
    nombre_tecnico VARCHAR(100) NOT NULL,
    nombre_dispositivo VARCHAR(100) NOT NULL,
    fecha_salida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);