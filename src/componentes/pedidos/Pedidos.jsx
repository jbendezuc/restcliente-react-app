import React, { useContext, useEffect, useState } from 'react';
import { DetallePedido } from './DetallePedido';
import clienteAxios from '../../config/axios';
//Import Context
import { CRMContext } from '../context/CRMContext';
import { useNavigate } from 'react-router-dom';

export const Pedidos = () => {

    const navigate = useNavigate(); //NECESARIO instanciar el useNavigate para poder ser llamado y redireccionar a otra ruta

    const [pedidos, guardarPedidos] = useState([]);

    //Usamos useContext
    const {auth,guardarAuth} = useContext(CRMContext); 

    const consultarAPI = async () => {

        try {
            //consulta a la BD atraves del BACKEND con axios
            const pedidos = await clienteAxios.get('/pedidos',{
                        headers:{
                            Authorization: `Bearer ${auth.token}`
                        }
                        });
            //console.log(pedidos.data);
            guardarPedidos(pedidos.data);            
        } catch (error) {
            //Error con Authorizacion (POSIBLE EXPIRO TOKEN, ES OTRO TOKEN)
            if(error.response.status = 500){
                localStorage.removeItem('token');
                guardarAuth({token:'',auth:false});
                navigate('/iniciar-sesion');
            }
        }
    }

    //Efect para consultar Apis
    useEffect(() => {
        if(auth.token !=='' ){

            consultarAPI();
        }else{
            navigate('/iniciar-sesion');
        }

        if(!auth.auth){
        navigate('/iniciar-sesion')
    }
    //console.log(auth);
    }, []);

    

    return (
        <>
            <h1>Lista de Pedidos</h1>
            <ul className="listado-pedidos">
                {pedidos.map((pedido) => (
                    <DetallePedido key={pedido._id} pedido={pedido}/>
                ))}
                
            </ul>
        </> 
     );
}