export class Anotacion{
    constructor(
        public texto : string,
        public texto_html : string,
        public comentario : string,
        public parrafo_id : number,
        public usuario_id : number,
        public consolidar : boolean,
        public ejecuta : boolean,
        public valores: AnotacionValor[]
    ){}
}

export class AnotacionNotificacion{
    constructor(
        public usuario_id : number,
        public parrafo_id : number,
        public ejecuta: boolean,
        public valores : AnotacionValor[]
    ){}
}

export class AnotacionNotificacionConsultar{
    constructor(
        public inconsistencia: boolean,
        public valores_inconsistentes: AnotacionValorConsultar[],
        public valores_sugeridos: AnotacionValorConsultar[]
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
        public ejecuta: boolean,
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
        public ejecuta: boolean
    ){}
}

export class DetallesAnotacion {
    constructor(
        public coeficiente : number,
        public anotadores : DetallesAnotador[]
    ){}
}

export class DetallesAnotador{
    constructor(
        public email : string,
        public total_anotaciones : number
    ){}
}