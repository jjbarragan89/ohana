import { Cliente } from "../clientes/cliente"
import { Producto } from "../productos/producto"

export interface IPedido{
    fecha_entrega:string
    fecha_creacion:string
    cliente:Cliente
    productos:Producto[]
    estado:string
}

export class Pedido implements  IPedido{
    
    id:string;
    fecha_entrega: string ;
    fecha_creacion: string ;
    cliente: Cliente ;
    productos: Producto[];
    estado:string;

    public constructor(id:string, fecha_entrega:string, cliente:Cliente, productos:Producto[], estado?:string){
        this.id = id
        this.fecha_entrega = fecha_entrega
        this.cliente = cliente
        this.productos = productos
        this.fecha_creacion = new Date().toDateString()
        this.estado = (estado)? estado: EstadosPedidos.Proceso
        
    }

    calcularValorPedido(){
        let total=0;
        this.productos.forEach(producto=>{
            if(producto.seleccionados > 0){
                total += (producto.precio * producto.seleccionados)
            }
        });
        return total;
    }
}

export enum EstadosPedidos{
    Pendiente = 'pendiente',
    Entregado = 'entregado',
    Proceso = 'proceso',
    Cancelado = 'cancelado',
}