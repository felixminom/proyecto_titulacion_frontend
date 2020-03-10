export class Anotacion{
    constructor(
        public texto : string,
        public texto_html : string,
        public comentario : string,
        public valor_id : number,
        public parrafo_id : number,
        public usuario_id : number,
        public consolidar : boolean,
        public permite : boolean
    ){}
}

export class PoliticaAnotarConsultar{
    constructor(
        public politica_id : number,
        public politica_nombre: string,
        public progreso: number
    ){}
}


export class totalAnotaciones {
    constructor(
        public estado : string,
        public num_anotaciones : number
    ){}
}

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
        public id : number,
        public tratamiento_descripcion: string,
        public atributo_descripcion: string,
        public valor_descripcion: string,
        public color_primario: string,
        public permite: boolean,
        public texto: string,
        public comentario: string
    ){}
}

export class AnotacionEditar{
    constructor(
        public id : number,
        public texto: string,
        public texto_html: string,
        public comentario: string,
        public permite: boolean
    ){}
}