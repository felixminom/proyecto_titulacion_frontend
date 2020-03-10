export class Valor{
    constructor(
        public id: number,
        public descripcion: string,
        public atributo_id : number,
        public color_primario: string
    ){}
}

export class ValorGuardar{
    constructor(
        public descripcion: string,
        public atributo_id : number
    ){}
}

export class ValorEditar{
    constructor(
        public id: number,
        public descripcion: string,
    ){}
}

export class ValorCompleto{
    constructor(
        public id: number,
        public descripcion: string,
        public color_primario: string,
        public atributo_id : number,
        public atributo_descripcion : string,
        public tratamiento_id : number,
        public tratamiento_descripcion : string

    ){}
}