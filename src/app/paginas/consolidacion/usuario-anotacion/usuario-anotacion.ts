export class AnotacionResultado {
    constructor(
        public inconsistencia: boolean,
        public usuarios_anotaciones : AnotacionUsuario[]
    ){}
}

export class AnotacionUsuario{
    constructor(
        public email: string,
        public rol_usuario: string,
        public anotaciones?: UsuarioAnotacion[]
    ){}
}

export class UsuarioAnotacion{
    constructor(
        public tratamiento_descripcion: string,
        public atributo_descripcion: string,
        public valor_descripcion: string,
        public color_primario: string,
        public texto_html: string,
        public comentario: string
    ){}
}