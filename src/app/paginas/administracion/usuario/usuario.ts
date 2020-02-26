export class UsuarioGuardar {
    constructor(
        public email: string,
        public clave: string,
        public rol_usuario_id: number,
        public entrenamiento: boolean,
        public activo: boolean

    ) { }
}

export class UsuarioConsultar {
    constructor(
        public id: number,
        public email: string,
        public rol_usuario_id: number,
        public rol_usuario: string,
        public activo: boolean,
        public entrenamiento: boolean,

    ) { }
}

export class UsuarioAsignar {
    constructor(
        public id: number,
        public email: string,

    ) { }
}