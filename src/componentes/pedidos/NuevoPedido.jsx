import React, { useEffect, useState } from 'react'
import clienteAxios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FormBuscarProducto } from '../layout/FormBuscarProducto';
import Swal from 'sweetalert2';
import { FormCantidadProducto } from './FormCantidadProducto';

export const NuevoPedido = () => {

    const {id} = useParams();
    const navigate = useNavigate(); //NECESARIO instanciar el useNavigate para poder ser llamado y redireccionar a otra ruta

    const [cliente, guardarCliente] = useState({
        nombre:'',
        apellido:'',
        email:'',
        empresa:'',
        telefono:''
    });

    //Busqueda de los productos
    const [busqueda, guardarBusqueda] = useState('');

    //Guardamos los productos para mostrarlo en la Interfacez
    const [productos, guardarProductos] = useState([]);
    
    //Guardamos los totales en un State
    const [total, guardarTotal] = useState(0);

    //Consultar API
    const consultarAPI = async() => {
        const consultaCliente = await clienteAxios.get(`/clientes/${id}`);
        guardarCliente(consultaCliente.data);
    }

    useEffect(() => {
        //Consultamos la BD
        consultarAPI();
    }, []);

    useEffect(()=>{
        actualizarTotal();
    },[productos]);

    const buscarProducto = async (e) => {
        e.preventDefault();

        //Obtener los productos de la Busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`)
        

        if(resultadoBusqueda.data[0]){
            //Creamos una copia del array que llega y le agregamos 2 campos mas
            let productoResultado = resultadoBusqueda.data[0];
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            //Guardamos todos los productos que se hacen en la Busqueda
            guardarProductos([...productos, productoResultado]);
            

        }else{
            Swal.fire({
                icon: 'error',
                title: 'No Resultados',
                text: 'No hay resultados'
            })
        }

    }

    //almacenar una Busqueda en el state
    const leerDatosBusqueda = (e) => {
        guardarBusqueda(e.target.value)
    }

    const restarProducto = (index) => {

        //Generamos una copia del arreglo [...copia], para no alterar los datos originales
        const todosProductos = [...productos];
    
        //Validar si esta en 0 o no, para q no salga negativo
        if(todosProductos[index].cantidad === 0) return; //que retorne y no deje ejecutar la funcion

        todosProductos[index].cantidad--;

        //almacenamos en el state, el producto actualizado, luego de editar el indice
        guardarProductos(todosProductos);
    }

    const aumentarProducto = (index) => {
       //Generamos una copia del arreglo [...copia], para no alterar los datos originales
        const todosProductos = [...productos];

        todosProductos[index].cantidad++;

        //almacenamos en el state, el producto actualizado, luego de editar el indice
        guardarProductos(todosProductos);

    }

    //Actualizar el total a pagar
    const actualizarTotal = () => {
        //si el arreglo de productos es igual a 0: el total es 0
        if(productos.length === 0)
        {
            guardarTotal(0);
            return;
        }

        //Calcular el nuevo total
        let nuevoTotal = 0;

        //recorrer todos los productos y sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        guardarTotal(nuevoTotal);
    }

    //Eliminar Producto
    const eliminarProducto = (id) => {
        const productosRestantes = productos.filter((producto) => (producto._id !== id));

        guardarProductos(productosRestantes);
        
    }

    //Realizar Pedido
    const realizarPedido = async (e) => {
        e.preventDefault();

        //Crear objeto para enviarlo a la ruta BACKEND
        const pedido = {
            cliente: id,
            pedido: productos,
            total: total
        }

        //Guardar Pedido
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`,pedido);

        if(resultado.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'Correcto!',
                text: resultado.data.mensaje
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Hubo un Error',
                text: 'Vuelva a Intentarlo'
            })
        }

        //Redireccionamos a la pagina general de pedidos
        navigate('/pedidos');
    }

    return ( 
        <>
            <h2>Nuevo Pedido</h2>
                <div className='ficha-cliente'>
                    <h3>Datos de Cliente</h3>
                    <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                    <p>Telefono: {cliente.telefono}</p>
                </div>
                <FormBuscarProducto buscarProducto={buscarProducto} leerDatosBusqueda={leerDatosBusqueda} />
                
                <ul className='resumen'>
                    {productos.map((producto,index)=>(
                        <FormCantidadProducto key={producto._id} {...producto} index={index} restarProducto={restarProducto} aumentarProducto={aumentarProducto} eliminarProducto={eliminarProducto}/>
                    ))}
                </ul>

                    <p className='total'>Total a Pagar: $<span>{total}</span></p>
                
                {
                total>0 ? 
                    (<form onSubmit={realizarPedido}>
                        <input type="submit"  className='btn btn-verde btn-block' value='Realizar Pedido'/>
                    </form>) : null
                }
                
        </>
     );
}