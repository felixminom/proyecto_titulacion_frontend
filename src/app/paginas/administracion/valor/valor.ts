export class Valor{
    constructor(
        public id: number,
        public descripcion: string,
        public color_primario: string
    ){

    }
}

export class ValorCompleto{
    constructor(
        public id: number,
        public descripcion: string,
        public color_primario: string,
        public atributo_id : number,
        public attributo_descripcion : string,
        public tratamiento_id : number,
        public tratamiento_descripcion : string

    ){

    }
}