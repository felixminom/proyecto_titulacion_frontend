export interface UsuarioGuardar {
    email: string,
    rol_usuario_id: number,
    entrenamiento: boolean,
    activo? : boolean
}

export interface UsuarioEditar {
    id : number,
    email: string,
    rol_usuario_id: number,
    entrenamiento: boolean,
    activo: boolean
}

export interface UsuarioConsultar {
    id: number,
    email: string,
    rol_usuario_id: number,
    rol_usuario: string,
    activo: boolean,
    entrenamiento: boolean,
}

export interface UsuarioAsignar {
    id: number,
    email: string,
}

export interface RolUsuario {
    id : number,
    descripcion : string
  }
