export class Atributo{
    constructor(
        public id : number,
        public descripcion : string,
        public tratamiento_id : number,
        public color_primario : string,   
    ){

    }
}

export class AtributoGuardar{
    constructor(
        public descripcion : string,
        public tratamiento_id : number){
    }
}

export class AtributoEditar{
    constructor(
        public id : number,
        public descripcion : string)
        {
    }
}