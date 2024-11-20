import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

export const EditarProducto = () => {

    const navigate = useNavigate();

    const {id} = useParams();
    
    //Guardar lo que hay en el input para mostrarlo con la variable producto
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });

    //Guardar lo que hay en el input file
    const [archivo, guardarArchivo] = useState('');

    const consultarAPI = async () => {
        const productoConsulta = await clienteAxios.get(`/productos/${id}`);

        guardarProducto(productoConsulta.data)
    }

    useEffect(() => {
        consultarAPI();
    }, []);
    
    
    //Editar Producto
    const editarProducto = async (e) =>{
        e.preventDefault();

        //crear un formData porque la API, para q reciba datos files, lo hace con el formato formData, sino no dejara enviar archivos
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //Almacenar en la BD
        try {
            //usamos Axios para agregar un producto, le pasamos los datos formato data y la cabezera
            //Forma de agregar datos como Variable con respuesta, no como promesa
            const res = await clienteAxios.put(`/productos/${id}`,formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            });

            //Alerta de Exito
            if (res.status === 200) {
                Swal.fire({
                            title: "Editado Correctamente!",
                            text: res.data.mensaje,
                            icon: "success"
                        });
            }

            //Redireccionar luego de la Operacion
            navigate('/productos');          //usamos la instancia de useNavigate

        } catch (error) {
            console.log(error);
            //mostrarAlerta
            Swal.fire({
                title: "Hubo un error!",
                text: 'Vuelva a intentarlo',
                icon: "error"
            });
        }
        
    }

    //Sin esta funcion no deja ESCRIBIR EN LOS INPUTS
    const leerInformacion = (e) => {
        guardarProducto({
            ...producto,
            [e.target.name]:e.target.value
        });
    }

    const leerArchivo = (e) => {
        guardarArchivo(e.target.files[0]);
    }

    return ( 
        
        <>
            <h2>Editar Producto</h2>

            <form onSubmit={editarProducto}>    {/*onSubmit metodo para agregar en REACT funciones que envien informacion*/}

                <legend> Llena todo los campos </legend>
                <div className='campo'>
                    <label >Nombre: </label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInformacion} value={producto.nombre}/>
                </div>

                <div className='campo'>
                    <label >Precio: </label>
                    <input type="number" placeholder="Precio Producto" min="0.00" step="0.01" name="precio" onChange={leerInformacion} value={producto.precio}/>
                </div>

                <div className='campo'>
                    <label >Imagen: </label> {/**Los if son ternarios */}
                    {producto.imagen ? (<img src={`${import.meta.env.VITE_APP_BACKEND_URL}/${producto.imagen}`} alt="imagen" width={300} />) : null}
                    <input type="file" name="imagen" onChange={leerArchivo}/>
                </div>

                <div className='campo'>
                    <input type="submit" className="btn btn-azul" value="Editar Producto" />
                </div>

            </form>
        </>

     );
}