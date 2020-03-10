export class TratamientoConsultar {
    constructor(
        public id: number,
        public descripcion: string,
        public color_id : number,
        public color_primario_codigo: string
    ) {}
}

export class TratamientoEditar {
    constructor(
        public id: number,
        public descripcion: string,
        public color_primario: string
    ) {}
}

export class TratamientoGuardar {
    constructor(
        public descripcion: string,
        public color_primario: string
    ) {}
}

export class TratamientoCompleto{
    constructor(
        public id: number,
        public descripcion: string,
        public color_primario: string,
        public hijos? : TratamientoCompleto[]
    ){
        
    }
}

