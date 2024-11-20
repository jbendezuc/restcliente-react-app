import React, { useContext, useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import { Link, useNavigate } from 'react-router-dom';    //Se usa para generar un mejor perfomarnce al navegar entre paginas Link To
import { Cliente } from './Cliente';
import Swal from 'sweetalert2';             //para alertas configuradas
import { Spinner } from '../layout/Spinner';
//Import Context
import { CRMContext } from '../context/CRMContext';

export const Clientes = () => {

    const navigate = useNavigate(); //NECESARIO instanciar el useNavigate para poder ser llamado y redireccionar a otra ruta

    //Usamos UseState para guardar la Informacion
    const [clientes, guardarclientes] = useState([]);

    //Usamos useContext
    const {auth,guardarAuth} = useContext(CRMContext);    


    //Query a la API
            const consultarAPI = async () => {

                try {
                    const clientesConsulta = await clienteAxios.get('/clientes',{
                    headers:{
                        Authorization: `Bearer ${auth.token}`
                    }
                    }); //Consultamos la URL de la API, como es solicitud de data es METODO GET

                    guardarclientes(clientesConsulta.data);
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

    //Eliminar Cliente
    const eliminarCliente = (idCliente) => {
        //Alerta personalizada
        Swal.fire({
            title: "¿Estas seguro?",
            text: "Un cliente eliminado no se puede recuperar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
            }).then((result) => {
            if (result.isConfirmed) {

                //Peticion a la API
                clienteAxios.delete(`/clientes/${idCliente}`)
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
    if(!clientes.length){
        return <Spinner />
        //return <Spinner />
    }

    return ( 
        <>
            <h2>Clientes</h2>

            <Link to="/clientes/nuevo" className='btn btn-verde nvo-cliente'><i className='fa fa-plus-circle'></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clientes.map(clientes => (
                    <Cliente key={clientes._id} {...clientes} eliminarCliente={value => eliminarCliente(value)} /> /*cuando queremos pasar datos a un componente hijo, debemos pasar primero el Key={...}*/
                                                                //podemos pasar key={...} clientes={clientes} o destructurar key={...}{...clientes}, los datos llegan al otro ya destructurados _id nombre apellido
                )
                )}
            </ul>
        </>
     );
}
 
