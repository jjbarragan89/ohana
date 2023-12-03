
export interface ICliente {
    nombre:string
    canal:string
    identificadorCanal:string
    genero:string
    activo:boolean
}


export class Cliente implements ICliente{
    id:string;
    canal:string;
    identificadorCanal:string;
    genero:string;
    nombre:string;
    activo: boolean
    constructor (id:string, nombre:string, canal:string, identificadorCanal:string, genero:string){
        this.id = id
        this.canal = canal
        this.nombre = nombre
        this.identificadorCanal = identificadorCanal
        this.genero = genero
        this.activo = true
    }
}

export enum Generos{
    Femenino = 'Femenino',
    Masculino = 'Masculino'
}

export enum Canales {
    Instagram = 'Instagram',
    TikTok = 'TikTok',
    Facebook = 'Facebook',
    Whatsapp = 'Whatsapp',
    Twitter = 'Twitter',
    Personal = 'Personal',
}