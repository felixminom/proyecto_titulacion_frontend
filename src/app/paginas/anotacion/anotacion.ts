export class Anotacion{
    constructor(
        public texto : string,
        public texto_html : string,
        public comentario : string,
        public parrafo_id : number,
        public usuario_id : number,
        public consolidar : boolean,
        public permite : boolean,
        public valores: AnotacionValor[]
    ){}
}

export class AnotacionNotificacion{
    constructor(
        public usuario_id : number,
        public parrafo_id : number,
        public permite: boolean,
        public valores : AnotacionValor[]
    ){}
}

export class AnotacionNotificacionConsultar{
    constructor(
        public inconsistencia: boolean
    ){}
}

export class AnotacionValor {
    constructor(
        public valor_id: number
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

class AnotacionValorConsultar{
    public tratamiento_descripcion: string
    public atributo_descripcion: string
    public valor_descripcion: string
    public valor_id: number
    public color_primario: string
}

export class UsuarioAnotacion{
    constructor(
        public id : number,
        public permite: boolean,
        public texto: string,
        public comentario: string,
        public valores: AnotacionValorConsultar[]
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