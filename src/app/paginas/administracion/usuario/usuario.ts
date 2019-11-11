export class Usuario {
    constructor(
        public id : number,
        public email : string,
        public rol_usuario : string,
        public activo: boolean,
        public entrenamiento: boolean,
        
    ) {

    }

}