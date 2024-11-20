import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';    //Se usa para generar un mejor perfomarnce al navegar entre paginas Link To
import clienteAxios from '../../config/axios';
import { Producto } from './Producto';
import Swal from 'sweetalert2';
import { Spinner } from '../layout/Spinner';
//Import Context
import { CRMContext } from '../context/CRMContext';

export const Productos = () => {
    
    const navigate = useNavigate(); //NECESARIO instanciar el useNavigate para poder ser llamado y redireccionar a otra ruta

    //Usamos UseState para guardar la Informacion
    const [productos, guardarProductos] = useState([]); //inicia como array vacio, porq los datos q guardaremos son en array

      //Usamos useContext
    const {auth,guardarAuth} = useContext(CRMContext); 

    //Query a la API
    const consultarAPI = async () => {
        
        try {
            const productosConsulta = await clienteAxios.get('/productos',{
                    headers:{
                        Authorization: `Bearer ${auth.token}`
                    }
                    }); //Consultamos la URL de la API, como es solicitud de data es METODO GET

            guardarProductos(productosConsulta.data);

        } catch (error) {
            //Error con Authorizacion (POSIBLE EXPIRO TOKEN, ES OTRO TOKEN)
                    if(error.response.status = 500){
                        localStorage.removeItem('token');
                        guardarAuth({token:'',auth:false}); 
                        navigate('/iniciar-sesion');
                    }
        }
    }

    

    //Solo se ejecuta una vez cuando se inicializa la APP
    useEffect(()=>{
        if(auth.token !=='' ){

            consultarAPI();
        }else{
            navigate('/iniciar-sesion');
        }

        if(!auth.auth){
        navigate('/iniciar-sesion')
    }
    //console.log(auth);
    },[]);

    //Eliminar Producto
    const eliminarProducto = (idProducto) => {
        //Alerta personalizada
        Swal.fire({
            title: "¿Estas seguro?",
            text: "Un Producto eliminado no se puede recuperar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
            }).then((result) => {
            if (result.isConfirmed) {

                //Peticion a la API
                clienteAxios.delete(`/productos/${idProducto}`)
                    .then(res => {
                        //mostramos el mensaje de la alerta, si se elimina dea cuerdo a la peticion
                        Swal.fire({
                            title: "Eliminado!",
                            text: res.data.mensaje,
                            icon: "success"
                        });
                        consultarAPI();     //PARA QUE SE ACTUALICE EL STATE, debe ir dentro de la promesa de respuesta, para q al raz q desaparece el mensaje, se actualice el stado
                    })               
            }
            
        });
    }

    //Spinner
    if(!productos.length){
            return <Spinner />
        //return <Spinner />
    }

    return ( 
        <>
            <h2>Productos</h2>

            <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> 
            <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            {/*ITERACION DE UN COMPONENTE*/}
            <ul className="listado-productos">
                {productos.map((producto)=>(
                    <Producto key={producto._id} {...producto} eliminarProducto={value => eliminarProducto(value)} />
                ))}
            </ul>
        </>    
     );
}