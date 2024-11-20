import React, {useState } from 'react'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

export const NuevoProducto = () => {

    const navigate = useNavigate(); //NECESARIO instanciar el useNavigate para poder ser llamado y redireccionar a otra ruta

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    });

    //Otro State porque el archivo file tiene muchos campos diferentes a un string
    const [archivo, guardarArchivo] = useState('');

    const leerInformacion = (e) =>{
        guardarProducto({
            //copia del producto y pegamos el nuevo producto actualizado
            ...producto, 
            [e.target.name]:e.target.value})
    }

    const leerArchivo = (e) =>{
        guardarArchivo(e.target.files[0]);
    }

    const agregarProducto = async (e) => {
        e.preventDefault();

        //crear un formData porque la API, para q reciba datos files, lo hace con el formato formData
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //Almacenar en la BD
        try {
            //usamos Axios para agregar un producto, le pasamos los datos formato data y la cabezera
            //Forma de agregar datos como Variable con respuesta, no como promesa
            const res = await clienteAxios.post('/productos',formData,{
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            });

            //Alerta de Exito
            if (res.status === 200) {
                Swal.fire({
                            title: "Agregado correctamente!",
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

    return (
        <>
            <h2>Nuevo Producto</h2>

            <form onSubmit={agregarProducto}>    {/*onSubmit metodo para agregar en REACT funciones que envien informacion*/}

                <legend> Llena todo los campos </legend>
                <div className='campo'>
                    <label >Nombre: </label>
                    <input type="text" placeholder="Nombre Producto" name="nombre" onChange={leerInformacion} />
                </div>

                <div className='campo'>
                    <label >Precio: </label>
                    <input type="number" placeholder="Precio Producto" min="0.00" step="0.01" name="precio" onChange={leerInformacion}/>
                </div>

                <div className='campo'>
                    <label >Imagen: </label>
                    <input type="file" name="imagen" onChange={leerArchivo}/>
                </div>

                <div className='campo'>
                    <input type="submit" className="btn btn-azul" value="Agregar Producto" />
                </div>

            </form>
        </>
      );
}