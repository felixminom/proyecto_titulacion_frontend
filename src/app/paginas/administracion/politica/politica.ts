
export class PoliticaGuardar {
    constructor(
        public nombre : string,
        public url: string,
        public fecha: string
    ){

    }
}

export class RespuestaPoliticaVisualizar{
    constructor(
        public estado :string,
        public mensaje: string,
        public politica : PoliticaVisualizar
    ){}
}

export class PoliticaVisualizar{
    constructor(
        public nombre : string,
        public parrafos: ParrafoVisualizar[]
    ){
    }
}

export class ParrafoVisualizar {
    constructor(
        public titulo: string,
        public texto_html: string 
    ){}

}