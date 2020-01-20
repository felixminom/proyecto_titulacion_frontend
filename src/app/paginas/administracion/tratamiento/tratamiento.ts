export interface TratamientoNumeracion {
    id: string;
    numeracion?: number;
    descripcion: string;
    color_primario: string
}

export class Tratamiento {
    constructor(
        public id: number,
        public descripcion: string,
        public color_primario: string
    ) {

    }
}

