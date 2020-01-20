export class Atributo{
    constructor(
        public id : number,
        public descripcion : string,
        public tratamiento_id : number,
        public color_primario : string,   
    ){

    }
}

export class Respuesta{
    constructor(
        public estado : string,
        public mensaje : string
    ){
        
    }
}