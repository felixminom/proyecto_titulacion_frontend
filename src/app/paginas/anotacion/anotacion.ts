export class PoliticaAnotarConsultar{
    constructor(
        public politica_id : number,
        public politica_nombre: string,
        public progreso: number
    ){}
}

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