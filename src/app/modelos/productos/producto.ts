export interface IProducto{
    nombre:string;
    precio:number;
    descripcion:string;
    tipoProducto:string
    imagen?:string;
    estado?:string;
    seleccionados:number
    inventario:number
}


export class Producto implements IProducto{
    id:string
    nombre:string;
    precio:number;
    descripcion:string;
    imagen?: string | undefined;
    tipoProducto: string;
    estado:string;
    seleccionados: number = 0;
    inventario: number = 0;

    constructor(id:string, nombre:string, precio:number, descripcion:string, tipoProducto:string){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.descripcion = descripcion
        this.tipoProducto = tipoProducto
        this.estado = EstadosProductos.Activo
    }
}

export enum TiposProductos{
    Vela = "Vela",
    Jabon = "Jabon",
}

export enum EstadosProductos{
    Activo = "Activo",
    Inactivo = "Inactivo",
}