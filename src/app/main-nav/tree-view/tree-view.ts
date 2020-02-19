export class Modulo{
    constructor(
        public nombre : string,
        public icono : string,
        public hijos : Modulo[],
        public path?: string,
    ){}
}