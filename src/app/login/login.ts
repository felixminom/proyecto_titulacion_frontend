export interface Auth{
    estado: boolean,
    mensaje: string,
    Authorization: string,
    usuario: UsuarioLogin
}

export interface UsuarioLogin{
    id: number,
    email: string, 
    rol_usuario: string,
    activo: boolean,
    entrenamiento: boolean,
    modulos: Modulos[]
}

export interface Modulos{
    nombre: string,
    icono: string,
    hijos?: Modulos[]
}