export class Auth{
    constructor(
        public estado: boolean,
        public mensaje: string,
        public Authorization: string,
        public usuario: UsuarioLogin
    ){ }

}

export class UsuarioLogin{
    constructor(
        public id: number,
        public email: string, 
        public rol_usuario: string,
        public activo: boolean,
        public entrenamiento: boolean,
        public modulos: Modulos[]
    ){}
}

export class Modulos{
    constructor(
        public nombre: string,
        public icono: string,
        public hijos?: Modulos[]
    ){}
}